class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement)
    {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentoperand = ''
        this.previousoperand = ''
        this.operation = undefined
    }
    delete() {
        this.currentoperand = this.currentoperand.toString().slice(0, -1)
    }
    appendNumber(number) {
        if(number === '.' && this.currentoperand.includes('.')) return
        this.currentoperand = this.currentoperand.toString() + number.toString()
    }
    chooseOperation(operation) {
        if(this.currentoperand === '') return 
        if(this.previousoperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousoperand = this.currentoperand
        this.currentoperand = ''
    }
    compute() {
        let computation 
        const prev = parseFloat(this.previousoperand)
        const current = parseFloat(this.currentoperand)
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
        case '+':
            computation = prev + current
            break
        case '-': 
            computation = prev - current
            break
        case '*': 
            computation = prev * current
            break
        case '/': 
            computation = prev / current
            break
        default:
            return
        }
        this.currentoperand = computation
        this.operation
        this.previousoperand = ''
    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)) {
            integerDisplay = ''
        }
        else{
            integerDisplay = integerDigits.toLocaleString('en', {
            maximumFractionDigits: 0 })
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }
        else {
            return integerDisplay
        }
    }


    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentoperand)
        if(this.operation != null) {
            this.previousOperandTextElement.innerText = 
                `${this.getDisplayNumber(this.previousoperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}


const numberButton = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')


const calculator = new Calculator(previousOperandTextElement,
    currentOperandTextElement) 


numberButton.forEach(button => {
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

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})