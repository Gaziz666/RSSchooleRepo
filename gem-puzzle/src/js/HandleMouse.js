import create from './utils/create'; 
import { get, set } from './storage';

export default class HandleMouse {
  constructor() {
    this.chipType = null;
    this.emptyElemBelow = null;
    this.dragElement = null;
    this.isMouseDrag = false;
    this.chipClone = null;
    this.e = null;
    this.shiftX = null;
    this.shiftY = null;
  }

  swipe(e, chipType) {
    this.e = e;
    this.chipType = chipType;
    const tachObj = e.changedTouches[0];
    const chip = e.target.closest('.chip');
    this.chipClone = chip.cloneNode(true);
    const chipBoundingClientRect = chip.getBoundingClientRect();
    this.shiftX = tachObj.clientX - chipBoundingClientRect.left;
    this.shiftY = tachObj.clientY - chipBoundingClientRect.top;
    const audio = document.querySelector('.audio');
    e.preventDefault();

    if (get('mute') === 'no') {
      audio.play();
    }
    if (e.target.closest('.empty')) return;

    // draw clone  and take clone of chip
    document.body.append(this.chipClone);
    chip.style.opacity = 0;
    this.dragElement = chip;
    this.chipClone.style.width = `${chip.offsetWidth}px`;
    this.chipClone.style.height = `${chip.offsetHeight}px`;
    this.chipClone.classList.add('dragging');
    this.chipClone.classList.add('drag');
    // remove standard move from browser
    this.chipClone.ondragstart = () => false;
    // mouse cursor centered on chip center
    this.moveMouseToCurrentPosition(tachObj.pageX, tachObj.pageY);
  }

  click(e, chipType) {
    this.e = e;
    this.chipType = chipType;
    const chip = e.target.closest('.chip');
    this.chipClone = chip.cloneNode(true);
    const chipBoundingClientRect = chip.getBoundingClientRect();
    this.shiftX = e.clientX - chipBoundingClientRect.left;
    this.shiftY = e.clientY - chipBoundingClientRect.top;
    const audio = document.querySelector('.audio');
    e.preventDefault();

    if (get('mute') === 'no') {
      audio.play();
    }
    if (e.target.closest('.empty')) return;

    // draw clone  and take clone of chip
    document.body.append(this.chipClone);
    chip.style.opacity = 0;
    this.dragElement = chip;
    this.chipClone.style.width = `${chip.offsetWidth}px`;
    this.chipClone.style.height = `${chip.offsetHeight}px`;
    this.chipClone.classList.add('dragging');
    this.chipClone.classList.add('drag');
    // remove standard move from browser
    this.chipClone.ondragstart = () => false;

    // mouse cursor centered on chip center
    const moveMouseToCenter = (pageX, pageY) => {
      this.chipClone.style.left = `${pageX - this.chipClone.offsetWidth / 2}px`;
      this.chipClone.style.top = `${pageY - this.chipClone.offsetHeight / 2}px`;
    };
    const moveMouseToCurrentPosition = (pageX, pageY) => {
      this.chipClone.style.left = `${pageX - this.shiftX}px`;
      this.chipClone.style.top = `${pageY - this.shiftY}px`;
    };

    moveMouseToCurrentPosition(e.pageX, e.pageY);
    // mouse moving
    const onMouseMove = (event) => {
      moveMouseToCenter(event.pageX, event.pageY);
      this.isMouseDrag = true;
      this.chipClone.classList.add('nonvisible');
      const elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      this.chipClone.classList.remove('nonvisible');

      if (!elemBelow) return;
      this.emptyElemBelow = elemBelow.closest('.empty');
    };

    document.addEventListener('mousemove', onMouseMove);

    this.chipClone.onmouseup = () => {
      document.removeEventListener('mousemove', onMouseMove);
      this.afterMouseUp(chipType);
      this.checkWinner(chipType);
    };
  }

  touchendFunc() {
    if (this.e.target.classList.contains('empty')) {
      return;
    }
    this.chipClone = document.querySelector('.drag');
    this.afterMouseUp();
    this.checkWinner();
  }

