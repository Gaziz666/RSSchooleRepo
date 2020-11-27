import create from './utils/create';

import burgerMenu from './icons/burgerMenu';
import Card from './Card';
import close from './icons/close';
import handleEventOpenMenu from './handleEventOpenMenu';
import generateCardLayout from './generateCardLayout';

export default class MainPage {
  constructor() {
    this.cardType = null;
  }

  init(cardType) {
    this.cardType = cardType;
    // create header
    const toggle = create({ el: 'div' }, { className: 'toggle-wrapper' },
      {
        child: [
          create({ el: 'input' }, { className: 'checkbox' }, { child: null }, { parent: null }, { dataAttr: [['type', 'checkbox'], ['id', 'checkbox']] }),
          create({ el: 'label' }, { className: 'checkbox-label' }, { child: null }, { parent: null }, { dataAttr: [['for', 'checkbox']] }),
        ],
      });
    const header = create({ el: 'header' }, { className: 'main-header' },
      {
        child: [
          create({ el: 'div' }, { className: 'logo' }, { child: burgerMenu }),
          toggle,
        ],
      });
    // create header container
    const container = create({ el: 'main' }, { className: 'card-container' });
    // create menu list
    const list = [];
    this.cardType.forEach((card) => {
      const listSpan = [];
      card.word.split('').forEach((letter) => {
        const span = create({ el: 'span' }, { className: 'spanLetter' }, { child: letter });
        listSpan.push(span);
      });
      const listItem = create({ el: 'li' }, { className: 'list' }, { child: listSpan });
      list.push(listItem);
    });
    // create menu, popup
    const navMenu = create({ el: 'div' }, { className: 'nav-menu-container' },
      {
        child: [
          create({ el: 'div' }, { className: 'close-wrapper' }, { child: close }),
          create({ el: 'ul' }, { className: 'nav-menu' }, { child: list }),
        ],
      });
    const popup = create({ el: 'div' }, { className: 'popup' }, { child: navMenu });

    document.body.append(header);
    document.body.append(container);
    document.body.append(popup);

    popup.addEventListener('click', (e) => { handleEventOpenMenu(e, popup); });
    burgerMenu.addEventListener('click', (e) => { handleEventOpenMenu(e, popup); });

    generateCardLayout(this.cardType);
  }
}
