import create from './utils/create';

const audioCorrect = create(
  { el: 'audio' },
  { className: 'audio' },
  { child: null },
  { parent: null },
  {
    dataAttr: [
      ['src', './assets/audio/correct.mp3'],
      ['name', 'correct'],
    ],
  },
);
const audioError = create(
  { el: 'audio' },
  { className: 'audio' },
  { child: null },
  { parent: null },
  {
    dataAttr: [
      ['src', './assets/audio/error.mp3'],
      ['name', 'error'],
    ],
  },
);
const audioWin = create(
  { el: 'audio' },
  { className: 'audio' },
  { child: null },
  { parent: null },
  {
    dataAttr: [
      ['src', './assets/audio/winGame.mp3'],
      ['name', 'win'],
    ],
  },
);
const audioLose = create(
  { el: 'audio' },
  { className: 'audio' },
  { child: null },
  { parent: null },
  {
    dataAttr: [
      ['src', './assets/audio/loseGame.mp3'],
      ['name', 'lose'],
    ],
  },
);
export {
  audioCorrect, audioError, audioLose, audioWin,
};
