/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
import create from './utils/create.js';
import Chip from './chip.js';
import PreHandleEvent from './preHandleEvent.js';
import HandleEventPause from './handleEventPause.js';
import { set, get } from './storage.js';
import Timer from './timer.js';
import swipePreHandleEvent from './swipePreHandleEvent.js';

const timer = create('div', 'timer-container',
  [create('span', 'description', 'Time:'), create('div', 'timer',
    [create('span', 'min'),
      create('span', null, ':'),
      create('span', 'sec')])]);
const counter = create('div', 'counter-container',
  [create('span', 'description', 'Movies:'), create('span', 'counter', '0')]);
const pause = create('button', 'pause', 'Pause Game');
const resume = create('button', 'pause visible', 'Resume Game');
create('audio', 'audio', null, document.body, ['src', './../assets/audio/audio.wav']);

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

  init() {
    this.header = create('header', 'game-header', [timer, counter, pause, resume]);
    this.main = create('main', 'main', [this.header]);

    this.container = create('div', 'game-container', null, this.main);
    document.body.prepend(this.main);

    set('countMovie', 0);
    set('isPause', 'no');
    set('isRestart', 'no');
    set('mute', 'no');

    new Timer().start();
    document.querySelector('.counter').innerHTML = get('countMovie');
    return this;
  }

  generateLayout(chipCount) {
    const imageNumber = Math.floor((Math.random() * 150));

    for (let i = 0; i < chipCount; i += 1) {
      this.chipArr.push(new Chip(this.gameType.type[i]));

      // add image on background
      if (i === 0) {
        this.chipArr[i].chip.classList.add('empty');
      } else {
        this.chipArr[i].chip.style.background = `url("./../assets/img/box/${imageNumber}.jpg`;
        const left = (i - 1) % 4;
        const top = Math.trunc((i - 1) / 4);
        this.chipArr[i].chip.style.backgroundPosition = `left ${left * 33.33}% top ${top * 33.33}%`;
        if (window.innerWidth > 600) {
          this.chipArr[i].chip.style.backgroundSize = '472px';
        } else if (window.innerWidth > 342) {
          this.chipArr[i].chip.style.backgroundSize = '312px';
        } else {
          this.chipArr[i].chip.style.backgroundSize = '272px';
        }
        this.chipArr[i].chip.style.backgroundRepeat = 'no-repeat';
      }
    }

    // random chip and check is game has a win?
    let sum = 1;
    while (sum % 2 > 0) {
      sum = 0;
      this.chipArr.sort(() => Math.random() - 0.5);

      for (let i = 0; i < this.chipArr.length; i += 1) {
        for (let j = i + 1; j < this.chipArr.length; j += 1) {
          if ((this.chipArr[i].number > this.chipArr[j].number) && this.chipArr[j].number !== 0) {
            sum += 1;
          }
        }

        if (this.chipArr[i].number === 0) {
          sum += Math.trunc((i) / 4) + 1;
        }
      }
    }

    this.chipArr.forEach((item, i) => {
      document.querySelector('.game-container').append(item.chip);
      item.chip.style.order = i;
      this.chipOrder.push(item.chip.dataset.key);
      // eventListener mousedown on chip
      item.chip.onmousedown = PreHandleEvent;
      item.chip.addEventListener('touchstart', swipePreHandleEvent);
    });
    // memories start position of chips
    set('chipOrder', this.chipOrder);
    // event Listener for buttons Resume
    pause.addEventListener('click', HandleEventPause);
  }
}
