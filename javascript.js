// javascript.js

// These functions perform the calculations
function add(firstOperand, secondOperand) {
  return firstOperand + secondOperand;
}


function subtract(firstOperand, secondOperand) {
  return firstOperand - secondOperand;
}


function multiply(firstOperand, secondOperand) {
  return firstOperand * secondOperand;
}


function divide(firstOperand, secondOperand) {
  return firstOperand / secondOperand;
}


// Variables to store inputs and calculations
let firstOperand = 0; // maybe make these 'Null'
let secondOperand = null;
let tempOperand = null;
let operator = '';
let total = null;
let displayValue = [];


// Executes when '=' key is pressed
function operate(operator, firstOperand, secondOperand) {
  // Perform the calculation based on the operator
  if (operator === '+') {
    total = add(firstOperand, secondOperand);
  } else if (operator === '-') {
    total = subtract(firstOperand, secondOperand);
  } else if (operator === '*') {
    total = multiply(firstOperand, secondOperand);
  } else if (operator === '/') {
    total = divide(firstOperand, secondOperand);
  }

  return total;
}


const operands = document.querySelectorAll('.operand');
const operators = document.querySelectorAll('.operator');
const display = document.getElementById('display');
operands.forEach((operand) => {
  operand.addEventListener('click', function (event) {
    if (displayValue.length === 0 || display.textContent === '0') {
      display.textContent = event.target.value;
      displayValue = parseFloat(display.textContent);
    } else {
      display.textContent += event.target.value;
      displayValue = parseFloat(display.textContent);
    } 
  });
});

operators.forEach((op) => {
  op.addEventListener('click', function (event) {
    // Store the firstNumber when user clicks an operator
    firstOperand = displayValue;

    // Save which operator was chosen
    operator = event.target.value;

    // Reset displayValue variable
    displayValue = [];
  });
});

const clearButton = document.getElementById('btn-clear');
// Wipes out all data and starts fresh
clearButton.addEventListener('click', function () {
  // Reset all variables
  display.textContent = '0';
  firstOperand = 0;
  secondOperand = null;
  operator = '';
  displayValue = [];
});

const equalButton = document.getElementById('btn-equal');
equalButton.addEventListener('click', function () {

  // Store the secondNumber when user clicks equal button
  secondOperand = displayValue;

  if (operator === '/' && secondOperand === 0) {
    display.textContent = 'Not a number'  
  } else {
    // Operate on the numbers
    total = operate(operator, firstOperand, secondOperand);
  
    // Store total into firstOperand
    firstOperand = total;
  
    // Display the total
    display.textContent = total;    
  }

    // Store the temp value and reset the displayValue and total
    displayValue = [];
    tempOperand = total;
    total = 0; 
});

const decimal = document.getElementById('btn-decimal');
