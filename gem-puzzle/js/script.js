/* eslint-disable import/extensions */
// import _ from 'lodash';
import GamePuzzle from './gem-puzzle.js';
import gameType from './layouts/index.js';

new GamePuzzle(gameType).init(4).generateLayout(16);
