/* eslint-disable import/extensions */
import create from './utils/create.js';
import { get } from './storage.js';

export default function bestBoard() {
  const winnerBoard = get('winner');

  if (!winnerBoard) {
    alert('Top 10 winner Board list is empty!');
    return;
  }
  winnerBoard.sort((a, b) => a.count - b.count);
  const winList = winnerBoard.map((winner) => create('li', 'list',
    `Win for ${winner.count} movies and ${winner.min}:${winner.sec} on board: ${winner.board}`,
    null));
  const ol = create('ol', 'winList', winList);
  const div = create('div', 'winBoard', [create('h4', 'board-header', 'Best 10 winners'), ol,
    create('button', 'exit-btn', 'EXIT')]);

  document.querySelector('.game-container').append(div);

  document.querySelector('.exit-btn').addEventListener('click', (() => div.remove()));
}
