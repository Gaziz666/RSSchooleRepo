import handleEventClickCard from './handleEventClickCard';
import CARD_TYPE from './cards/CARD_TYPE';
import create from './utils/create';
import loadCard from './cards/loadCard';

export default class Card {
  constructor(cardType) {
    this.cardType = cardType;
    this.container = document.querySelector('.card-container');
  }

  createCards() {
    this.cardType.forEach((card) => {
      const newCard = create({ el: 'div' }, { className: 'card' },
        {
          child: [
            create({ el: 'div' }, { className: 'card-img' }, { child: null }, { parent: null }, { dataAttr: [['style', `background-image: url("${card.image}"`]] }),
            create({ el: 'div' }, { className: 'card-name' }, { child: card.word }, { parent: null }, { dataAttr: [['style', "background-image: url('./assets/img/text-bcg.png')"]] }),
          ],
        });
      this.container.append(newCard);
      if (this.cardType[0].type === CARD_TYPE.MAIN) {
        newCard.addEventListener('click', (e) => handleEventClickCard(e, loadCard(card.word)));
      }
    });
  }
}
