/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
import create from './utils/create.js';
import Chip from './chip.js';
import PreHandleEvent from './preHandleEvent.js';
import HandleEvent from './handleEventPause.js';

const timer = create('div', 'timer-container',
  [create('span', 'description', 'Time:'), create('div', 'timer',
    [create('span', 'min'), create('span', 'sec')])]);
const counter = create('div', 'counter-container',
  [create('span', 'description', 'Movies:'), create('span', 'counter', '0')]);
const pause = create('button', 'pause', 'Pause Game');
const resume = create('button', 'pause visible', 'Resume Game');

export default class GemPuzzle {
  constructor(gameType) {
    this.gameType = gameType;
    this.chipArr = [];
    this.chipOrder = [];
    this.min = 0;
    this.sec = 0;
    this.countMovies = 0;
    this.isPause = 'no';
  }

  init(_rowCount) {
    this.header = create('header', 'game-header', [timer, counter, pause, resume]);
    this.main = create('main', 'main', [this.header]);

    this.container = create('div', 'game-container', null, this.main);
    document.body.prepend(this.main);

    localStorage.setItem('countMovie', 0);
    localStorage.setItem('isPause', 'no');
    localStorage.setItem('isResume', 'no');

    this.showTimer();
    document.querySelector('.counter').innerHTML = localStorage.getItem('countMovie');
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
    this.chipArr.forEach((item, i) => {
      this.container.append(item.chip);
      item.chip.style.order = i;
      this.chipOrder.push(item.chip.dataset.key);
      // eventListener mousedown on chip
      item.chip.onmousedown = PreHandleEvent;
    });
    // memories start position of chips
    localStorage.setItem('chipOrder', this.chipOrder);
    // event Listener for buttons Resume
    pause.addEventListener('click', HandleEvent);
  }

  showTimer = () => {
    if (localStorage.getItem('isResume') === 'yes') {
      this.sec = 0;
      this.min = 0;
      localStorage.setItem('isResume', 'no');
    }

    document.querySelector('.min').innerHTML = `${this.min}:`;
    if (this.sec < 10) {
      document.querySelector('.sec').innerHTML = `0${this.sec}`;
    } else {
      document.querySelector('.sec').innerHTML = this.sec;
    }

    if (localStorage.getItem('isPause') === 'no') { // check is Pause button
      if (this.sec === 59) {
        this.sec = 0;
        this.min += 1;
      } else {
        this.sec += 1;
      }
    }

    setTimeout(this.showTimer, 1000);
  }
}
