import create from './utils/create';
import CARD_TYPE from './cards/CARD_TYPE';
import loadCardObj from './cards/loadCardObj';
import playIcon from './icons/playIcon';
import repeatIcon from './icons/repeatIcon';
import handleRotateCard from './handleRotateCard';
import handleEventClickCard from './handleEventClickCard';
import { start, repeat } from './gameFunc';

export default class Card {
  constructor(container, toggle) {
    this.container = container;
    this.toggle = toggle;
    this.cardObj = null;
  }

  createCards(cardObj) {
    this.cardObj = cardObj || this.cardObj;
    this.cardType = this.cardObj[0].type || this.cardType;

    if (this.toggle.checked && this.cardType !== CARD_TYPE.MAIN) {
      this.playBtn = create('button',
        {
          className: 'play-btn',
          child: [
            create('span', { className: 'play-text', child: 'Start' }),
            playIcon,
            create('span', { className: 'play-text', child: 'game' }),
          ],
        });
      this.repeatBtn = create('button',
        {
          className: 'repeat-btn non-visible',
          child: [
            create('span', { className: 'play-text', child: 'repeat' }),
            repeatIcon,
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
      this.cardObj.forEach((card) => {
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
    } else {
      this.cardObj.forEach((card) => {
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

        if ((this.cardObj[0].type === CARD_TYPE.MAIN)) {
          frontCard.addEventListener('click', () => this.reloadCard(card.word));
        } else {
          frontCard.addEventListener('click', (e) => handleEventClickCard(e, this.toggle, audio));
        }

        if (rotateBtn) {
          rotateBtn.addEventListener('click', (e) => handleRotateCard(e, frontCard, backCard));
          flipperContainer.addEventListener('mouseleave', (e) => handleRotateCard(e, frontCard, backCard));
          backCard.addEventListener('touchend', (e) => handleRotateCard(e, frontCard, backCard));
        }
      });
    }

    this.reload = () => this.reloadCard(this.cardType);
    this.toggle.addEventListener('click', this.reload);
  }

  reloadCard(word) {
    while (this.container.hasChildNodes()) {
      this.container.lastChild.remove();
    }
    this.toggle.removeEventListener('click', this.reload);
    this.createCards(loadCardObj(word));
  }
}
