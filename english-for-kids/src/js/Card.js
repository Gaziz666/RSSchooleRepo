import create from './utils/create';
import CARD_TYPE from './cards/CARD_TYPE';
import loadCardObj from './cards/loadCardObj';
import playIcon from './icons/playIcon';
import repeatIcon from './icons/repeatIcon';
import handleRotateCard from './handleRotateCard';
import handleEventClickCard from './handleEventClickCard';
import { start, repeat } from './gameFunc';
import {
  audioCorrect, audioError, audioWin, audioLose,
} from './audioTags';

export default class Card {
  constructor(container, toggle) {
    this.container = container;
    this.toggle = toggle;
  }

  createCards(cardObj) {
    this.cardType = cardObj[0].type;
    this.cardObj = cardObj;
    if (this.toggle.checked && this.cardType !== CARD_TYPE.MAIN) {
      this.playBtn = create(
        { el: 'button' },
        { className: 'play-btn' },
        {
          child: [
            create({ el: 'span' }, { className: 'play-text' }, { child: 'Start' }),
            playIcon,
            create({ el: 'span' }, { className: 'play-text' }, { child: 'game' }),
          ],
        },
      );
      this.repeatBtn = create(
        { el: 'button' },
        { className: 'repeat-btn non-visible' },
        {
          child: [
            create({ el: 'span' }, { className: 'play-text' }, { child: 'repeat' }),
            repeatIcon,
            create({ el: 'span' }, { className: 'play-text' }, { child: 'word' }),
          ],
        },
      );
      const BtnContainer = create(
        { el: 'div' },
        { className: 'play-btn-container' },
        { child: [this.playBtn, this.repeatBtn] },
      );
      this.container.append(BtnContainer);
      this.cardObj.forEach((card) => {
        const audio = create(
          { el: 'audio' },
          { className: 'audio' },
          { child: null },
          { parent: null },
          {
            dataAttr: [
              ['src', card.audioSrc], ['id', card.word],
            ],
          },
        );
        const playCard = create(
          { el: 'div' },
          { className: 'card-img playCardStyle' },
          { child: audio },
          { parent: null },
          {
            dataAttr: [
              ['style', `background-image: url("${card.image}"`],
              ['name', card.word],
            ],
          },
        );
        this.container.append(playCard);
      });
      this.container.append(audioError, audioCorrect, audioLose, audioWin);
      this.playBtn.addEventListener('click', () => start(this.container, this.playBtn, this.repeatBtn));
      this.repeatBtn.addEventListener('click', () => repeat());
    } else {
      this.cardObj.forEach((card) => {
        let rotateBtn = null;
        if (this.cardType !== CARD_TYPE.MAIN) {
          rotateBtn = create(
            { el: 'div' },
            { className: 'rotate-btn' },
          );
        }
        const name = create(
          { el: 'div' },
          { className: 'card-name' },
          { child: card.word },
          { parent: null },
        );
        const audio = create(
          { el: 'audio' },
          { className: 'audio' },
          { child: null },
          { parent: null },
          {
            dataAttr: [
              ['src', card.audioSrc], ['id', card.word],
            ],
          },
        );
        const frontCard = create(
          { el: 'div' },
          { className: 'front' },
          {
            child: [
              create(
                { el: 'div' },
                { className: 'card-img' },
                { child: null },
                { parent: null },
                {
                  dataAttr:
                  [
                    ['style', `background-image: url("${card.image}"`],
                  ],
                },
              ),
              name,
              rotateBtn,
              audio,
            ],
          },
        );
        const nameBack = create(
          { el: 'div' },
          { className: 'card-name' },
          { child: card.translation },
          { parent: null },
        );
        const backCard = create(
          { el: 'div' },
          { className: 'back' },
          {
            child: [
              create(
                { el: 'div' },
                { className: 'card-img' },
                { child: null },
                { parent: null },
                {
                  dataAttr: [
                    ['style', `background-image: url("${card.image}"`]],
                },
              ),
              nameBack,
            ],
          },
        );
        const flipper = create(
          { el: 'div' },
          { className: 'flipper' },
          { child: [frontCard, backCard] },
          { parent: null },
        );
        const flipperContainer = create(
          { el: 'div' },
          { className: 'flipper-container' },
          { child: flipper },
          { parent: null },
        );
        this.container.append(flipperContainer);

        if ((this.cardObj[0].type === CARD_TYPE.MAIN)) {
          frontCard.addEventListener('click', () => this.reloadCard(card.word));
        } else {
          frontCard.addEventListener('click', (e) => handleEventClickCard(e, this.toggle, audio));
        }

        if (rotateBtn) {
          rotateBtn.addEventListener('click', (e) => handleRotateCard(e, frontCard, backCard));
          backCard.addEventListener('mouseleave', (e) => handleRotateCard(e, frontCard, backCard));
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
