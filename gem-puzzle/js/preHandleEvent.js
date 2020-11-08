// eventlistner mousedown
export default function preHandleEvent(e) {
  const chip = e.target.closest('.chip');
  const chipClone = chip.cloneNode(true);
  const shiftX = e.clientX - chip.getBoundingClientRect().left;
  const shiftY = e.clientY - chip.getBoundingClientRect().top;
  const emptyChip = document.querySelector('.empty');
  let elemEmpty = null;
  let dragElement = null;
  let isMouseMove = false;

  // check if chip is empty (0)
  if (e.target.closest('.empty')) return;

  // draw clone  and take clone of chip
  document.body.append(chipClone);
  chip.classList.add('empty');
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
        localStorage.setItem('countMovie', Number(localStorage.getItem('countMovie')) + 1);
        document.querySelector('.counter').innerHTML = localStorage.getItem('countMovie');

        dragElement.style.order = emptyOrder;
        elemEmpty.style.order = dragOrder;
        dragElement.classList.remove('empty');
        chipClone.remove();
      } else {
        dragElement.classList.remove('empty');
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
      localStorage.setItem('countMovie', Number(localStorage.getItem('countMovie')) + 1);
      document.querySelector('.counter').innerHTML = localStorage.getItem('countMovie');

      dragElement.classList.remove('empty');
      chipClone.remove();
    } else {
      dragElement.classList.remove('empty');
      chipClone.remove();
    }
  };
}
