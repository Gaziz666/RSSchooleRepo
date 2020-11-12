/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
import { get, set } from './storage.js';

export default class Timer {
  constructor() {
    this.min = 0;
    this.sec = 0;
    this.start = () => {
      if (get('isRestart') === 'yes') {
        this.sec = 0;
        this.min = 0;
        set('isRestart', 'no');
      } else if (get('loadSaveGame') === 'yes') {
        this.min = Number(get('save')[2]);
        this.sec = Number(get('save')[3]);
        set('loadSaveGame', 'no');
      }

      document.querySelector('.min').innerHTML = `${this.min}`;
      if (this.sec < 10) {
        document.querySelector('.sec').innerHTML = `0${this.sec}`;
      } else {
        document.querySelector('.sec').innerHTML = this.sec;
      }

      if (get('isPause') === 'no') { // check is Pause button
        if (this.sec === 59) {
          this.sec = 0;
          this.min += 1;
        } else {
          this.sec += 1;
        }
      }

      setTimeout(this.start, 1000);
    };
  }
}
