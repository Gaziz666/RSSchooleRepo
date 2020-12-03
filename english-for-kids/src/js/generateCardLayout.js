import Card from './Card';
import loadCard from './cards/loadCard';

export default function generateCardLayout(cardName, container) {
  while (container.hasChildNodes()) {
    container.lastChild.remove();
  }
  new Card().createCards(loadCard(cardName));
}
