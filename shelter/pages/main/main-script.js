// DOM elements

const petsCard = document.querySelector('.cards');
const arrowBtn = document.querySelectorAll('.button-arrow');
const bodyWidth = document.documentElement.clientWidth;
const card = document.querySelectorAll('.card');
const burger = document.querySelector('#burger');
let cardsCount = 3;
let menuOpen = false
      
      


// header menu active
const openPageFunc = () => {
  document.querySelectorAll('.navi-links').forEach(item => {
      event.target.parentNode.classList.remove('active')
  })
  
  if(event.target.tagName === "A" && ( event.target.parentNode.attributes.key === '0' || event.target.parentNode.attributes.key === '1')) {
    event.target.parentNode.classList.add('active')
  }
}



//slider pets

const slider = () => {
  let len = petsCard.childNodes.length
  for(let i = 1; i < len; i++) {
    petsCard.childNodes[1].remove()
  }
  
  getPets(windWidth())
}

// calculat window width
const windWidth = () => {
  if (bodyWidth >= 1280) {
    cardsCount = 3;
  } else if (bodyWidth >= 768) {
    cardsCount = 2
  } else (
    cardsCount = 1
  )
  return cardsCount
}

// PEts drow
async function getPets(n) {  
  const url = './../../assets/json/pets.json'
  const res = await fetch(url);
  const data = await res.json(); 
 
  let arrCash = []
  for (let i = 0; i < n; i ++) {
    let index = Math.floor(Math.random() * 8);
    while (arrCash.indexOf(index) >= 0) {
      index = Math.floor(Math.random() * 8);
    }
    arrCash.push(index)
    let div = document.createElement('div'),
      img = document.createElement('img'),
      h4 = document.createElement('h'),
      button = document.createElement('button');

    div.className = "card";
    img.alt = "pet-image";
    img.className = "pet-image"
    h4.className = "header4 petsName";
    button.className = "button-primary_text button_margin-bottom petsButton"
    button.innerText = "Learn more"

    img.src = data[index].img;
    h4.innerText = data[index].name;
    div.setAttribute('data_index', index);
    img.setAttribute('data_index', index);
    h4.setAttribute('data_index', index);
    button.setAttribute('data_index', index);
    

    div.append(img)
    div.append(h4);
    div.append(button)
    petsCard.appendChild(div) 

    // listen click on pets card
    document.querySelectorAll('.card').forEach(item => item.addEventListener('click', popup))
    
  }
}


// hover effect for button
const hoverButton = (e) => {
  if (e.type === "mouseover") {
    document.querySelector('.close-button').style.background = '#FDDCC4'
  } else if (e.type === 'mouseout') {
    document.querySelector('.close-button').style.background = 'none'
  }
  
}

// close popup on click
const closePopup = (e) => {
  document.querySelector('.popup-back').remove()
}

// POPUP block write

async function popup(e) {  
  const url = './../../assets/json/pets.json'
  const res = await fetch(url);
  const data = await res.json(); 

  let section = document.createElement('section'),
    content = document.createElement('div'),
    divImg = document.createElement('div'),
    divText = document.createElement('div'),
    divTextInner = document.createElement('div'),
    closeButton = document.createElement('button')
    index = e.target.attributes.data_index.nodeValue;

      divTextInner.innerHTML = `
      <h3 class="name color_black bottom__10">${data[index].name}</h3>
      <h4 class="subtitle color_black">${data[index].type} - ${data[index].breed}</h4>
      <h5 class="description margin__40 color_black line-height">${data[index].description}</h5>
      <ul class="properties">
        <li><b>Age: </b><span>${data[index].age}</span></li>
        <li><b>Inoculations: </b><span>${data[index].inoculations.join(', ')}</span></li>
        <li><b>Diseases: </b><span>${data[index].diseases.join(', ')}</span></li>
        <li><b>Parasites: </b><span>${data[index].parasites.join(', ')}</span></li>
      </ul>
    `  
    
    closeButton.innerHTML = `
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.42618 6.00003L11.7046 1.72158C12.0985 1.32775 12.0985 0.689213 11.7046 0.295433C11.3108 -0.0984027 10.6723 -0.0984027 10.2785 0.295433L5.99998 4.57394L1.72148 0.295377C1.32765 -0.098459 0.68917 -0.098459 0.295334 0.295377C-0.0984448 0.689213 -0.0984448 1.32775 0.295334 1.72153L4.57383 5.99997L0.295334 10.2785C-0.0984448 10.6723 -0.0984448 11.3108 0.295334 11.7046C0.68917 12.0985 1.32765 12.0985 1.72148 11.7046L5.99998 7.42612L10.2785 11.7046C10.6723 12.0985 11.3108 12.0985 11.7046 11.7046C12.0985 11.3108 12.0985 10.6723 11.7046 10.2785L7.42618 6.00003Z" fill="#292929"/>
    </svg>
    
    `
  section.className = "popup-back";
  content.className = 'popup-container';
  divImg.className = 'img-block';
  divText.className = 'text-block'
  divTextInner.className = 'text-inner'
  divImg.style.backgroundImage = `url("${data[index].img}")`
  closeButton.className = "close-button"

  document.querySelector('body').prepend(section);
  section.append(content);
  content.append(divImg);
  content.append(divText);
  divText.append(divTextInner);
  content.append(closeButton);
}

// remove class for nav menu
const inactivClass = () => {
  document.querySelectorAll('.main-page-link').forEach((item, i) => {
    if (i > 1) {
      item.classList.remove('main-page-link')
    }
  })
}

//click on burger menu on 320 px

const burgerMenuEnable = () => {
  burger.classList.add('rotate')
  burger.classList.remove('rotate-revers')
  document.querySelector('.header').classList.add('bg-black')
  document.querySelector('.navi').classList.remove('to-right')
  document.querySelector('.navi').classList.add('to-left')
  menuOpen = true
}

const burgerMenuDisable = () => {
  burger.classList.add('rotate-revers')
  burger.classList.remove('rotate')
  document.querySelector('.header').classList.remove('bg-black')
  document.querySelector('.navi').classList.add('to-right')
  document.querySelector('.navi').classList.remove('to-left')
  menuOpen = false
}



// event handlers

const eventHandler = (e) => {
  if (e.target.className === 'popup-back' || e.target.className === 'close-button') {
    closePopup()
  }else if ((e.target.id === 'burger' || e.target.className === 'burger-line') && !menuOpen) {
    burgerMenuEnable()
  } else if ((e.target.id === 'burger' || e.target.className === 'burger-line') && menuOpen) {
    burgerMenuDisable()
  }
}

const eventHandlerMousover = (e) => {
  if (e.target.className === 'popup-back' || e.target.className === 'close-button') {
    hoverButton(e)
  }
}

const eventHandlerMousout = (e) => {
  if (e.target.className === 'popup-back' ) {
    hoverButton(e)
  }
}

// listeners

document.querySelector('nav.navi').addEventListener('click', openPageFunc);
arrowBtn.forEach(item => {item.addEventListener('click', slider)})
document.addEventListener('click', eventHandler)
document.addEventListener('mouseover', eventHandlerMousover);
document.addEventListener('mouseout', eventHandlerMousout)



// RUN

getPets(windWidth());
inactivClass()