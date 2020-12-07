import create from './utils/create';
import CARD_TYPE from './cards/CARD_TYPE';
import loadCardObj from './cards/loadCardObj';
import handleEventClickCard from './handleEventClickCard';
import { start, repeat } from './gameFunc';
import { getPlayIcon, getRepeatIcon } from './getIcons';
import { rotateCard, reversRotateCard } from './handleEventRotateCard';

export default class Card {
  constructor(container, toggle) {
    this.container = container;
    this.toggle = toggle;
    this.cardObj = null;
  }

  generatePlayCards(arrOfCardObj) {
    this.arrOfCardObj = arrOfCardObj;
    this.cardType = this.arrOfCardObj[0].type;
    this.playBtn = create('button',
      {
        className: 'play-btn',
        child: [
          create('span', { className: 'play-text', child: 'Start' }),
          getPlayIcon({
            attribute: 'div', className: 'play-icon', width: 50, height: 50,
          }),
          create('span', { className: 'play-text', child: 'game' }),
        ],
      });
    this.repeatBtn = create('button',
      {
        className: 'repeat-btn non-visible',
        child: [
          create('span', { className: 'play-text', child: 'repeat' }),
          getRepeatIcon({
            attribute: 'div', className: 'play-icon', width: 50, height: 50,
          }),
          create('span', { className: 'play-text', child: 'word' }),
        ],
      });
    const BtnContainer = create('div',
      {
        className: 'play-btn-container',
        child: [this.playBtn, this.repeatBtn],
      });
    const starContainer = create('div', { className: 'star-container' });
    const starBlock = create('div', { className: 'star-block', child: starContainer });
    this.container.append(BtnContainer, starBlock);
    this.arrOfCardObj.forEach((card) => {
      const audio = create('audio',
        {
          className: 'audio',
          child: null,
          parent: null,

          dataAttr: [
            ['src', card.audioSrc], ['id', card.word],
          ],
        });
      const playCard = create('div',
        {
          className: 'card-img playCardStyle',
          child: audio,
          parent: null,

          dataAttr: [
            ['style', `background-image: url("${card.image}"`],
            ['name', card.word],
          ],
        });
      this.container.append(playCard);
    });
    this.playBtn.addEventListener('click', () => start(this.container, this.playBtn, this.repeatBtn));
    this.repeatBtn.addEventListener('click', () => repeat());
  }

  generateTrainCards(arrOfCardObj) {
    this.arrOfCardObj = arrOfCardObj;
    this.cardType = this.arrOfCardObj[0].type;
    this.arrOfCardObj.forEach((card) => {
      let rotateBtn = null;
      if (this.cardType !== CARD_TYPE.MAIN) {
        rotateBtn = create('div', { className: 'rotate-btn' });
      }
      const name = create('div',
        {
          className: 'card-name',
          child: card.word,
          parent: null,
        });
      const audio = create('audio',
        {
          className: 'audio',
          child: null,
          parent: null,

          dataAttr: [
            ['src', card.audioSrc], ['id', card.word],
          ],
        });
      const frontCard = create('div',
        {
          className: 'front',
          child: [
            create('div',
              {
                className: 'card-img',
                parent: null,
                child: null,
                dataAttr:
                  [
                    ['style', `background-image: url("${card.image}"`],
                  ],
              }),
            name,
            rotateBtn,
            audio,
          ],
        });
      const nameBack = create('div',
        {
          className: 'card-name',
          child: card.translation,
          parent: null,
        });
      const backCard = create('div',
        {
          className: 'back',
          child: [
            create('div',
              {
                className: 'card-img',
                child: null,
                parent: null,
                dataAttr: [
                  ['style', `background-image: url("${card.image}"`]],
              }),
            nameBack,
          ],
        });
      const flipper = create('div',
        {
          className: 'flipper',
          child: [frontCard, backCard],
          parent: null,
        });
      const flipperContainer = create('div',
        {
          className: 'flipper-container',
          child: flipper,
          parent: null,
        });
      this.container.append(flipperContainer);

      if ((this.arrOfCardObj[0].type === CARD_TYPE.MAIN)) {
        frontCard.addEventListener('click', () => this.reloadCard(card.word));
      } else {
        frontCard.addEventListener('click', (e) => handleEventClickCard(e, this.toggle, audio));
      }

      if (rotateBtn) {
        rotateBtn.addEventListener('click', () => rotateCard(frontCard, backCard));
        flipperContainer.addEventListener('mouseleave', () => reversRotateCard(frontCard, backCard));
        backCard.addEventListener('touchend', () => reversRotateCard(frontCard, backCard));
      }
    });

    this.reload = () => this.reloadCard(this.cardType);
    this.toggle.addEventListener('click', this.reload);
  }

  reloadCard(word) {
    while (this.container.hasChildNodes()) {
      this.container.lastChild.remove();
    }
    if (this.toggle.checked && word !== CARD_TYPE.MAIN) {
      this.generatePlayCards(loadCardObj(word));
    } else {
      this.generateTrainCards(loadCardObj(word));
    }
  }
}
