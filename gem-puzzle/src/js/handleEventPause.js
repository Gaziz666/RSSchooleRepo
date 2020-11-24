import create from './utils/create';
import { set, get } from './storage';
import bestBoard from './bestBoard';
import generateLayout from './generateLayout';

export default function preHandleEvent() {
  if (get('isPause') === 'yes') return;
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
      const newGameType = gameTypeSelect.value;
      popup.remove();
      set('isPause', 'no');
      set('isRestart', 'yes');
      set('countMovie', 0);
      countMovie.innerHTML = 0;
      gameChip.forEach((chip) => chip.remove());
      generateLayout(newGameType);
    } else if (buttonType === 'save') { // click save
      let chipCount = 0;
      gameChip.forEach((chip) => {
        saveChip[chip.dataset.key] = [chip.style.order,
          chip.style.background,
          chip.style.backgroundPosition,
          chip.style.backgroundSize,
          chip.style.backgroundRepeat];
        chipCount += 1;
      });
      saveOrder.push(saveChip);
      saveOrder.push(get('countMovie'));
      saveOrder.push(min.innerHTML, sec.innerHTML);
      saveOrder.push(Math.sqrt(chipCount));
      set('save', saveOrder);
      alert('game saved');
    } else if (buttonType === 'load') {
      if (!get('save')) {
        alert('no save game');
        return;
      }
      gameChip.forEach((chip) => chip.remove());
      const loadGameType = Number(get('save')[4]);
      generateLayout(loadGameType)
      const newGameChip = document.querySelectorAll('.chip');
      newGameChip.forEach((chip) => {
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
