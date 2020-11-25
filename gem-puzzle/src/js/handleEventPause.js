/* eslint-disable no-alert */
import { set, get } from './storage';
import bestBoard from './bestBoard';
import generateLayout from './generateLayout';

const gameMenuEvent = (e, enablePauseBtn, timer) => {
  const listItem = e.target.closest('.list').dataset.game;
  const ButtonTypes = {
    RESUME: 'resume',
    RESTART: 'restart',
    NEW: 'new',
    SAVE: 'save',
    LOAD: 'load',
    SCORE: 'score',
  };
  const gameChip = document.querySelectorAll('.chip');
  const countMovie = document.querySelector('.counter');
  const gameTypeSelect = document.querySelector('.select');
  const newGameMovieCounter = 0;
  const startOrder = get('chipOrder');
  const sec = document.querySelector('.sec');
  const min = document.querySelector('.min');
  const saveOrder = [];
  const saveChip = {};

  if (listItem === ButtonTypes.RESUME) { // click resume game
    timer.start();
    enablePauseBtn();
  } else if (listItem === ButtonTypes.RESTART) { // click restart game
    gameChip.forEach((chip) => {
      const order = startOrder.indexOf(chip.dataset.key);
      // eslint-disable-next-line no-param-reassign
      chip.style.order = order;
    });
    countMovie.innerHTML = 0;
    enablePauseBtn();
    timer.set(0, 0);
    timer.start();
  } else if (listItem === ButtonTypes.NEW) { // click new game
    enablePauseBtn();
    timer.set(0, 0);
    timer.start();
    gameChip.forEach((chip) => chip.remove());
    generateLayout(Number(gameTypeSelect.value), newGameMovieCounter);
  } else if (listItem === ButtonTypes.SAVE) { // click save
    let chipCount = 0;
    gameChip.forEach((chip) => {
      saveChip[chip.dataset.key] = [chip.style.order, chip.style.backgroundImage];
      chipCount += 1;
    });
    saveOrder.push(saveChip);
    saveOrder.push(countMovie.innerHTML, min.innerHTML, sec.innerHTML, Math.sqrt(chipCount));
    set('save', saveOrder);
    alert('game saved');
  } else if (listItem === ButtonTypes.LOAD) {
    if (!get('save')) {
      alert('no save game');
      return;
    }
    const loadGameType = Number(get('save')[4]);
    const saveGameMovieCount = get('save')[1];
    const saveGameMin = +get('save')[2];
    const saveGameSec = +get('save')[3];

    gameChip.forEach((chip) => chip.remove());
    generateLayout(loadGameType, saveGameMovieCount);
    timer.set(saveGameMin, saveGameSec);
    timer.start();
    const newGameChip = document.querySelectorAll('.chip');
    newGameChip.forEach((chip) => {
      const chipOrder = get('save')[0][chip.dataset.key][0];
      const chipBcg = get('save')[0][chip.dataset.key][1];
      // eslint-disable-next-line no-param-reassign
      chip.style.order = chipOrder;
      // eslint-disable-next-line no-param-reassign
      chip.style.backgroundImage = chipBcg;
    });
    enablePauseBtn();
  } else if (listItem === ButtonTypes.SCORE) {
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

export default function handleEventPause(pause, paused, timer) {
  const popup = document.querySelector('.popup');
  popup.classList.remove('nonvisible');
  const buttons = document.querySelectorAll('.pause-buttons');
  timer.stop();
  // eslint-disable-next-line no-use-before-define
  const onclick = (e) => gameMenuEvent(e, enablePauseBtn, timer);

  const enablePauseBtn = () => {
    paused.classList.add('nonvisible');
    pause.classList.remove('nonvisible');
    popup.classList.add('nonvisible');
    buttons.forEach((button) => button.removeEventListener('click', onclick));
  };

  const disablePauseBtn = () => {
    pause.classList.add('nonvisible');
    paused.classList.remove('nonvisible');
    timer.stop();
  };
  disablePauseBtn();

  if (document.querySelector('.winner')) {
    document.querySelector('.winner').remove();
  }

  buttons.forEach((button) => button.addEventListener('click', onclick));
  // icon.addEventListener('click', audioEvent);
}
