import create from './utils/create';
import { get, set } from './storage';

let emptyElemBelow = null;
let dragElement = null;
let isMouseDrag = false;

function afterMouseUp(chipType, chipClone) {
  const emptyChip = document.querySelector('.empty');
  let isSideNeighbor = false;
  let isUpTopNeighbor = false;
  if (emptyElemBelow) {
    isSideNeighbor = Math.abs(dragElement.style.order - emptyElemBelow.style.order) === 1;
    isUpTopNeighbor = Math.abs(dragElement.style.order - emptyElemBelow.style.order) === +chipType;
  } else {
    isSideNeighbor = Math.abs(dragElement.style.order - emptyChip.style.order) === 1;
    isUpTopNeighbor = Math.abs(dragElement.style.order - emptyChip.style.order) === +chipType;
  }
  if (isMouseDrag) {
    if (emptyElemBelow && (isSideNeighbor || isUpTopNeighbor)) {
      const dragOrder = dragElement.style.order;
      const emptyOrder = emptyElemBelow.style.order;
      document.querySelector('.counter').innerHTML = +(document.querySelector('.counter').innerHTML) + 1;
      dragElement.style.order = emptyOrder;
      emptyElemBelow.style.order = dragOrder;
    }
    isMouseDrag = false;
  } else if (isSideNeighbor || isUpTopNeighbor) {
    const dragOrder = dragElement.style.order;
    const emptyOrder = emptyChip.style.order;
    dragElement.style.order = emptyOrder;
    emptyChip.style.order = dragOrder;
    document.querySelector('.counter').innerHTML = +(document.querySelector('.counter').innerHTML) + 1;
  }
  dragElement.style.opacity = 1;
  chipClone.remove();
}

function checkWinner(chipType) {
  const chipAll = document.querySelectorAll('.chip');
  const container = document.querySelector('.game-container');
  let sumCorrectOrder = 0;
  chipAll.forEach((chipItem) => {
    if (+(chipItem.dataset.key) === (+(chipItem.style.order) + 1)) {
      sumCorrectOrder += 1;
    }
  });
  const chipCount = (chipType * chipType) - 1;
  if (sumCorrectOrder === chipCount) {
    const winner = {
      min: document.querySelector('.min').innerHTML,
      sec: document.querySelector('.sec').innerHTML,
      count: document.querySelector('.counter').innerHTML,
      board: `${chipType} * ${chipType}`,
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

export default function swipePreHandleEvent(e, chipType) {
  const tachObj = e.changedTouches[0];
  const chip = e.target.closest('.chip');
  const chipClone = chip.cloneNode(true);
  const chipBoundingClientRect = chip.getBoundingClientRect();
  const shiftX = tachObj.clientX - chipBoundingClientRect.left;
  const shiftY = tachObj.clientY - chipBoundingClientRect.top;
  const audio = document.querySelector('.audio');
  e.preventDefault();

  if (get('mute') === 'no') {
    audio.play();
  }
  if (e.target.closest('.empty')) return;

  // draw clone  and take clone of chip
  document.body.append(chipClone);
  chip.style.opacity = 0;
  dragElement = chip;
  chipClone.style.width = `${chip.offsetWidth}px`;
  chipClone.style.height = `${chip.offsetHeight}px`;
  chipClone.classList.add('dragging');
  // remove standard move from browser
  chipClone.ondragstart = () => false;

  // mouse cursor centered on chip center
  function moveAt(pageX, pageY) {
    chipClone.style.left = `${pageX - chipClone.offsetWidth / 2}px`;
    chipClone.style.top = `${pageY - chipClone.offsetHeight / 2}px`;
  }
  function notMoveAt(pageX, pageY) {
    chipClone.style.left = `${pageX - shiftX}px`;
    chipClone.style.top = `${pageY - shiftY}px`;
  }

  notMoveAt(tachObj.pageX, tachObj.pageY);
  // mouse moving
  function onMouseMove(event) {
    const tachObjMove = event.changedTouches[0];
    moveAt(tachObjMove.pageX, tachObjMove.pageY);
    isMouseDrag = true;

    chipClone.classList.add('nonvisible');
    const elemBelow = document.elementFromPoint(tachObjMove.clientX, tachObjMove.clientY);
    chipClone.classList.remove('nonvisible');

    if (!elemBelow) return;
    emptyElemBelow = elemBelow.closest('.empty');
  }

  document.addEventListener('touchmove', onMouseMove);

  // eventListner on mouse up
  chip.addEventListener('touchend', (() => {
    document.removeEventListener('touchmove', onMouseMove);
    afterMouseUp(chipType, chipClone);
    checkWinner(chipType);
  }));
}
