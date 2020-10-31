const Keyboard = {
  elements: {
    main: null,
    kesContainer: null,
    keys: []
  },

  shiftKeys: {
    en: [
      "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "backspace",
      "~", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "|",
     "caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "\"", "enter",
     "SHIFT", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "SHIFT",
      "done", "space", "en", "left", "right"
    ],
    ру: [
      "!", "\"", "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "backspace",
      "[", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "/",
     "caps", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "enter",
     "SHIFT", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ".", "SHIFT",
      "done", "space", "РУ", "left", "right"
    ]
  },

  unShiftKeys: {
    en: [
      "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
      "`", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "\\",
     "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
     "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "shift",
      "done", "space", "en", "left", "right"
   ],
   ру: [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
    "]", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "\\",
   "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
   "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "shift",
    "done", "space", "ру", "left", "right"
  ]
  },

  eventHandlers: {
    oninput: null,
    onclose: null
  },

  properties: {
    value: '',
    capsLock: false,
    shift: false,
    lang: 'en',
  },

  DOMElement: {
    textArea: document.querySelector(".use-keyboard-input"),
  },


  init() {
    // Create main element
    this.elements.main = document.createElement('div');
    this.elements.keyContainer = document.createElement('div')

    // setup main element
    this.elements.main.classList.add("keyboard", "keyboard-hidden");
    this.elements.keyContainer.classList.add("keyboard__keys");
    this.elements.keyContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keyContainer.querySelectorAll(".keyboard__key");

    // add DOM
    this.elements.main.appendChild(this.elements.keyContainer);
    document.body.appendChild(this.elements.main);

    // automatically use keyboard for textarea
    document.querySelectorAll(".use-keyboard-input").forEach(element => {
      element.addEventListener('focus', () => {
        this.open(element.value, currentValue => {
          element.value = currentValue
        })
      })
    })

  },

  _createKeys() {
    const fragment = document.createDocumentFragment()
    const keyLayout = [
       "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
       "`", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "\\",
      "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
      "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "Shift",
       "done", "space", "en", "left", "right"
    ]
    

    // create HTML for an icons
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`
    }

    keyLayout.forEach((key, index) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ["Backspace", "\\", "enter"].indexOf(key) !== -1;

      // add attribute/classes  
      keyElement.setAttribute("type", "button")
      keyElement.classList.add("keyboard__key", "hover");

      switch (key) {
        case "Backspace":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("backspace");
          keyElement.setAttribute('data-key', key)

          keyElement.addEventListener("click", (e) => {

            //keyElement.classList.remove('hover')
            //keyElement.classList.remove('inactive')
            keyElement.classList.add('active')
            
            let start = this.properties.value.substr(0, this.DOMElement.textArea.selectionStart);
            let end = this.properties.value.substr(this.DOMElement.textArea.selectionEnd);
            if (this.DOMElement.textArea.selectionEnd > this.DOMElement.textArea.selectionStart) {
              this.properties.value = this.properties.value.substring(0, this.DOMElement.textArea.selectionStart) + end;
              let currentPosition = this.DOMElement.textArea.selectionStart;
              this._triggerEvents('oninput')
              this.DOMElement.textArea.selectionEnd = currentPosition;
             } else {
              this.properties.value = this.properties.value.substring(0, this.DOMElement.textArea.selectionStart - 1) + end;
              let currentPosition = this.DOMElement.textArea.selectionStart;
              this._triggerEvents('oninput')
              this.DOMElement.textArea.selectionEnd = currentPosition - 1;
             }
            this.DOMElement.textArea.focus()
            if(this.properties.shift) {
              this._toggleShift()
            }
            keyElement.addEventListener('animationend', () =>{
              keyElement.classList.remove('active')
            })
          })

          break;

        case "CapsLock":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.setAttribute('data-key', key)
          keyElement.innerHTML = createIconHTML("keyboard_capslock");
          
          keyElement.addEventListener("click", () => {
            keyElement.classList.add('active')
            this._toggleCapsLock()
            keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock)
            this.DOMElement.textArea.focus()
            
            keyElement.addEventListener('animationend', () =>{
              keyElement.classList.remove('active')
            })
          })
          break; 
        
        case "Shift":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerText = key
          keyElement.setAttribute('data-key', key)

          keyElement.addEventListener("click", () => {
            keyElement.classList.add('active')
            this._toggleShift()
            this.DOMElement.textArea.focus()
            keyElement.addEventListener('animationend', () =>{
              keyElement.classList.remove('active')
            })
          })
          break; 
        
        case "enter":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_return");
          
          keyElement.addEventListener("click", () => {
            keyElement.classList.add('active')
            let start = this.properties.value.substr(0, this.DOMElement.textArea.selectionStart);
            let end = this.properties.value.substr(this.DOMElement.textArea.selectionEnd);

            this.properties.value = start + '\n' + end;
            let currentPosition = this.DOMElement.textArea.selectionStart;
            this._triggerEvents('oninput')
            this.DOMElement.textArea.selectionEnd = currentPosition + 1
            this.DOMElement.textArea.focus();
            if(this.properties.shift) {
              this._toggleShift()
            }
            keyElement.addEventListener('animationend', () =>{
              keyElement.classList.remove('active')
            })
          })
          break;   

        case "space":
          
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createIconHTML("space_bar");
          // check current position after arrow button
          
          keyElement.addEventListener("click", () => {
            keyElement.classList.add('active')
            
            let start = this.properties.value.substr(0, this.DOMElement.textArea.selectionStart);
            let end = this.properties.value.substr(this.DOMElement.textArea.selectionEnd);
            
            this.properties.value = start + ' ' + end;
            let currentPosition = this.DOMElement.textArea.selectionStart;
            this._triggerEvents('oninput')
            this.DOMElement.textArea.selectionEnd = currentPosition + 1
            this.DOMElement.textArea.focus()
            if(this.properties.shift) {
              this._toggleShift()
            }

            keyElement.addEventListener('animationend', () =>{
              keyElement.classList.remove('active')
            })
          })
          break;  
          
        case "en" || "ру":
          keyElement.textContent = "en"
          keyElement.addEventListener("click", () => {
              keyElement.classList.add('active')
            
            this._toggleLang();
            this.DOMElement.textArea.focus()

            keyElement.addEventListener('animationend', () =>{
              keyElement.classList.remove('active')
            })
          })
          break;  
        
        case "left":
          keyElement.innerHTML = createIconHTML("keyboard_arrow_left");
            
          keyElement.addEventListener("click", () => {
              keyElement.classList.add('active')
            this.DOMElement.textArea.selectionEnd --;
            this.DOMElement.textArea.focus()

            keyElement.addEventListener('animationend', () =>{
              keyElement.classList.remove('active')
            })
          })
        break; 
        
        case "right":
          keyElement.innerHTML = createIconHTML("keyboard_arrow_right");
            
          keyElement.addEventListener("click", () => {
            keyElement.classList.add('active')

            this.DOMElement.textArea.selectionStart ++;
            this.DOMElement.textArea.focus()
            
            keyElement.addEventListener('animationend', () =>{
              keyElement.classList.remove('active')
            })
          })
        break; 

        case "done":
          keyElement.innerHTML = createIconHTML("keyboard-hide");
            
          keyElement.addEventListener("click", () => {
              keyElement.classList.add('active')
            this.close()
            this._triggerEvents('onclose')
            keyElement.addEventListener('animationend', () =>{
              keyElement.classList.remove('active')
            })
        })
        break;   
          
        default:
          keyElement.textContent = key.toLowerCase();

          let currentPosition = 0
          

          keyElement.addEventListener('click', () => {
            
            keyElement.classList.add('active')
            // check current position after arrow button
            let start = this.properties.value.substr(0, this.DOMElement.textArea.selectionStart);
            let end = this.properties.value.substr(this.DOMElement.textArea.selectionEnd);
            // check for keypress shift and capsLock keys
            if(this.properties.shift && this.properties.capsLock){
              this.properties.value = 
                start + this.shiftKeys[this.properties.lang][index].toLowerCase() + end;
              currentPosition = this.DOMElement.textArea.selectionStart;
            } 
            else if(this.properties.capsLock && !this.properties.shift) {
              this.properties.value = 
                start + this.unShiftKeys[this.properties.lang][index].toUpperCase() + end;
              currentPosition = this.DOMElement.textArea.selectionStart;
            } 
            else if (this.properties.shift) {
              this.properties.value = 
                start + this.shiftKeys[this.properties.lang][index] + end;
              currentPosition = this.DOMElement.textArea.selectionStart;
            } 
            else {
              this.properties.value = 
                start + this.unShiftKeys[this.properties.lang][index] + end;
              currentPosition = this.DOMElement.textArea.selectionStart;
            }
           
            this._triggerEvents('oninput')
            
            this.DOMElement.textArea.selectionEnd = currentPosition + 1
            
            this.DOMElement.textArea.focus()
            
            if(this.properties.shift) {
              this._toggleShift()
            }
            keyElement.addEventListener('animationend', () =>{
              keyElement.classList.remove('active')
            })
          })
          break;
      }

      if (!["done"].indexOf(key)) {
        fragment.appendChild(document.createElement('br'))
      } 
      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'))
      }
    })

    return fragment
  },

  _triggerEvents(handlerName) {
    if (typeof this.eventHandlers[handlerName] === 'function') {
      this.eventHandlers[handlerName](this.properties.value)
    }
  },

  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock

    for (const key of this.elements.keys) {
    
      if (key.childElementCount === 0 ) {
        key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase()
      }
    }

  },

  _toggleShift() {
    this.properties.shift = !this.properties.shift
    if ( this.properties.shift ) {
      for (let i = 0; i < this.elements.keys.length; i++) {
        if (this.elements.keys[i].childElementCount === 0) {
          this.elements.keys[i].textContent = this.properties.capsLock ? 
            this.shiftKeys[this.properties.lang][i].toLowerCase() : 
            this.shiftKeys[this.properties.lang][i]
        }
      }
    } else {
      for (let i = 0; i < this.elements.keys.length; i++) {
        if (this.elements.keys[i].childElementCount === 0) {
          this.elements.keys[i].textContent = this.properties.capsLock ? 
            this.unShiftKeys[this.properties.lang][i].toUpperCase() : 
            this.unShiftKeys[this.properties.lang][i]
        }
      }
    }
    
    
  },

  _toggleLang() {
    if (this.properties.lang === 'en') {
      this.properties.lang = 'ру'
    } else {
      this.properties.lang = 'en'
    }
    
      this.properties.shift = !this.properties.shift;
      this._toggleShift()
      
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard--hidden");
  },

  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add("keyboard--hidden");
  },

  keydown(e) {
    let start = this.properties.value.substr(0, this.DOMElement.textArea.selectionStart);
    let end = this.properties.value.substr(this.DOMElement.textArea.selectionEnd);
    
    console.log(e)

    e.preventDefault()

    // listen keydown press add add active class for button
    let singleBtn = document.querySelector(`[data-key=${e.code}]`)
    if (singleBtn) {
      singleBtn.classList.add('active');
      singleBtn.addEventListener('animationend', () =>{
        singleBtn.classList.remove('active')
      })
    } 
    let doubleBtn = document.querySelectorAll(`[data-key=${e.code}]`)
    


    if (e.code === 'Backspace' && e.type === "keydown") {
      if (this.DOMElement.textArea.selectionEnd > this.DOMElement.textArea.selectionStart) {
        this.properties.value = this.properties.value.substring(0, this.DOMElement.textArea.selectionStart) + end;
        let currentPosition = this.DOMElement.textArea.selectionStart;
        this._triggerEvents('oninput')
        this.DOMElement.textArea.selectionEnd = currentPosition;
      } else {
        this.properties.value = this.properties.value.substring(0, this.DOMElement.textArea.selectionStart - 1) + end;
        let currentPosition = this.DOMElement.textArea.selectionStart;
        this._triggerEvents('oninput')
        this.DOMElement.textArea.selectionEnd = currentPosition - 1;
      }
      this.DOMElement.textArea.focus()
      if(this.properties.shift) {
        this._toggleShift()
      }
      

    } else if(e.code === "CapsLock" && (e.type === "keydown" || e.type === "keyup")) {
      
      if (!this.properties.capsLock && e.type === "keydown") {
        this._toggleCapsLock()
        singleBtn.classList.toggle("keyboard__key--active", this.properties.capsLock)
        this.DOMElement.textArea.focus()
      } else if (!this.properties.capsLock && e.type === "keyup") {
        
      } else if (e.type === "keyup") {
        this._toggleCapsLock()
        singleBtn.classList.toggle("keyboard__key--active", this.properties.capsLock)
        this.DOMElement.textArea.focus()
      }

    } else if(e.key === "Shift" && e.type === 'keydown'){

      this._toggleShift()
      this.DOMElement.textArea.focus()
      if(e.code === 'ShiftLeft')
      doubleBtn[0].classList.add('active');
      doubleBtn[0].addEventListener('animationend', () =>{
        doubleBtn[0].classList.remove('active')
      })
      
    } else if(e.code === 'Enter' && e.type === 'keydown') {
      this.properties.value = start + '\n' + end;
      let currentPosition = this.DOMElement.textArea.selectionStart;
      this._triggerEvents('oninput')
      this.DOMElement.textArea.selectionEnd = currentPosition + 1
      this.DOMElement.textArea.focus();
      if(this.properties.shift) {
        this._toggleShift()
      }

    } else if(e.code === 'Space' && e.type === 'keydown') {
      this.properties.value = start + ' ' + end;
      let currentPosition = this.DOMElement.textArea.selectionStart;
      this._triggerEvents('oninput')
      this.DOMElement.textArea.selectionEnd = currentPosition + 1
      this.DOMElement.textArea.focus()
      if(this.properties.shift) {
        this._toggleShift()
      }

    } else if(e.code === 'ArrowLeft' && e.type === 'keydown') {
      this.DOMElement.textArea.selectionEnd --;
      this.DOMElement.textArea.focus()

    } else if(e.code === 'ArrowRight' && e.type === 'keydown') {
      this.DOMElement.textArea.selectionStart ++;
      this.DOMElement.textArea.focus()

    } else if(e.type === "keydown"){
      if (this.properties.shift && this.properties.capsLock){
        this.properties.value = 
          start + e.key.toLowerCase() + end;
        currentPosition = this.DOMElement.textArea.selectionStart;
      } 
      else if(this.properties.capsLock && !this.properties.shift) {
        this.properties.value = 
          start + e.key.toUpperCase() + end;
        currentPosition = this.DOMElement.textArea.selectionStart;
      } 
      else if (this.properties.shift) {
        this.properties.value = 
          start + e.key + end;
        currentPosition = this.DOMElement.textArea.selectionStart;
      } 
      else {
        this.properties.value = 
          start + e.key + end;
        currentPosition = this.DOMElement.textArea.selectionStart;
      }
     
      this._triggerEvents('oninput')
      
      this.DOMElement.textArea.selectionEnd = currentPosition + 1
      
      this.DOMElement.textArea.focus()
      
      if(this.properties.shift) {
        this._toggleShift()
      }
    } 

    

  }
  
}

window.addEventListener('DOMContentLoaded', function() {
  Keyboard.init();
})
document.addEventListener('keydown', (e) => {
  Keyboard.keydown(e);
})
document.addEventListener('keyup', (e) => {
  Keyboard.keydown(e);
})