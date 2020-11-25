export default class Timer {
  constructor() {
    this.sec = 0;
    this.min = 0;
    this.pause = false;
    this.minHTML = document.querySelector('.min');
    this.secHTML = document.querySelector('.sec');
  }

  startTimer() {
    this.minHTML.innerHTML = `${this.min}`;
    if (+this.sec < 10) {
      this.secHTML.innerHTML = `0${this.sec}`;
    } else {
      this.secHTML.innerHTML = this.sec;
    }
    if (+this.sec === 59) {
      this.sec = 0;
      this.min += 1;
    } else {
      this.sec += 1;
    }

    if (!this.pause) {
      setTimeout(() => this.startTimer(), 1000);
    }
  }

  stop() {
    this.pause = true;
  }

  start() {
    this.pause = false;
    this.startTimer();
  }

  set(min, sec) {
    this.min = +min;
    this.sec = +sec;
  }

  get() {
    return {
      min: this.min,
      sec: this.sec,
    };
  }
}
