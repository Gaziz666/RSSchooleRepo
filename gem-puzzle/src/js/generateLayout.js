import Chip from './chip';
import handleMouseDown from './handleMouseDown';
import { set, get } from './storage';
import swipePreHandleEvent from './swipePreHandleEvent';

export default function generateLayout(chipType) {
  const chipCount = chipType * chipType;
  const chipArr = [];
  const chipOrder = [];
  const imageNumber = Math.floor((Math.random() * 150)) + 1;

  for (let i = 0; i < chipCount; i += 1) {
    chipArr.push(new Chip(i, chipType));

    // add image on background
    if (i === 0) {
      chipArr[i].chip.classList.add('empty');
    } else {
      chipArr[i].chip.style.background = `url("./assets/img/box/${imageNumber}.jpg`;
      const left = (i - 1) % chipType;
      const top = Math.trunc((i - 1) / chipType);
      chipArr[i].chip.style.backgroundPosition = `left ${left * (100 / (Number(chipType) - 1))}% top ${top * (100 / (Number(chipType) - 1))}%`;
      if (window.innerWidth > 600) {
        chipArr[i].chip.style.backgroundSize = '472px';
      } else if (window.innerWidth > 342) {
        chipArr[i].chip.style.backgroundSize = '312px';
      } else {
        chipArr[i].chip.style.backgroundSize = '272px';
      }
      chipArr[i].chip.style.backgroundRepeat = 'no-repeat';
    }
  }

  // random chip and check is game has a win?
  let sum = 1;
  while (sum % 2 > 0) {
    sum = 0;
    chipArr.sort(() => Math.random() - 0.5);

    for (let i = 0; i < chipArr.length; i += 1) {
      for (let j = i + 1; j < chipArr.length; j += 1) {
        if ((chipArr[i].number > chipArr[j].number) && chipArr[j].number !== 0) {
          sum += 1;
        }
      }

      if (chipArr[i].number === 0 && Number(chipType) % 2 === 0) {
        sum += Math.trunc((i) / Number(chipType)) + 1;
      }
    }
  }

  chipArr.forEach((item, i) => {
    document.querySelector('.game-container').append(item.chip);
    item.chip.style.order = i;
    chipOrder.push(item.chip.dataset.key);
    // eventListener mousedown on chip
    item.chip.addEventListener('mousedown', (e) => (handleMouseDown(e, Number(chipType))));
    item.chip.addEventListener('touchstart', (e) => (swipePreHandleEvent(e, Number(chipType))));
  });
  // memories start position of chips
  set('chipOrder', chipOrder);
}
