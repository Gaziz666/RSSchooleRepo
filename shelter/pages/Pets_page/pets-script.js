// DOM element
const petsList = document.querySelector('#petsList');
const pageNumber = document.querySelector('#pageNumber');
const leftBtn = document.querySelectorAll('.leftButton');
const rightBtn = document.querySelectorAll('.rightButton')
const burger = document.querySelector('#burger');
const header = document.querySelector('.header');
const navigation = document.querySelector('.navi');
const body = document.querySelector('body');
let menuOpen = false

// variable

let petsArr = []
let countOfPets = 0;
let currentPage  = 0;
let countOfPage = 0

// get pets DATA

async function getMainPets(n) {  
  const url = './../../assets/json/pets.json'
  const res = await fetch(url);
  const data = await res.json(); 
  
  countOfPage = 48 / n

  for (let i = 0; i < countOfPage; i++) {
    let petsArrItem = []
    let j = 0

    while(j < n) {
      let item = Math.floor(Math.random() * 8);
      let pet = data[item]
      if(petsArrItem.indexOf(pet) < 0) {
        petsArrItem.push(pet)
        j++
      }
    }

    petsArr.push(petsArrItem)
  }
  drawPets()
  burgerMenuDisable()
}

// remove class for nav menu inactive

const inactivClass2 = () => {
  document.querySelectorAll('.pets-link-color_dark').forEach((item, i) => {
    if (i > 1) {
      item.classList.remove('pets-link-color_dark')
    }
  })
}

// event handler click

const handleEvent = (e) => {
  // open main page for click on logo
  if(e.target.parentNode.classList[0] === 'logo') {
    document.location.href = "./../main/index.html";
  }
  // left button slider
  if(e.target.id === "left") {

    if (currentPage === 0) {

    } else {
      currentPage --
      removePets()
      drawPets()
    }
    // double left button slider
  } else if(e.target.id === "double-left"){

    if (currentPage === 0) {

    } else {
      currentPage = 0
      removePets()
      drawPets()
    }
    // right button slider
  } else if(e.target.id === "right") {

    if (currentPage === countOfPage - 1) {

    } else {
      currentPage ++
      removePets()
      drawPets()
    }
    // double click button slider
  } else if(e.target.id === "double-right") {
    
    if (currentPage === countOfPage - 1) {

    } else {
      currentPage = countOfPage - 1
      removePets()
      drawPets()
    }

  }
  // close popup
  if (e.target.className === 'popup-back' || e.target.className === 'close-button') {
    closePopup()
  } //burger menu
    else if ((e.target.id === 'burger' || e.target.className === 'burger-line black_bottom') && !menuOpen) {
  
      burgerMenuEnable()
    
  } else if (
      ((e.target.id === 'burger' || e.target.className === 'burger-line black_bottom') && menuOpen) ||
      (e.target.className === 'overlay')
      ) {
    burgerMenuDisable()
  }
}
  // mouse over and out listener
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

// calculate window width

const mainWindWidth = () => {
  let bodyWidth = document.documentElement.clientWidth;
  if (bodyWidth >= 1280) {
    cardsCount = 8;
  } else if (bodyWidth >= 768) {
    cardsCount = 6
  } else (
    cardsCount = 3
  )
  return cardsCount
}

// PEts draw

const drawPets = () => {
  let mainPetsCard = document.createElement('div')
  for (let i = 0; i < countOfPets; i ++) {
    
    let 
      div = document.createElement('div'),
      img = document.createElement('img'),
      h4 = document.createElement('h'),
      button = document.createElement('button');

    mainPetsCard.className = "cards-container"
    div.className = "margin-top-30";
    img.alt = "pet-image";
    img.className = "card_image"
    h4.className = "header4";
    button.className = "button-primary_text button_margin-bottom"
    button.innerText = "Learn more"

    img.src = petsArr[currentPage][i].img;
    h4.innerText = petsArr[currentPage][i].name;
    div.setAttribute('data_index', currentPage);
    div.setAttribute('data_index2', i);
    img.setAttribute('data_index', currentPage);
    img.setAttribute('data_index2', i);
    h4.setAttribute('data_index', currentPage);
    h4.setAttribute('data_i', i);
    button.setAttribute('data_index', currentPage);
    button.setAttribute('data_index2', i);
    

    div.append(img)
    div.append(h4);
    div.append(button)
    mainPetsCard.append(div); 
    
  }
  petsList.append(mainPetsCard)
  showCurrentPage()

  // listen click on pets card
  document.querySelectorAll('.margin-top-30').
  forEach(item => item.addEventListener('click', popup))
}

// remove pets
const removePets = () => {
  document.querySelector('.cards-container').remove()
}

// show current Page 

