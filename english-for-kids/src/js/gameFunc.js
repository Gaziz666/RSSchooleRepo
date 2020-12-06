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
let gameResult;
let listMenuMain;
const AUDIO = {
  CORRECT: 'correct',
  ERROR: 'error',
  WIN: 'win',
  LOSE: 'lose',
};
// eslint-disable-next-line no-use-before-define
const handleEventPlayCard = (e) => checkAnswer(e);

const checkGameResult = () => {
  if (errorCount === 0) {
    gameResult.firstChild.setAttribute('src', './assets/img/winner.png');
    gameResult.firstChild.setAttribute('alt', 'winner image');
    winAudio.play();
  } else {
    gameResult.firstChild.setAttribute('src', './assets/img/lose.png');
    gameResult.firstChild.setAttribute('alt', 'lose image');
    loseAudio.play();
  }

  while (container.childNodes.length > 0) {
    container.lastChild.remove();
  }
  const event = new Event('click', { bubbles: true });
  setTimeout(() => {
    gameResult.firstChild.removeAttribute('src');
    gameResult.firstChild.removeAttribute('alt');
    listMenuMain.dispatchEvent(event);
  }, 3000);
};

const start = (cardContainer, playButton, repeatButton) => {
  container = cardContainer || container;
  playBtn = playButton || playBtn;
  repeatBtn = repeatButton || repeatBtn;
  playBtn.classList.add('non-visible');
  repeatBtn.classList.remove('non-visible');
  gameResult = container.previousSibling;
  listMenuMain = container.nextSibling.querySelector('[data-name="Main"]');
  if (!errorAudio) {
    gameResult.childNodes.forEach((item) => {
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
    checkGameResult();
    return;
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

export { start, repeat };
