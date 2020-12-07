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

const starSvg = () => {
  const div = document.createElement('div');
  div.innerHTML = '<svg viewBox="0 0 24 24" fill="red" width="25px" height="25px"><path d="M0 0h24v24H0z" fill="none"/><path d="M0 0h24v24H0z" fill="none"/><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>';
  return div.firstChild;
};

const starOutlineSvg = () => {
  const div = document.createElement('div');
  div.innerHTML = '<svg viewBox="0 0 24 24" fill="red" width="25px" height="25px"><path d="M0 0h24v24H0z" fill="none"/><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/></svg>';
  return div.firstChild;
};

// eslint-disable-next-line no-use-before-define
const handleEventPlayCard = (e) => checkAnswer(e);

const checkGameResult = () => {
  const errorCountElement = gameResult.childNodes[1];
  if (errorCount === 0) {
    gameResult.firstChild.setAttribute('src', './assets/img/winner.png');
    gameResult.firstChild.setAttribute('alt', 'winner image');
    winAudio.play();
  } else {
    gameResult.firstChild.setAttribute('src', './assets/img/lose.png');
    gameResult.firstChild.setAttribute('alt', 'lose image');
    loseAudio.play();
    errorCountElement.innerHTML = `Error count: ${errorCount}`;
  }

  while (container.childNodes.length > 0) {
    container.lastChild.remove();
  }
  const event = new Event('click', { bubbles: true });
  setTimeout(() => {
    gameResult.firstChild.removeAttribute('src');
    gameResult.firstChild.removeAttribute('alt');
    errorCountElement.innerHTML = '';
    listMenuMain.dispatchEvent(event);
  }, 5000);
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
  const countOfCards = 8;
  const countOfNoCardsInContainer = 2;
  randomIndexArr = randomIndexArr || [...Array(countOfCards).keys()]
    .sort(() => (Math.random() - 0.5))
    .map((item) => item + countOfNoCardsInContainer);

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
  const starContainer = container.childNodes[1].firstChild;
  const card = e.target;
  const maxStarCount = 13;
  if (card.dataset.name === audioName) {
    container.childNodes.forEach((cards) => {
      cards.removeEventListener('click', handleEventPlayCard);
    });
    card.classList.add('inactive');
    correctAudio.play();
    starContainer.append(starSvg());
    start();
  } else {
    errorAudio.play();
    errorCount += 1;
    starContainer.append(starOutlineSvg());
  }
  if (starContainer.childNodes.length === maxStarCount) {
    starContainer.firstChild.remove();
  }
};

export { start, repeat };
