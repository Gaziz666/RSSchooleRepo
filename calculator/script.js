class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement,
    this.currentOperandTextElement = currentOperandTextElement,
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    //add minus
    if (this.currentOperand === '') {
      if (operation === '-') {
        if (this.previousOperand === ''  || (this.previousOperand != '' && this.operation != '')) {
        this.currentOperand = '-'
        } 
      }
      
      return
      
    } else if (this.currentOperand === '-') return
    
    if (this.previousOperand != '') {
      this.compute()
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = ''
  }

  compute() {
    let result
    let prev = parseFloat(this.previousOperand)
    let current = parseFloat(this.currentOperand)
    let operation = this.operation
    if (isNaN(prev) || isNaN(current)) return
    switch (operation) {
      case '+': 
        result = prev + current
        break
      case '-': 
        result = prev - current
        break
      case '*': 
        result = prev * current
        break
      case '÷' || '/': 
        result = prev / current
        break
      case '/': 
        result = prev / current
        break
      default:
        return
    }
    this.currentOperand = parseFloat(result.toFixed(8))
    this.previousOperand = ''
    this.operation = undefined
  }

  computeSqr(button){
    let currentInt = parseFloat(this.currentOperand)
    if (button === 'pow2' && this.currentOperand != null) {
      this.currentOperand = parseFloat(Math.pow(currentInt, 2).toFixed(8))
    } else if (currentInt < 0) {
       alert(`коррень квадратный из отрицетального числа. Введите положительное число`)
        this.clear()
    } else if (button === 'sqrt' && this.currentOperand != null) {
      this.currentOperand = parseFloat(Math.sqrt(currentInt).toFixed(8))
    } else return
  }

  getDisplayNumber(number) {
    if (number === '-') {
      return number
    }
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      integerDisplay = `${integerDisplay}.${decimalDigits}`
    } 
    return integerDisplay
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = 
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
    
  }
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const ACButton = document.querySelector('[data-all-clear]');
const delButton = document.querySelector('[data-delete]');
const equalButton = document.querySelector('[data-equals]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const sqrButtons = document.querySelectorAll('[data-sqr]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalButton.addEventListener('click', () => {
  calculator.compute()
  calculator.updateDisplay()
})

ACButton.addEventListener('click', () => {
  calculator.clear()
  calculator.updateDisplay()
})

delButton.addEventListener('click', () => {
  calculator.delete()
  calculator.updateDisplay()
})

sqrButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.computeSqr(button.value)
    calculator.updateDisplay()
  })
})

//add listener for keyboard

document.addEventListener('keydown', (e) => {
  if (parseInt(e.key) >= 0) {
    calculator.appendNumber(e.key)
    calculator.updateDisplay()
  } else if(e.key === '+' ||
            e.key === '-' ||
            e.key === '*' ||
            e.key === '/') {
    calculator.chooseOperation(e.key)
    calculator.updateDisplay()          
  } else if (e.key === "Enter") {
    calculator.compute()
    calculator.updateDisplay()
  } else if (e.key === "Backspace") {
    calculator.delete()
    calculator.updateDisplay()
  }
  
})
