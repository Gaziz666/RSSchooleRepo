/* eslint-disable import/extensions */
// import _ from 'lodash';
import GamePuzzle from './gem-puzzle.js';
// import gameType from './layouts/index.js';
import '../css/style.css';
import '../css/popup.css';

require.context('./../assets/img/box', true, /\.(png|svg|jpg|gif)$/);
require.context('./../assets/audio', true, /\.wav$/);

new GamePuzzle(4).init().generateLayout(16);
