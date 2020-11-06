/* eslint-disable import/extensions */
import create from './utils/create.js';

export default class Chip {
  constructor({ number }) {
    this.number = number;

    this.chip = create('div', 'chip', String(number), null, ['key', number]);
  }
}
