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

export default class MainPage {
  constructor() {
    this.cardObj = null;
  }

  init(cardObj) {
    this.cardObj = cardObj;
    // create header
    const toggle = create('div',
      {
        className: 'toggle-wrapper',
        child: [
          create('input',
            {
              className: 'checkbox',
              child: null,
              parent: null,
              dataAttr: [['type', 'checkbox'], ['id', 'checkbox']],
            }),
          create('label',
            {
              className: 'checkbox-label',
              child: null,
              parent: null,
              dataAttr: [['for', 'checkbox']],
            }),
        ],
      });
    const header = create('header',
      {
        className: 'main-header',
        child: [
          create('div',
            {
              className: 'logo',
              child: burgerMenu,
            }),
          toggle,
        ],
      });
    const container = create('main', { className: 'card-container' });
    const list = [];
    const mainLetters = [];
    'Main'.split('').forEach((letter) => {
      const span = create('span', { className: 'spanLetter', child: letter });
      mainLetters.push(span);
    });
    let letterWrapper = create('a',
      {
        className: 'letter-wrapper',
        child: mainLetters,
        parent: null,
      });
    const listMain = create('li',
      {
        className: 'list',
        child: letterWrapper,
        parent: null,
        dataAttr: [['name', 'Main']],
      });
    list.push(listMain);

    this.cardObj.forEach((card) => {
      const listSpan = [];
      card.word.split('').forEach((letter) => {
        const span = create('span', { className: 'spanLetter', child: letter });
        listSpan.push(span);
      });
      letterWrapper = create('a', { className: 'letter-wrapper', child: listSpan, parent: null });
      const listItem = create('li',
        {
          className: 'list',
          child: letterWrapper,
          parent: null,
          dataAttr: [['name', card.word]],
        });
      list.push(listItem);
    });
    // create menu, popup
    const navMenu = create('div',
      {
        className: 'nav-menu-container',
        child: [
          create('div', { className: 'close-wrapper', child: close }),
          create('ul', { className: 'nav-menu', child: list }),
        ],
      });
    const popup = create('div', { className: 'popup', child: navMenu });
    const resultImg = create('img', { className: 'result-img' });
    const errorCount = create('h3', { className: 'error-count' });
    const gameResultDiv = create('div',
      {
        className: 'result-div',
        child: [resultImg, errorCount, audioCorrect, audioError, audioWin, audioLose],
      });
    const footer = create('footer',
      {
        className: 'footer',
        child: [
          create('a',
            {
              className: 'git-link',
              child: '@Gaziz666',
              parent: null,
              dataAttr: [['href', 'https://github.com/Gaziz666/'], ['target', '_blank']],
            }),
          create('span', { className: 'date', child: ', 2020Q3' }),
          schoolLogo,
        ],
      });

    document.body.append(header);
    document.body.append(gameResultDiv);
    document.body.append(container);
    document.body.append(popup);
    document.body.append(footer);

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