  onMouseMove(event) {
    const tachObjMove = event.changedTouches[0];
    this.moveMouseToCenter(tachObjMove.pageX, tachObjMove.pageY);
    this.isMouseDrag = true;

    this.chipClone.classList.add('nonvisible');
    const elemBelow = document.elementFromPoint(tachObjMove.clientX, tachObjMove.clientY);
    this.chipClone.classList.remove('nonvisible');

    if (!elemBelow) return;
    this.emptyElemBelow = elemBelow.closest('.empty');
  }

  moveMouseToCenter(pageX, pageY) {
    this.chipClone.style.left = `${pageX - this.chipClone.offsetWidth / 2}px`;
    this.chipClone.style.top = `${pageY - this.chipClone.offsetHeight / 2}px`;
  }

  moveMouseToCurrentPosition(pageX, pageY) {
    this.chipClone.style.left = `${pageX - this.shiftX}px`;
    this.chipClone.style.top = `${pageY - this.shiftY}px`;
  }

  afterMouseUp() {
    const emptyChip = document.querySelector('.empty');
    let isSideNeighbor = false;
    let isUpTopNeighbor = false;
    if (this.emptyElemBelow) {
      isSideNeighbor = Math.abs(this.dragElement.style.order
        - this.emptyElemBelow.style.order) === 1;
      isUpTopNeighbor = Math.abs(this.dragElement.style.order
        - this.emptyElemBelow.style.order) === +this.chipType;
    } else {
      isSideNeighbor = Math.abs(this.dragElement.style.order
        - emptyChip.style.order) === 1;
      isUpTopNeighbor = Math.abs(this.dragElement.style.order
        - emptyChip.style.order) === +this.chipType;
    }
    if (this.isMouseDrag) {
      if (this.emptyElemBelow && (isSideNeighbor || isUpTopNeighbor)) {
        const dragOrder = this.dragElement.style.order;
        const emptyOrder = this.emptyElemBelow.style.order;
        document.querySelector('.counter').innerHTML = +(document.querySelector('.counter').innerHTML) + 1;
        this.dragElement.style.order = emptyOrder;
        this.emptyElemBelow.style.order = dragOrder;
      }
      this.isMouseDrag = false;
    } else if (isSideNeighbor || isUpTopNeighbor) {
      const dragOrder = this.dragElement.style.order;
      const emptyOrder = emptyChip.style.order;
      this.dragElement.style.order = emptyOrder;
      emptyChip.style.order = dragOrder;
      document.querySelector('.counter').innerHTML = +(document.querySelector('.counter').innerHTML) + 1;
    }
    this.dragElement.style.opacity = 1;
    this.chipClone.remove();
  }

  checkWinner() {
    const chipAll = document.querySelectorAll('.chip');
    const container = document.querySelector('.game-container');
    let sumCorrectOrder = 0;
    chipAll.forEach((chipItem) => {
      if (+(chipItem.dataset.key) === (+(chipItem.style.order) + 1)) {
        sumCorrectOrder += 1;
      }
    });
    const chipCount = (this.chipType * this.chipType) - 1;
    if (sumCorrectOrder === chipCount) {
      const winner = {
        min: document.querySelector('.min').innerHTML,
        sec: document.querySelector('.sec').innerHTML,
        count: document.querySelector('.counter').innerHTML,
        board: `${this.chipType} * ${this.chipType}`,
      };
      const winnerAlert = create('div', 'winner', `«Ура! Вы решили головоломку за 
      ${winner.min}:${winner.sec} и ${winner.count} ходов»`);
      const winnerWrapper = create('div', 'winner-wrapper popup', winnerAlert);
      container.append(winnerWrapper);

      const winnerBoard = get('winner') || [];
      if (!winnerBoard || winnerBoard.length < 10) {
        winnerBoard.push(winner);
        set('winner', winnerBoard);
      } else {
        winnerBoard.sort((a, b) => a.count - b.count);
        if (winnerBoard[winnerBoard.length - 1].count > winner.count) {
          winnerBoard.pop();
          winnerBoard.push(winner);
          set('winner', winnerBoard);
        }
      }
    }
  }
}
