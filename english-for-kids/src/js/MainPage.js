import create from './utils/create';
import handleMouseHoverMenuList from './handleMouseHoverMenuList';
import Card from './Card';
import getCloseIcon from './icons/getCloseIcon';
import getSchoolIcon from './icons/getSchoolIcon';
import getBurgerMenuIcon from './icons/getBurgerMenuIcon';
import { closeMenu, openMenu, loadCard } from './handleEventMenu';

export default class MainPage {
  constructor() {
    this.arrOfCardObj = null;
  }

  init(arrOfCardObj) {
    this.arrOfCardObj = arrOfCardObj;
    this.container = create('main', { className: 'card-container' });
    this.renderHeader();
    this.renderMenu();
    this.renderFooter();

    const resultImg = create('img', { className: 'result-img' });
    const errorCount = create('h3', { className: 'error-count' });
    const gameResultDiv = create('div', {
      className: 'result-div',
      child: [resultImg, errorCount],
    });

    document.body.append(this.header);
    document.body.append(gameResultDiv);
    document.body.append(this.container);
    document.body.append(this.popup);
    document.body.append(this.footer);

    const startPage = new Card(this.container, this.toggle.firstChild);
    startPage.generateTrainCards(arrOfCardObj);

    this.popup.addEventListener('click', () => {
      closeMenu(this.popup);
    });
    this.burgerMenu.addEventListener('click', () => {
      openMenu(this.popup);
    });
    this.list.forEach((li) => {
      li.firstChild.addEventListener('click', (e) => {
        loadCard(e, this.popup, startPage);
      });
      li.firstChild.addEventListener('mouseenter', (e) => {
        handleMouseHoverMenuList(e);
      });
      li.firstChild.addEventListener('mouseleave', (e) => {
        handleMouseHoverMenuList(e);
      });
    });
  }

  renderHeader() {
    this.toggle = create('div', {
      className: 'toggle-wrapper',
      child: [
        create('input', {
          className: 'checkbox',
          child: null,
          parent: null,
          dataAttr: [
            ['type', 'checkbox'],
            ['id', 'checkbox'],
          ],
        }),
        create('label', {
          className: 'checkbox-label',
          child: null,
          parent: null,
          dataAttr: [['for', 'checkbox']],
        }),
      ],
    });
    this.burgerMenu = getBurgerMenuIcon({
      attribute: 'div',
      className: null,
      width: 30,
      height: 30,
    });
    this.header = create('header', {
      className: 'main-header',
      child: [
        create('div', {
          className: 'logo',
          child: this.burgerMenu,
        }),
        this.toggle,
      ],
    });
  }

  renderMenu() {
    this.list = [];
    const mainLetters = [];
    'Main'.split('').forEach((letter) => {
      const span = create('span', { className: 'spanLetter', child: letter });
      mainLetters.push(span);
    });
    let letterWrapper = create('a', {
      className: 'letter-wrapper',
      child: mainLetters,
      parent: null,
    });
    const listMain = create('li', {
      className: 'list',
      child: letterWrapper,
      parent: null,
      dataAttr: [['name', 'Main']],
    });
    this.list.push(listMain);

    this.arrOfCardObj.forEach((card) => {
      const listSpan = [];
      card.word.split('').forEach((letter) => {
        const span = create('span', { className: 'spanLetter', child: letter });
        listSpan.push(span);
      });
      letterWrapper = create('a', {
        className: 'letter-wrapper',
        child: listSpan,
        parent: null,
      });
      const listItem = create('li', {
        className: 'list',
        child: letterWrapper,
        parent: null,
        dataAttr: [['name', card.word]],
      });
      this.list.push(listItem);
    });

    const navMenu = create('div', {
      className: 'nav-menu-container',
      child: [
        create('div', {
          className: 'close-wrapper',
          child: getCloseIcon({
            attribute: 'div',
            className: 'close-btn',
            width: 30,
            height: 30,
          }),
        }),
        create('ul', { className: 'nav-menu', child: this.list }),
      ],
    });
    this.popup = create('div', { className: 'popup', child: navMenu });
  }

  renderFooter() {
    const schoolLogo = getSchoolIcon({
      attribute: 'a',
      className: 'close-btn',
    });
    schoolLogo.setAttribute('href', 'https://rs.school/js/');
    schoolLogo.setAttribute('target', '_blank');
    this.footer = create('footer', {
      className: 'footer',
      child: [
        create('a', {
          className: 'git-link',
          child: '@Gaziz666',
          parent: null,
          dataAttr: [
            ['href', 'https://github.com/Gaziz666/'],
            ['target', '_blank'],
          ],
        }),
        create('span', { className: 'date', child: ', 2020Q3' }),
        schoolLogo,
      ],
    });
  }
}
