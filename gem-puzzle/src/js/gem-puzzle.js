import create from './utils/create';
import handleEventPause from './handleEventPause';
import { set, get } from './storage';
import Timer from './Timer';

const timerDiv = create('div', 'timer-container',
  [create('span', 'description', 'Time:'), create('div', 'timer',
    [create('span', 'min'),
      create('span', null, ':'),
      create('span', 'sec')])]);
const counter = create('div', 'counter-container',
  [create('span', 'description', 'Movies:'), create('span', 'counter', '0')]);
const pause = create('button', 'pause', 'Pause Game');
const paused = create('button', 'paused nonvisible', 'Paused');
create('audio', 'audio', null, document.body, ['src', './assets/audio/audio.wav'], ['allow', 'autoplay']);
const gameTypeSelect = create('select', 'select', [
  create('option', 'option', '3 * 3', null, ['value', '3']),
  create('option', 'option', '4 * 4', null, ['value', '4'], ['selected', '']),
  create('option', 'option', '5 * 5', null, ['value', '5']),
  create('option', 'option', '6 * 6', null, ['value', '6']),
  create('option', 'option', '7 * 7', null, ['value', '7']),
  create('option', 'option', '8 * 8', null, ['value', '8']),
], null, ['name', 'gameType']);
const listMenu = create('ul', 'menu',
  [create('li', 'list', '<span class="pause-buttons">Resume game</span>', null, ['game', 'resume']),
    create('li', 'list', '<span class="pause-buttons">Restart game</span>', null, ['game', 'restart']),
    create('li', 'list', [
      create('span', 'pause-buttons', 'New game'),
      gameTypeSelect,
    ], null, ['game', 'new']),
    create('li', 'list', '<span class="pause-buttons">Save game</span>', null, ['game', 'save']),
    create('li', 'list', '<span class="pause-buttons">Load game</span>', null, ['game', 'load']),
    create('li', 'list', '<span class="pause-buttons">Best score</span>', null, ['game', 'score'])]);
const icon = get('mute') === 'no'
  ? create('i', 'material-icons', 'volume_up')
  : create('i', 'material-icons', 'volume_off');
const popup = create('div', 'popup nonvisible', [listMenu, icon]);

export default class GemPuzzle {
  constructor(gameType) {
    this.chipType = gameType;
    this.chipArr = [];
    this.chipOrder = [];
  }

  init() {
    this.header = create('header', 'game-header', [timerDiv, counter, pause, paused]);
    this.main = create('main', 'main', [this.header]);

    this.container = create('div', 'game-container', popup, this.main);
    document.body.prepend(this.main);

    set('mute', 'no');
    const gameTimer = new Timer();
    gameTimer.get(0, 0);
    gameTimer.startTimer();

    document.querySelector('.counter').innerHTML = get('countMovie');

    pause.addEventListener('click', () => {
      handleEventPause(pause, paused, gameTimer);
    });
    return this;
  }
}
