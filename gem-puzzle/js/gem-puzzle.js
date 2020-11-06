/* eslint-disable import/extensions */
import create from './utils/create.js';
import Chip from './chip.js';

const timer = create('div', 'timer-container',
  [create('span', 'description', 'Time'), create('span', 'timer')]);
const counter = create('div', 'counter-container',
  [create('span', 'description', 'Movies'), create('span', 'counter')]);
const pause = create('button', 'pause', 'Pause Game');
const resume = create('button', 'pause visible', 'Resume Game');

export default class GemPuzzle {
  constructor(gameType) {
    this.gameType = gameType;
    this.chipArr = [];
  }

  init(rowCount) {
    this.header = create('header', 'game-header', [timer, counter, pause, resume]);
    this.main = create('main', 'main', [this.header]);

    this.container = create('div', 'game-container', null, this.main);
    this.container.style.gridTemplateColumns = `repeat(${rowCount}, 1fr)`;
    document.body.prepend(this.main);
    return this;
  }

  generateLayout(chipCount) {
    for (let i = 0; i < chipCount; i += 1) {
      this.chipArr.push(new Chip(this.gameType.type[i]));
      if (i === 0) {
        this.chipArr[i].chip.classList.add('empty');
      }
    }

    this.chipArr.sort(() => Math.random() - 0.5);
    this.chipArr.forEach((chip) => {
      this.container.append(chip.chip);
      // eventListener mousedown on chip
      chip.chip.onmousedown = this.preHandleEvent;

    });
  }

  preHandleEvent = (e) => {
    let chip = e.target.closest('.chip');
    let chipClone = chip.cloneNode(true)
    let shiftX = e.clientX - chip.getBoundingClientRect().left
    let shiftY = e.clientY - chip.getBoundingClientRect().top

    document.body.append(chipClone)
    chip.classList.add('empty')

    chipClone.classList.add('dragging')

    chipClone.ondragstart = () => false

    moveAt(e.pageX, e.pageY)

    function moveAt(pageX, pageY) {
      chipClone.style.left = pageX - shiftX + 'px'
      chipClone.style.top = pageY - shiftY + 'px'
    }

    function onMouseMove(e) {
      moveAt(e.pageX, e.pageY);

      chipClone.hidden = true;
      let elemBelow = document.elementFromPoint(e.clientX, e.clientY)
      chipClone.hidden = false
      if (!elemBelow) return;

      let elemEmpty = elemBelow.closest('.empty')
    }

    document.addEventListener('mousemove', onMouseMove);

    chipClone.onmouseup = () => {
      document.removeEventListener('mousemove', onMouseMove)
      chipClone.onmouseup = null
    }
  }
}
