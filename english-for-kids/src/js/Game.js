import create from './utils/create';
import handleCheckAnswer from './handleCheckAnswer';

export default class Game {
  start(cardObj, container, playBtn, repeatBtn) {
    this.cardObj = cardObj;
    this.container = container;
    this.playBtn = playBtn;
    this.repeatBtn = repeatBtn;
    this.playBtn.classList.add('non-visible');
    this.repeatBtn.classList.remove('non-visible');

    const randomIndexArr = [...Array(8).keys()]
      .sort(() => (Math.random() - 0.5))
      .map((item) => item + 1);
    this.index = randomIndexArr.pop();
    this.container.childNodes[this.index].firstChild.play();
    this.container.childNodes.forEach((card) => {
      const func = (e) => handleCheckAnswer(e, this.container, this.index);
      card.addEventListener('click', func);
    });
  }

  repeat() {
    this.container.childNodes[this.index].firstChild.play();
  }

  checkAnswer(card) {
    const audioName = this.container.childNodes[this.index].firstChild.id;
    if (card.dataset.name === audioName) {
      const inactive = create({ el: 'div' }, { className: 'inactive' });
      card.append(inactive);
    } else {

    }
    console.log('work listenet');
    console.log(card.dataset.name);
    console.log(this.container.childNodes[this.index].firstChild.id);
  }
}
