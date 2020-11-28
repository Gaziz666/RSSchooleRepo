import create from './utils/create';
import CARD_TYPE from './cards/CARD_TYPE';
import loadCard from './cards/loadCard';
import rotate from './icons/rotate';
import burgerMenu from './icons/burgerMenu';

export default class Card {
  constructor() {
    this.cardObj = null;
    this.cardType = null;
    this.container = document.querySelector('.card-container');
    this.cardElements = document.querySelectorAll('.card');
  }

  createCards(cardObj) {
    this.cardType = cardObj[0].type;
    this.cardObj = cardObj;
    this.rotate = rotate;
    this.cardObj.forEach((card) => {
      // front card
      let rotateBtn = null;
      if (this.cardType !== CARD_TYPE.MAIN) {
        rotateBtn = create({ el: 'div' }, { className: 'rotate-btn' });
      }
      const name = create({ el: 'div' }, { className: 'card-name' }, { child: card.word },
        { parent: null }, { dataAttr: [['style', "background-image: url('')"]] });
      const audio = create({ el: 'audio' }, { className: 'audio' }, { child: null }, { parent: null }, {
        dataAttr: [
          ['src', card.audioSrc], ['id', card.word],
        ],
      });
      const newCard = create({ el: 'div' }, { className: 'card front' },
        {
          child: [
            create({ el: 'div' }, { className: 'card-img' }, { child: null },
              { parent: null }, { dataAttr: [['style', `background-image: url("${card.image}"`]] }),
            name,
            rotateBtn,
            audio,
          ],
        });
      // back card
      
      this.container.append(newCard);
      newCard.addEventListener('click', () => this.reloadCard(card.word, audio));
    });
    this.cardElements = document.querySelectorAll('.card');
  }

  reloadCard(word, audio) {
    if (this.cardObj[0].type === CARD_TYPE.MAIN) {
      this.cardElements.forEach((card) => card.remove());
      this.createCards(loadCard(word));
    } else {
      audio.play();
    }
  }
}
