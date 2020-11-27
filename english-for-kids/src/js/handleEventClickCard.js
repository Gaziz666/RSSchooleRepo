import generateCardLayout from "./generateCardLayout";

export default function handleEventClickCard(e, cardType) {
  document.querySelectorAll('.card').forEach((card) => card.remove());
  generateCardLayout(cardType);
}