import create from './utils/create';
import CARD_TYPE from './cards/CARD_TYPE';
import loadCardObj from './cards/loadCardObj';
import rotate from './icons/rotate';
import handleRotateCard from './handleRotateCard';
import handlePlayToggle from './handlePlayToggle';
import handleEventClickCard from './handleEventClickCard';

export default class Card {
  constructor(container, toggle) {
    this.cardObj = null;
    this.cardType = null;
    this.container = container;
    this.toggle = toggle;
  }

  createCards(cardObj) {
    this.cardType = cardObj[0].type;
    this.cardObj = cardObj;
    this.rotate = rotate;
    if (this.toggle.checked && this.cardType !== CARD_TYPE.MAIN) {
      this.cardObj.forEach((card) => {
        const playCard = create(
          { el: 'div' },
          { className: 'card-img' },
          { child: null },
          { parent: null },
          {
            dataAttr: [
              ['style', `background-image: url("${card.image}"`],
              ['name', card.name],
            ],
          },
        );
        this.container.append(playCard);
        console.log()
      });
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

    this.toggle.addEventListener('click', () => (this.reloadCard(this.cardType)));
    console.log(this.cardType)
  }

  reloadCard(word) {
    while (this.container.hasChildNodes()) {
      this.container.lastChild.remove();
    }
    this.createCards(loadCardObj(word));
  }
}
