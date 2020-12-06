import create from './utils/create';
import handleMouseHoverMenuList from './handleMouseHoverMenuList';
import burgerMenu from './icons/burgerMenu';
import Card from './Card';
import close from './icons/close';
import handleEventOpenMenu from './handleEventOpenMenu';
import {
  audioCorrect, audioError, audioWin, audioLose,
} from './audioTags';
import schoolLogo from './icons/schoolLogo';
// import createCards from './createCards';

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
          create(
            { el: 'input' },
            { className: 'checkbox' },
            { child: null },
            { parent: null },
            { dataAttr: [['type', 'checkbox'], ['id', 'checkbox']] },
          ),
          create(
            { el: 'label' },
            { className: 'checkbox-label' },
            { child: null },
            { parent: null },
            { dataAttr: [['for', 'checkbox']] },
          ),
        ],
      });
    const header = create({ el: 'header' }, { className: 'main-header' },
      {
        child: [
          create({ el: 'div' }, { className: 'logo' }, { child: burgerMenu }),
          toggle,
        ],
      });
    const container = create({ el: 'main' }, { className: 'card-container' });
    const list = [];
    const mainLetters = [];
    'Main'.split('').forEach((letter) => {
      const span = create({ el: 'span' }, { className: 'spanLetter' }, { child: letter });
      mainLetters.push(span);
    });
    let letterWrapper = create(
      { el: 'a' },
      { className: 'letter-wrapper' },
      { child: mainLetters },
      { parent: null },
    );
    const listMain = create(
      { el: 'li' },
      { className: 'list' },
      { child: letterWrapper },
      { parent: null },
      { dataAttr: [['name', 'Main']] },
    );
    list.push(listMain);

    this.cardObj.forEach((card) => {
      const listSpan = [];
      card.word.split('').forEach((letter) => {
        const span = create({ el: 'span' }, { className: 'spanLetter' }, { child: letter });
        listSpan.push(span);
      });
      letterWrapper = create(
        { el: 'a' },
        { className: 'letter-wrapper' },
        { child: listSpan },
        { parent: null },
      );
      const listItem = create(
        { el: 'li' },
        { className: 'list' },
        { child: letterWrapper },
        { parent: null },
        { dataAttr: [['name', card.word]] },
      );
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
    const resultImg = create({ el: 'img' }, { className: 'result-img' });
    const gameResultDiv = create(
      { el: 'div' },
      { className: 'result-div' },
      { child: [resultImg, audioCorrect, audioError, audioWin, audioLose] },
    );
    const footer = create(
      { el: 'footer' },
      { className: 'footer' },
      {
        child: [
          create(
            { el: 'a' },
            { className: 'git-link' },
            { child: '@Gaziz666' },
            { parent: null },
            { dataAttr: [['href', 'https://github.com/Gaziz666/'], ['target', '_blank']] },
          ),
          create(
            { el: 'span' },
            { className: 'date' },
            { child: ', 2020Q3' },
          ),
          schoolLogo,
        ],
      },
    );

    document.body.append(header);
    document.body.append(gameResultDiv);
    document.body.append(container);
    document.body.append(popup);
    document.body.append(footer);

    // const startPage = createCards(container, toggle.firstChild);
    const startPage = new Card(container, toggle.firstChild);
    startPage.createCards(cardObj);

    popup.addEventListener('click', (e) => { handleEventOpenMenu(e, popup, startPage); });
    burgerMenu.addEventListener('click', (e) => { handleEventOpenMenu(e, popup, startPage); });
    list.forEach((li) => {
      li.firstChild.addEventListener('click', (e) => { handleEventOpenMenu(e, popup, startPage); });
      li.firstChild.addEventListener('mouseenter', (e) => { handleMouseHoverMenuList(e); });
      li.firstChild.addEventListener('mouseleave', (e) => { handleMouseHoverMenuList(e); });
    });
  }
}
