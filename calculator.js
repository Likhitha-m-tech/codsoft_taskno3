// calculator.js

// Select the display screen
const calculatorScreen = document.querySelector('.calculator-screen');

// Variables to keep track of the calculation
let currentNumber = '';
let previousNumber = '';
let operator = '';

// Event listener for all calculator buttons
const calculatorKeys = document.querySelector('.calculator-keys');
calculatorKeys.addEventListener('click', event => {
    const target = event.target;

    // Ensure the clicked element is a button
    if (!target.matches('button')) return;

    const action = target.classList.contains('btn-number') || target.classList.contains('btn-operator') ? null : target.className;
    const value = target.value;

    if (target.classList.contains('btn-number')) {
        appendNumber(value);
    } else if (target.classList.contains('btn-operator')) {
        setOperator(value);
    } else {
        switch (action) {
            case 'btn-clear':
                clearScreen();
                break;
            case 'btn-square':
                squareNumber();
                break;
            case 'btn-modulo':
                setOperator('%');
                break;
            case 'btn-equals':
                calculate();
                break;
            default:
                break;
        }
    }
});

// Function to clear the calculator screen
function clearScreen() {
    currentNumber = '';
    previousNumber = '';
    operator = '';
    calculatorScreen.value = '0';
}

// Function to append a number or decimal to the current number
function appendNumber(number) {
    if (number === '.' && currentNumber.includes('.')) return;
    if (currentNumber === '0' && number === '0') return; // Prevent multiple leading zeros
    if (currentNumber === '0' && number !== '.') {
        currentNumber = number; // Replace leading zero
    } else {
        currentNumber += number;
    }
    calculatorScreen.value = currentNumber;
}

// Function to set the operator
function setOperator(op) {
    if (currentNumber === '') return;
    if (previousNumber !== '') {
        calculate();
    }
    operator = op;
    previousNumber = currentNumber;
    currentNumber = '';
}

// Function to calculate the square of the current number
function squareNumber() {
    if (currentNumber === '') return;
    currentNumber = (parseFloat(currentNumber) ** 2).toString();
    calculatorScreen.value = currentNumber;
}

// Function to perform the calculation
function calculate() {
    if (currentNumber === '' || previousNumber === '') return;
    let result = 0;
    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("Cannot divide by zero");
                clearScreen();
                return;
            }
            result = prev / current;
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }

    // Handle decimal precision
    result = parseFloat(result.toFixed(10));

    calculatorScreen.value = result;
    currentNumber = result.toString();
    previousNumber = '';
    operator = '';
}
