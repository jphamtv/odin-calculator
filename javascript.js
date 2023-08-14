const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('.number');
const decimalButton = document.getElementById('btn-decimal');
const operatorButtons = document.querySelectorAll('.operator');
const equalButton = document.getElementById('btn-equal');
const clearButton = document.getElementById('btn-clear');
const percentButton = document.getElementById('btn-percent');
const toggleSignButton = document.getElementById('btn-sign');

let currentValue = null;
let previousValue = null;
let operator = null;
let continueCalculationOperator = null;
let continueCalculationOperand = null;
let continueCalculationResult = null;
let continueCalculation = false;


function updateDisplay() {
  // Update font size to fit display 
  if (currentValue.length <= 9) {
    display.style.fontSize = '42px';
  } else if (currentValue.length < 11) {
    display.style.fontSize = '36px';
  } else if (currentValue.length < 13) {
    display.style.fontSize = '30px';
  } else if (currentValue.length < 16) {
    display.style.fontSize = '24px';
  } else if (currentValue.length <= 20) {
    display.style.fontSize = '18px';
  }

  display.textContent = currentValue;
}


function roundAccurately(num, places) {
  return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}


function clear() {
  // Reset all data and start fresh
  previousValue = null;
  currentValue = null;
  operator = null;
  continueCalculationOperator = null;
  continueCalculationResult = null;
  display.style.fontSize = '42px';
  display.textContent = '0';
}


function toggleSign() {
  currentValue = String(Number(currentValue) * -1);
  updateDisplay();
}


function convertToPercent() {
  currentValue = String(Number(currentValue) / 100);
  updateDisplay();
}


function handleOperatorClick(input) {
  if (!continueCalculation) {

    if (!previousValue) {
      previousValue = currentValue;
      continueCalculationOperand = currentValue;
    } else if (previousValue) {
      continueCalculationOperand = currentValue;
      currentValue = performCalculation(operator);
      updateDisplay();
      previousValue = currentValue;
    }

    operator = input;
    continueCalculationOperator = operator;
    continueCalculationOperand = currentValue;
    currentValue = null;

  } else if (continueCalculation && !operator) {
    previousValue = continueCalculationResult;
    operator = input;
    continueCalculationOperator = operator;
    continueCalculationOperand = currentValue;

  } else if (continueCalculation && operator) {
    currentValue = performCalculation(operator);
    updateDisplay();
    previousValue = currentValue;
    operator = input;
    continueCalculationOperator = operator;
    currentValue = null;
    continueCalculationOperand = currentValue;
  }
}


function countDigits(str) {
  if (str === null) {
    return 0;

  } else {
    let digits = str.match(/\d/g);
    return digits.length;
  }
}


function handleNumberClick(button) {
  let currentDigits = countDigits(currentValue);

  // Reset if number clicked after equal sign
  if (operator === null) {
    continueCalculation = false;
  }


  if (currentValue === null && button !== '.') {
    currentValue = button;
    continueCalculationOperand = currentValue;

  } else if (button === '.' && currentValue.includes('.')) {
    return;

  } else if (currentDigits >= 20) {
    return;

  } else {
    currentValue += button;
    continueCalculationOperand = currentValue;
  }

  updateDisplay();
}


function handleEqualClick() {

  // Super complex if else statements to handle continuing calculations
  if (currentValue && previousValue && !continueCalculation) {
    result = performCalculation(operator);
    currentValue = roundAccurately(result, 8).toString();
    continueCalculationResult = currentValue;
    continueCalculation = true;
    updateDisplay();
    currentValue = null;
    continueCalculationOperator = operator;
    operator = null;
    previousValue = null;

  } else if (
              currentValue 
              && previousValue 
              && continueCalculation 
              && continueCalculationOperand
    ) {
    currentValue = continueCalculationOperand;
    previousValue = continueCalculationResult;
    result = performCalculation(operator);
    currentValue = roundAccurately(result, 8).toString();
    continueCalculationResult = currentValue;
    continueCalculation = true;
    updateDisplay();
    currentValue = null;
    continueCalculationOperator = operator;
    operator = null;
    previousValue = null;

  } else if (
              currentValue 
              && previousValue 
              && continueCalculation 
              && !continueCalculationOperand
    ) {
    previousValue = continueCalculationResult;
    result = performCalculation(operator);
    currentValue = roundAccurately(result, 8).toString();
    continueCalculationResult = currentValue;
    continueCalculation = true;
    updateDisplay();
    currentValue = continueCalculationOperand;
    continueCalculationOperator = operator;
    continueCalculationOperand = currentValue;
    operator = null;
    previousValue = null;

  } else if (currentValue === null && previousValue) {
    currentValue = previousValue;
    result = performCalculation(operator);
    currentValue = roundAccurately(result, 8).toString();
    continueCalculationResult = currentValue;
    continueCalculationOperator = operator;
    continueCalculationOperand = previousValue;
    continueCalculation === true;
    updateDisplay();

  } else if (continueCalculation && continueCalculationOperator) {
    operator = continueCalculationOperator;
    previousValue = continueCalculationResult;
    currentValue = continueCalculationOperand;
    result = performCalculation(operator);
    currentValue = roundAccurately(result, 8).toString();
    continueCalculationResult = currentValue;
    continueCalculationOperator = operator;
    continueCalculation === true;
    updateDisplay();

    // Disable equal button
  } else {
    return;
  }
}


function performCalculation(operator) {
  switch (operator) {
    case '+':
      return String(Number(previousValue) + Number(currentValue));
    case '-':
      return String(Number(previousValue) - Number(currentValue));
    case '*':
      return String(Number(previousValue) * Number(currentValue));
    case '/':
      if (Number(currentValue) === 0) {
        return 'Not a number';
      } else {
        return String(Number(previousValue) / Number(currentValue));
      }
    default:
      return;
  }
}


numberButtons.forEach(button => {
  button.addEventListener('click', function (event) {
    handleNumberClick(event.target.value);
  });
});


operatorButtons.forEach(button => {
  button.addEventListener('click', function (event) {
    handleOperatorClick(event.target.value);
  });
});

clearButton.addEventListener('click', clear);
toggleSignButton.addEventListener('click', toggleSign);
percentButton.addEventListener('click', convertToPercent);
equalButton.addEventListener('click', handleEqualClick);