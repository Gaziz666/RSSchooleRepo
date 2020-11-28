import Chip from './Chip';
import HandleMouse from './HandleMouse';
import { set } from './storage';

function createChipWithBcg(arr, type) {
  const imageNumber = Math.floor((Math.random() * 150)) + 1;
  const chipCount = type * type;
  for (let i = 0; i < chipCount; i += 1) {
    arr.push(new Chip(i, type));

    if (i === 0) {
      arr[i].chip.classList.add('empty');
    } else {
      // eslint-disable-next-line no-param-reassign
      arr[i].chip.style.backgroundImage = `url("./assets/img/box/${imageNumber}.jpg`;
      const left = (i - 1) % type;
      const top = Math.trunc((i - 1) / type);
      // eslint-disable-next-line no-param-reassign
      arr[i].chip.style.backgroundPosition = `left ${left * (100 / (type))}% top ${top * (100 / (type))}%`;
    }
  }
}

function makeRandomAndCheckWin(arr, type) {
  // check have game a  win position?(Parity of layout)
  let sum = 1;
  while (sum % 2 > 0) {
    sum = 0;
    arr.sort(() => Math.random() - 0.5);

    for (let i = 0; i < arr.length; i += 1) {
      for (let j = i + 1; j < arr.length; j += 1) {
        if ((arr[i].number > arr[j].number) && arr[j].number !== 0) {
          sum += 1;
        }
      }

      if (arr[i].number === 0 && type % 2 === 0) {
        sum += Math.trunc((i) / type) + 1;
      }
    }
  }
}

export default function generateLayout(chipType, count) {
  const chipArr = [];
  const chipOrder = [];
  const container = document.querySelector('.game-container');
  const counterMovie = document.querySelector('.counter');

  createChipWithBcg(chipArr, chipType);
  makeRandomAndCheckWin(chipArr, chipType);
  counterMovie.innerHTML = count;

  const swipeMouse = new HandleMouse();
  const click = new HandleMouse();
  chipArr.forEach((item, i) => {
    container.append(item.chip);
    // eslint-disable-next-line no-param-reassign
    item.chip.style.order = i;
    chipOrder.push(item.chip.dataset.key);

    item.chip.addEventListener('mousedown', (e) => (click.click(e, chipType)));
    item.chip.addEventListener('touchstart', (e) => (swipeMouse.swipe(e, chipType)));
    item.chip.addEventListener('touchmove', (e) => (swipeMouse.onMouseMove(e)));
    item.chip.addEventListener('touchend', () => (swipeMouse.touchendFunc()));
  });
  // memories start position of chips
  set('chipOrder', chipOrder);
}
