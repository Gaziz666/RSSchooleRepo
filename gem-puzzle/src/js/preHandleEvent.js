/* eslint-disable import/extensions */
import create from './utils/create.js';
import { get, set } from './storage.js';

// eventlistner mousedown
export default function preHandleEvent(e) {
  const chip = e.target.closest('.chip');
  const chipClone = chip.cloneNode(true);
  const shiftX = e.clientX - chip.getBoundingClientRect().left;
  const shiftY = e.clientY - chip.getBoundingClientRect().top;
  const emptyChip = document.querySelector('.empty');
  const audio = document.querySelector('.audio');
  const chipAll = document.querySelectorAll('.chip');
  const container = document.querySelector('.game-container');
  let elemEmpty = null;
  let dragElement = null;
  let isMouseMove = false;

  if (get('mute') === 'no') {
    audio.play();
  }
  // check if chip is empty (0)
  if (e.target.closest('.empty')) return;

  // draw clone  and take clone of chip
  document.body.append(chipClone);
  chip.style.opacity = 0;
  dragElement = chip;

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

  notMoveAt(e.pageX, e.pageY);
  // mouse moving
  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
    isMouseMove = true;

    chipClone.classList.add('nonvisible');
    const elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    chipClone.classList.remove('nonvisible');

    if (!elemBelow) return;
    elemEmpty = elemBelow.closest('.empty');
  }

  document.addEventListener('mousemove', onMouseMove);

  // eventListner on mouse up
  chipClone.onmouseup = () => {
    document.removeEventListener('mousemove', onMouseMove);
    // work is drag and draw
    if (isMouseMove) {
      if (
        elemEmpty
        && ((Math.abs(dragElement.style.order - elemEmpty.style.order) === 1)
        || (Math.abs(dragElement.style.order - elemEmpty.style.order) === 4))
      ) {
        const dragOrder = dragElement.style.order;
        const emptyOrder = elemEmpty.style.order;
        // count of movies
        set('countMovie', Number(get('countMovie')) + 1);
        document.querySelector('.counter').innerHTML = get('countMovie');

        dragElement.style.order = emptyOrder;
        elemEmpty.style.order = dragOrder;
        dragElement.style.opacity = 1;
        chipClone.remove();
      } else {
        dragElement.style.opacity = 1;
        chipClone.remove();
      }
      chipClone.onmouseup = null;
      isMouseMove = false;

    // work is just click
    } else if ((Math.abs(dragElement.style.order - emptyChip.style.order) === 1)
             || (Math.abs(dragElement.style.order - emptyChip.style.order) === 4)) {
      const dragOrder = dragElement.style.order;
      const emptyOrder = emptyChip.style.order;
      dragElement.style.order = emptyOrder;
      emptyChip.style.order = dragOrder;
      // count of movies
      set('countMovie', Number(get('countMovie')) + 1);
      document.querySelector('.counter').innerHTML = get('countMovie');

      dragElement.style.opacity = 1;
      chipClone.remove();
    } else {
      dragElement.style.opacity = 1;
      chipClone.remove();
    }

    // check winner
    let sumCorrectOrder = 0;
    chipAll.forEach((chipItem) => {
      if (Number(chipItem.dataset.key) === (Number(chipItem.style.order) + 1)) {
        sumCorrectOrder += 1;
      }
    });
    if (sumCorrectOrder === 15) {
      const winnerAlert = create('div', 'winner', `«Ура! Вы решили головоломку за 
      ${document.querySelector('.min').innerHTML}:${document.querySelector('.sec').innerHTML} и ${get('countMovie')} ходов»`);
      container.append(winnerAlert);
      const winner = {
        min: document.querySelector('.min').innerHTML,
        sec: document.querySelector('.sec').innerHTML,
        count: get('countMovie'),
      };
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
  };
}
