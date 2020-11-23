/* eslint-disable import/extensions */
import create from './utils/create.js';
import burgerMenu from './icons/burgerMenu.js';
import Card from './Card.js';
import close from './icons/close.js';
import handleEventOpenMenu from './handleEventOpenMenu.js';

export default class MainPage {
  constructor() {
    this.sm = 0;
  }

  init(cardType) {
    this.sm = 0;
    // create header
    const toggle = create('div', 'toggle-wrapper', [
      create('input', 'checkbox', null, null, ['type', 'checkbox'], ['id', 'checkbox']),
      create('label', 'checkbox-label', null, null, ['for', 'checkbox']),
    ]);
    const header = create('header', 'main-header', [
      create('div', 'logo', burgerMenu),
      toggle,
    ]);
    // create header container
    const container = create('main', 'card-container');
    // create menu list
    const list = [];
    cardType.forEach((card) => {
      const listSpan = [];
      card.word.split('').forEach((letter) => {
        const span = create('span', 'spanLetter', letter);
        listSpan.push(span);
      });
      const listItem = create('li', 'list', listSpan);
      list.push(listItem);
    });
    // create menu, popup
    const navMenu = create('div', 'nav-menu-container', [
      create('div', 'close-wrapper', close),
      create('ul', 'nav-menu', list),
    ]);
    const popup = create('div', 'popup', navMenu);

    document.body.append(header);
    document.body.append(container);
    document.body.append(popup);

    popup.addEventListener('click', (e) => { handleEventOpenMenu(e, popup); });
    burgerMenu.addEventListener('click', (e) => { handleEventOpenMenu(e, popup); });

    new Card(cardType).createCards(container);
  }
}
