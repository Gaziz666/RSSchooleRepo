/* eslint-disable import/extensions */
import create from './utils/create.js';

export default class Chip {
  constructor(number, chipType) {
    this.number = number;
    this.chipType = chipType;

    this.chip = create('div', `chip chip${this.chipType}`, String(number), null, ['key', number]);
  }
}
