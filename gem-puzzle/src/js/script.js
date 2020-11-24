import GamePuzzle from './gem-puzzle';
import '../css/style.css';
import '../css/popup.css';
import generateLayout from './generateLayout';

require.context('./../assets/img/box', true, /\.(png|svg|jpg|gif)$/);
require.context('./../assets/audio', true, /\.wav$/);

new GamePuzzle(4).init();
generateLayout(4);
