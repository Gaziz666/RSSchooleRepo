/* eslint-disable import/extensions */
import create from './utils/create.js';

export default function preHandleEvent() {
  const listMenu = create('ul', 'menu',
    [create('li', 'list', '<span class="pause-buttons">Resume game</span>', null, ['game', 'resume']),
      create('li', 'list', '<span class="pause-buttons">Restart game</span>', null, ['game', 'restart']),
      create('li', 'list', '<span class="pause-buttons">New game</span>', null, ['game', 'new']),
      create('li', 'list', '<span class="pause-buttons">Save game</span>', null, ['game', 'save']),
      create('li', 'list', '<span class="pause-buttons">Saved game</span>', null, ['game', 'saved']),
      create('li', 'list', '<span class="pause-buttons">Best score</span>', null, ['game', 'score'])]);
  const popup = create('div', 'popup', listMenu);
  document.querySelector('.game-container').append(popup);
  localStorage.setItem('isPause', 'yes');

  const gameMenuEvent = (e) => {
    const buttonType = e.target.closest('.list').dataset.game;
    const gameChip = document.querySelectorAll('.chip');
    const countMovie = document.querySelector('.counter');
    const startOrder = localStorage.getItem('chipOrder').split(',');

    if (buttonType === 'resume') {
      popup.remove();
      localStorage.setItem('isPause', 'no');
    } else if (buttonType === 'restart') {
      gameChip.forEach((chip) => {
        const order = startOrder.indexOf(chip.dataset.key);
        // eslint-disable-next-line no-param-reassign
        chip.style.order = order;
      });
      localStorage.setItem('countMovie', '0');
      localStorage.setItem('isResume', 'yes');
      localStorage.setItem('isPause', 'no');
      countMovie.innerHTML = 0;
      popup.remove();
    }
  };

  const buttons = document.querySelectorAll('.pause-buttons');
  buttons.forEach((button) => button.addEventListener('click', gameMenuEvent));
}
