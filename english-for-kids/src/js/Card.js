import handleEventCard from "./handleEventCard";
import create from "./utils/create";

export default class Card {
  constructor(cardType) {
    this.cardType = cardType;
  }

  createCards(container) {
    this.cardType.forEach((card) => {
      const newCard = create('div', 'card', [
        create('div', 'card-img', null, null, ['style', `background-image: url("${card.image}"`]),
        create('div', 'card-name', card.word, null, ['style', "background-image: url('./assets/img/text-bcg.png')"]),
      ]);
      container.append(newCard);

      newCard.addEventListener('click', (e) => handleEventCard(e, card.word));
    });
  }
}
