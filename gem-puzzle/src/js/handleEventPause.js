/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import create from './utils/create.js';
import GamePuzzle from './gem-puzzle.js';
import gameType from './layouts/index.js';
import { set, get } from './storage.js';
import bestBoard from './bestBoard.js';

export default function preHandleEvent() {
  if (get('isPause') === 'yes') return;
  const listMenu = create('ul', 'menu',
    [create('li', 'list', '<span class="pause-buttons">Resume game</span>', null, ['game', 'resume']),
      create('li', 'list', '<span class="pause-buttons">Restart game</span>', null, ['game', 'restart']),
      create('li', 'list', '<span class="pause-buttons">New game</span>', null, ['game', 'new']),
      create('li', 'list', '<span class="pause-buttons">Save game</span>', null, ['game', 'save']),
      create('li', 'list', '<span class="pause-buttons">Load game</span>', null, ['game', 'saved']),
      create('li', 'list', '<span class="pause-buttons">Best score</span>', null, ['game', 'score'])]);
  const icon = get('mute') === 'no'
    ? create('i', 'material-icons', 'volume_up')
    : create('i', 'material-icons', 'volume_off');
  const popup = create('div', 'popup', [listMenu, icon]);
  document.querySelector('.game-container').append(popup);
  set('isPause', 'yes');
  if (document.querySelector('.winner')) {
    document.querySelector('.winner').remove();
  }

  const gameMenuEvent = (e) => {
    const buttonType = e.target.closest('.list').dataset.game;
    const gameChip = document.querySelectorAll('.chip');
    const countMovie = document.querySelector('.counter');
    const startOrder = get('chipOrder');
    const sec = document.querySelector('.sec');
    const min = document.querySelector('.min');
    const saveOrder = [];
    const saveChip = {};

    if (buttonType === 'resume') { // click resume game
      popup.remove();
      set('isPause', 'no');
    } else if (buttonType === 'restart') { // click restart game
      gameChip.forEach((chip) => {
        const order = startOrder.indexOf(chip.dataset.key);
        // eslint-disable-next-line no-param-reassign
        chip.style.order = order;
      });
      set('countMovie', 0);
      set('isRestart', 'yes');
      set('isPause', 'no');
      countMovie.innerHTML = 0;
      popup.remove();
    } else if (buttonType === 'new') { // click new game
      popup.remove();
      set('isPause', 'no');
      set('isRestart', 'yes');
      set('countMovie', 0);
      countMovie.innerHTML = 0;
      gameChip.forEach((chip) => chip.remove());
      new GamePuzzle(gameType).generateLayout(16);
    } else if (buttonType === 'save') { // click save
      gameChip.forEach((chip) => {
        saveChip[chip.dataset.key] = [chip.style.order,
          chip.style.background,
          chip.style.backgroundPosition,
          chip.style.backgroundSize,
          chip.style.backgroundRepeat];
      });
      saveOrder.push(saveChip);
      saveOrder.push(get('countMovie'));
      saveOrder.push(min.innerHTML, sec.innerHTML);
      set('save', saveOrder);
    } else if (buttonType === 'saved') {
      if(!get('save')) {
        alert('no save game')
        return;
      }
      gameChip.forEach((chip) => {
        // eslint-disable-next-line no-param-reassign
        chip.style.order = get('save')[0][chip.dataset.key][0];
        chip.style.background = get('save')[0][chip.dataset.key][1];
      });
      set('countMovie', get('save')[1]);
      set('isPause', 'no');
      countMovie.innerHTML = get('countMovie');
      set('loadSaveGame', 'yes');
      popup.remove();
    } else if (buttonType === 'score') {
      bestBoard();
    }
  };

  const audioEvent = () => {
    if (get('mute') === 'no') {
      icon.innerHTML = 'volume_off';
      set('mute', 'yes');
    } else {
      icon.innerHTML = 'volume_up';
      set('mute', 'no');
    }
  };

  const buttons = document.querySelectorAll('.pause-buttons');
  buttons.forEach((button) => button.addEventListener('click', gameMenuEvent));
  icon.addEventListener('click', audioEvent);
}
