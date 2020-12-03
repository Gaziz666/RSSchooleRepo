import create from './utils/create';
import handleMouseEnterMenu from './handleMouseEnterMenu';
import burgerMenu from './icons/burgerMenu';
import Card from './Card';
import close from './icons/close';
import handleEventOpenMenu from './handleEventOpenMenu';

export default class MainPage {
  constructor() {
    this.cardObj = null;
  }

  init(cardObj) {
    this.cardObj = cardObj;
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
    const mainLetters = [];
    'Main'.split('').forEach((letter) => {
      const span = create({ el: 'span' }, { className: 'spanLetter' }, { child: letter });
      mainLetters.push(span);
    });
    let letterWrapper = create({ el: 'a' }, { className: 'letter-wrapper' }, { child: mainLetters }, { parent: null });
    const listMain = create({ el: 'li' }, { className: 'list' }, { child: letterWrapper }, { parent: null }, { dataAttr: [['name', 'Main']] });
    list.push(listMain);

    this.cardObj.forEach((card) => {
      const listSpan = [];
      card.word.split('').forEach((letter) => {
        const span = create({ el: 'span' }, { className: 'spanLetter' }, { child: letter });
        listSpan.push(span);
      });
      letterWrapper = create({ el: 'a' }, { className: 'letter-wrapper' }, { child: listSpan }, { parent: null });
      const listItem = create({ el: 'li' }, { className: 'list' }, { child: letterWrapper }, { parent: null }, { dataAttr: [['name', card.word]] });
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

    const startPage = new Card();
    startPage.createCards(cardObj);

    popup.addEventListener('click', (e) => { handleEventOpenMenu(e, popup, container); });
    burgerMenu.addEventListener('click', (e) => { handleEventOpenMenu(e, popup, container); });
    list.forEach((li) => {
      li.firstChild.addEventListener('click', (e) => { handleEventOpenMenu(e, popup, container); });
      li.firstChild.addEventListener('mouseenter', (e) => { handleMouseEnterMenu(e); });
      li.firstChild.addEventListener('mouseleave', (e) => { handleMouseEnterMenu(e); });
    });
  }
}
