let firstNumber = '';
let secondNumber = '';
let currentOperator = null;
let shouldResetDisplay = false;

function add(x, y){
    return x + y;
}
function subtract(x, y){
    return x - y;
}
function multiply(x, y){
    return x * y;
}
function divide(x, y){
    if(y == 0){
        return "Error";
    }else{
    return x / y;
    }
}

function operate(operator, x, y){
    switch(operator){
        case "+":
            result = add(x, y);
            break;
        case "-":
            result = subtract(x, y);
            break;
        case "*":
            result = multiply(x, y);
            break;
        case "/":
            result =  divide(x, y);
            break;
        default:
        return "Invalid Operator";
    }
    return Math.round(result * 1000) / 1000;
}
let displayValue = 0;
const buttons = document.querySelectorAll("button");

function updateDisplay(){
    const display = document.querySelector(".display-h1");
    display.innerText = displayValue;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.innerText;

        if (isFinite(value) || value === '.') {
            handleNumber(value);
        } else if (value === 'C') {
            resetCalculator();
        } else if (value === 'Backspace') {
            handleBackspace();
        } else if (value === '=') {
            evaluate();
        } else {
            handleOperator(value);
        }
    });
});

function handleBackspace() {
    displayValue = displayValue.slice(0, -1);
    if (displayValue === '') displayValue = '0';
    updateDisplay();
}

function handleNumber(value) {
    if (shouldResetDisplay) {
        displayValue = value;
        shouldResetDisplay = false;
    } else {
        if (value === '.' && displayValue.includes('.')) return;
        displayValue = displayValue === '0' ? value : displayValue + value;
    }
    updateDisplay();
}

function handleOperator(operator) {
    if (currentOperator !== null) {
        evaluate();
    }
    firstNumber = displayValue;
    currentOperator = operator;
    shouldResetDisplay = true;
}

function evaluate() {
    if (currentOperator === null || shouldResetDisplay) return;
    if (currentOperator === '/' && displayValue === '0') {
        displayValue = "Error: Division by zero";
        updateDisplay();
        resetCalculator();
        return;
    }
    secondNumber = displayValue;
    displayValue = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber)).toString();
    updateDisplay();
    currentOperator = null;
}

document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (isFinite(key) || key === '.') {
        handleNumber(key);
    } else if (key === 'Backspace') {
        handleBackspace();
    } else if (key === 'Enter' || key === '=') {
        evaluate();
    } else if (key === 'Escape') {
        resetCalculator();
    } else if (['+', '-', '*', '/'].includes(key)) {
        handleOperator(key);
    }
});

function resetCalculator() {
    displayValue = '0';
    firstNumber = '';
    secondNumber = '';
    currentOperator = null;
    shouldResetDisplay = false;
    updateDisplay();
}
