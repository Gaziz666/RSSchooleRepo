import Card from './Card';
import loadCard from './cards/loadCard';

export default function generateCardLayout(cardName) {
  document.querySelectorAll('.card').forEach((card) => card.remove());
  new Card().createCards(loadCard(cardName));
}
