import create from './utils/create';
import HandleEventPause from './handleEventPause';
import { set, get } from './storage';
import Timer from './timer';

const timer = create('div', 'timer-container',
  [create('span', 'description', 'Time:'), create('div', 'timer',
    [create('span', 'min'),
      create('span', null, ':'),
      create('span', 'sec')])]);
const counter = create('div', 'counter-container',
  [create('span', 'description', 'Movies:'), create('span', 'counter', '0')]);
const pause = create('button', 'pause', 'Pause Game');
create('audio', 'audio', null, document.body, ['src', './assets/audio/audio.wav'], ['allow', 'autoplay']);

export default class GemPuzzle {
  constructor(gameType) {
    this.chipType = gameType;
    this.chipArr = [];
    this.chipOrder = [];
    this.min = 0;
    this.sec = 0;
    this.countMovies = 0;
    this.isPause = 'no';
  }

  init() {
    this.header = create('header', 'game-header', [timer, counter, pause]);
    this.main = create('main', 'main', [this.header]);

    this.container = create('div', 'game-container', null, this.main);
    document.body.prepend(this.main);

    set('countMovie', 0);
    set('isPause', 'no');
    set('isRestart', 'no');
    set('mute', 'no');

    new Timer().start();
    document.querySelector('.counter').innerHTML = get('countMovie');
    pause.addEventListener('click', HandleEventPause);
  }
}
