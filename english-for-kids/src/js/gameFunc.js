let container;
let playBtn;
let repeatBtn;
let randomIndexArr;
let index;
let errorAudio;
let correctAudio;
let loseAudio;
let winAudio;
let errorCount = 0;
const AUDIO = {
  CORRECT: 'correct',
  ERROR: 'error',
  WIN: 'win',
  LOSE: 'lose',
};
// eslint-disable-next-line no-use-before-define
const handleEventPlayCard = (e) => checkAnswer(e);

const start = (cardContainer, playButton, repeatButton) => {
  container = cardContainer || container;
  playBtn = playButton || playBtn;
  repeatBtn = repeatButton || repeatBtn;
  playBtn.classList.add('non-visible');
  repeatBtn.classList.remove('non-visible');

  if (!errorAudio) {
    container.childNodes.forEach((item) => {
      if (item.dataset.name === AUDIO.CORRECT) {
        correctAudio = item;
      } else if (item.dataset.name === AUDIO.ERROR) {
        errorAudio = item;
      } else if (item.dataset.name === AUDIO.WIN) {
        winAudio = item;
      } else if (item.dataset.name === AUDIO.LOSE) {
        loseAudio = item;
      }
    });
  }
  randomIndexArr = randomIndexArr || [...Array(8).keys()]
    .sort(() => (Math.random() - 0.5))
    .map((item) => item + 1);

  if (randomIndexArr.length === 0) {
    if (errorCount === 0) {
      container.previousSibling.setAttribute('src', './assets/img/winner.png');
      container.previousSibling.setAttribute('alt', 'winner image');
      winAudio.play();
    } else {
      container.previousSibling.setAttribute('src', './assets/img/lose.png');
      container.previousSibling.setAttribute('alt', 'lose image');
      loseAudio.play();
    }
    container.childNodes.forEach((card) => {
      card.remove();
    });
    // startPage
  }
  randomIndexArr.forEach((item) => {
    container.childNodes[item].addEventListener('click', handleEventPlayCard);
  });
  index = randomIndexArr.pop();
  setTimeout(() => container.childNodes[index].firstChild.play(), 1500);
};

const repeat = () => {
  container.childNodes[index].firstChild.play();
};

const checkAnswer = (e) => {
  const audioName = container.childNodes[index].firstChild.id;
  const card = e.target;
  if (card.dataset.name === audioName) {
    container.childNodes.forEach((cards) => {
      cards.removeEventListener('click', handleEventPlayCard);
    });
    card.classList.add('inactive');
    correctAudio.play();
    start();
  } else {
    errorAudio.play();
    errorCount += 1;
  }
};

export { start, repeat, checkAnswer };
