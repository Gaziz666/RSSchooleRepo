//DOM element

const time = document.querySelector('#time'),
      greeting = document.querySelector('#greeting'),
      name = document.querySelector('#name'),
      focus = document.querySelector('#focus'),
      day = document.querySelector('#day'),
      body = document.querySelector('body'),
      blockquote = document.querySelector('blockquote'),
      figcaption = document.querySelector('figcaption');

// variables
const baseUrl = './assets/images/';
const images = ['01.jpg', '02.jpg', '03.jpg', '03.jpg', '04.jpg', '05.jpg','06.jpg',
  '07.jpg','08.jpg','09.jpg','10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg',
  '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg',];
const dayStatus = ['morning/', 'day/', 'evening/', 'night/']
let i = Math.floor(Math.random() * 19),
    j = 0;




// functions
//show time

const showTime = () => {
  today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();
    weakDay = today.getDay(),
    month = today.getMonth(),
    dayOfMonth = today.getDate();

  //Output Time Day
  time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
  day.innerHTML = `${dayOfWeak(weakDay)}, ${dayOfMonth} ${monthName(month)}`;
  setTimeout(showTime, 1000);

  
}
//add zero
const addZero = (n) => {
  return (parseInt(n) < 10 ? '0' : '') + n;
}

//return day of week
const dayOfWeak = (n) => {
  switch (n) {
    case 0:
      return 'Понедельник'
    case 1:
      return 'Вторник'
    case 2:
      return 'Среда'
    case 3:
      return 'четверг'
    case 4:
      return 'Пятница'
    case 5:
      return 'Суббота'
    case 6:
      return 'Воскресение'
  }
}

// return month name
const monthName = (n) => {
  switch (n) {
    case 0:
      return 'Января'
    case 1:
      return 'Февраля'
    case 2:
      return 'Марта'
    case 3:
      return 'Апреля'
    case 4:
      return 'Мая'
    case 5:
      return 'Июня'
    case 6:
      return 'Июля'
    case 7:
      return 'Августа'
    case 8:
      return 'Сентября'
    case 9:
      return 'Октября'
    case 10:
      return 'Ноября'
    case 11:
      return 'Декабря'
  }
}

//set Background and Greeting
const setBgGreet = () => {
  let today = new Date(),
  hour = today.getHours(),
  min = today.getMinutes(),
  sec = today.getSeconds();


    if (hour >= 6 && hour < 12) { 
      j = 0
      getImage()
      greeting.textContent = 'Доброе утро'
    } else if (hour >= 12 && hour < 18) {
      j = 1;
      getImage()
      greeting.textContent = 'Добрый день';
    } else if (hour >= 18 && hour < 24) {
      j = 2;
      getImage()
      greeting.textContent = 'Добрый вечер';
      document.body.style.color = "white";
    } else {
      j = 3;
      getImage()
      greeting.textContent = 'Доброй ночи';
      document.body.style.color = "white"
    }
    let timeout = ((60 - min) * 60 - (60 - sec)) * 1000
    setTimeout(setBgGreet, timeout);
    
}

// Get Name 
const getName = () => {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter name]'
  } else {
    name.textContent = localStorage.getItem('name')
  }
}

// Set Name
const setName = (e) => {
  if (e.type === 'keypress') {
    if (e.keyCode === 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur()
    }
  }else if (name.textContent === ' ' || name.textContent === ''){
    name.textContent = '[Enter name]'
  } else {
    localStorage.setItem('name', e.target.innerText)   
  }
}

// Get Focus 
const getFocus = () => {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter focus]'
  } else {
    focus.textContent = localStorage.getItem('focus')
  }
}

// Set Focus
const setFocus = (e) => {
  if (e.type === 'keypress') {
    if (e.keyCode === 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur()
    }
  }else if (focus.textContent === ' ' || focus.textContent === ''){
    focus.textContent = '[Enter focus]'
  } else {
    localStorage.setItem('focus', e.target.innerText)   
  }
}

// Delete default name onClick
const delDefaultName = (e) => {
  if (name.textContent === '[Enter name]') {
    name.textContent = ' '
  }
}

// Delete default focus onClick
const delDefaultFocus = (e) => {
  if (focus.textContent === '[Enter focus]') {
    focus.textContent = ' '
  }
}

// change background img
const viewBgImage = (url) => {
  const src = url;
  const img = document.createElement('img');
  img.src = src;
  img.onload = () => {      
    body.style.backgroundImage = `url(${src})`;
  }; 
}


// get image function

const getImage = () => {
  const index = i % images.length;
  const statusIndex = j % dayStatus.length
  const imageSrc = baseUrl + dayStatus[statusIndex] + images[index];
  viewBgImage(imageSrc);
  i++;
  if (index === 20) {
    j++;
  }
}

// change Quote
async function getQuote() {  
  const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru`;
  const res = await fetch(url);
  const data = await res.json(); 
  blockquote.textContent = data.quoteText;
  figcaption.textContent = data.quoteAuthor;
}


name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('click', delDefaultName)
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('click', delDefaultFocus)
document.querySelector('#nextImage').addEventListener('click', getImage)
document.addEventListener('DOMContentLoaded', getQuote);
document.querySelector('#nextQuote').addEventListener('click', getQuote);


// Run;
showTime();
setBgGreet();
getName();
getFocus();
getQuote();