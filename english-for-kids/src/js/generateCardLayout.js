import Card from './Card';

export default function generateCardLayout(cardType) {
  new Card(cardType).createCards();
}