const showCurrentPage = () => {
  document.querySelector('#pageNumber').innerText = currentPage + 1;
  if (currentPage === 0) {
    leftBtn.forEach(item => {
      item.classList.remove('buttons-active')
      item.classList.add('buttons-inactive')
    })
    rightBtn.forEach(item => {
      item.classList.remove('buttons-inactive')
      item.classList.add('buttons-active')
    })
  } else if(currentPage === countOfPage - 1) {
    rightBtn.forEach(item => {
      item.classList.remove('buttons-active')
      item.classList.add('buttons-inactive')
    })
    leftBtn.forEach(item => {
      item.classList.remove('buttons-inactive')
      item.classList.add('buttons-active')
    })
  } else {
    leftBtn.forEach(item => {
      item.classList.remove('buttons-inactive')
      item.classList.add('buttons-active')
    })
    rightBtn.forEach(item => {
      item.classList.remove('buttons-inactive')
      item.classList.add('buttons-active')
    })
  }
}


// close popup on click
const closePopup = (e) => {
  document.querySelector('.popup-back').remove()
}

// POPUP block draw

const popup = (e) => {  

  let section = document.createElement('section'),
    content = document.createElement('div'),
    divImg = document.createElement('div'),
    divText = document.createElement('div'),
    divTextInner = document.createElement('div'),
    closeButton = document.createElement('button')
    index = e.target.attributes.data_index.nodeValue;
    index2 = e.target.attributes.data_index2.nodeValue

    divTextInner.innerHTML = `
      <h3 class="name color_black bottom__10">${petsArr[index][index2].name}</h3>
      <h4 class="subtitle color_black">${petsArr[index][index2].type} - ${petsArr[index][index2].breed}</h4>
      <h5 class="description margin__40 color_black line-height">${petsArr[index][index2].description}</h5>
      <ul class="properties">
        <li><b>Age: </b><span>${petsArr[index][index2].age}</span></li>
        <li><b>Inoculations: </b><span>${petsArr[index][index2].inoculations.join(', ')}</span></li>
        <li><b>Diseases: </b><span>${petsArr[index][index2].diseases.join(', ')}</span></li>
        <li><b>Parasites: </b><span>${petsArr[index][index2].parasites.join(', ')}</span></li>
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
  divImg.style.backgroundImage = `url("${petsArr[index][index2].img}")`
  closeButton.className = "close-button"

  document.querySelector('body').prepend(section);
  section.append(content);
  content.append(divImg);
  content.append(divText);
  divText.append(divTextInner);
  content.append(closeButton);
}

// hover effect for button krestik

const hoverButton = (e) => {
  if (e.type === "mouseover") {
    document.querySelector('.close-button').style.background = '#FDDCC4'
  } else if (e.type === 'mouseout') {
    document.querySelector('.close-button').style.background = 'none'
  }
  
}

//click on burger menu on 320 px

const burgerMenuEnable = () => {
  burger.classList.add('rotate')
  burger.classList.remove('rotate-revers')
  header.classList.add('bg-black')
  navigation.classList.remove('to-right')
  navigation.classList.add('to-left');
  body.classList.add('not-scroll')
  menuOpen = true;
  const overlay = document.createElement('div')
  overlay.classList.add('overlay')
  document.querySelector('.pets-header').append(overlay)
  document.querySelector('.logo_title').classList.remove('pet-header-logo-title_color__black')
  document.querySelector('.logo_subtitle').classList.remove('pet-header-logo-subtitle_color__black');
  document.querySelectorAll('.burger-line').forEach(item => item.classList.remove('black_bottom'))
  document.querySelectorAll('.links').forEach((item, i) => {
    if ( i < 2){
      item.classList.add('main-page-link')
      item.classList.remove('pets-link-color_dark')
    }
  })

}

const burgerMenuDisable = () => {
  burger.classList.add('rotate-revers')
  burger.classList.remove('rotate')
  header.classList.remove('bg-black')
  navigation.classList.add('to-right')
  navigation.classList.remove('to-left')
  body.classList.remove('not-scroll')
  menuOpen = false
  document.querySelector('.overlay').remove()
  document.querySelector('.logo_title').classList.add('pet-header-logo-title_color__black')
  document.querySelector('.logo_subtitle').classList.add('pet-header-logo-subtitle_color__black')
  document.querySelectorAll('.burger-line').forEach(item => item.classList.add('black_bottom'))
  document.querySelectorAll('.links').forEach((item, i) => {
    if ( i < 2 ){
      item.classList.remove('main-page-link')
      item.classList.add('pets-link-color_dark')
    }
  })

}

// listeners

document.addEventListener('click', handleEvent)
document.addEventListener('mouseover', eventHandlerMousover);
document.addEventListener('mouseout', eventHandlerMousout)

// RUN

inactivClass2()
countOfPets = mainWindWidth()
getMainPets(countOfPets)
