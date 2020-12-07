import actionA from './actionA';
import actionB from './actionB';
import animalA from './animalA';
import animalB from './animalB';
import fruits from './fruits';
import emotions from './emotions';
import colors from './colors';
import sports from './sports';
import main from './main';
import CARD_TYPE from './CARD_TYPE';

export default function loadCardObj(cardType) {
  switch (cardType) {
    case CARD_TYPE.MAIN:
      return main;
    case CARD_TYPE.ACTION_A:
      return actionA;
    case CARD_TYPE.ACTION_B:
      return actionB;
    case CARD_TYPE.ANIMALS_A:
      return animalA;
    case CARD_TYPE.ANIMALS_B:
      return animalB;
    case CARD_TYPE.COLORS:
      return colors;
    case CARD_TYPE.SPORTS:
      return sports;
    case CARD_TYPE.FRUITS:
      return fruits;
    case CARD_TYPE.EMOTIONS:
      return emotions;
    default:
  }
  return null;
}
