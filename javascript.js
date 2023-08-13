const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('.number');
const decimalButton = document.getElementById('btn-decimal');
const operatorButtons = document.querySelectorAll('.operator');
const equalButton = document.getElementById('btn-equal');
const clearButton = document.getElementById('btn-clear');
const percentButton = document.getElementById('btn-percent');
const toggleSignButton = document.getElementById('btn-sign');

let currentValue = '0';
let previousValue = null;
let operator = null;
let calculationResult = null;
let continuedCalculation = false;


function updateDisplay() {
  display.textContent = currentValue;
}


function clear() {
  previousValue = null;
  currentValue = '0';
  operator = null;
  updateDisplay();
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
  if (!continuedCalculation) {
    if (!previousValue) {
      previousValue = currentValue;
    } else if (previousValue) {
      currentValue = performCalculation(operator);
      updateDisplay();
      previousValue = currentValue;
    }
    operator = input;
    currentValue = '0';
  } else if (continuedCalculation && !operator) {
    previousValue = calculationResult;
    operator = input;
  } else if (continuedCalculation && operator) {
    currentValue = performCalculation(operator);
    updateDisplay();
    previousValue = currentValue;
    operator = input;
    currentValue = '0';
  }
}


function handleNumberClick(button) {
  if (operator === null) {
    continuedCalculation = false;
  }

  if (currentValue === '0' && button !== '.') {
    currentValue = button;
  } else if (button === '.' && currentValue.includes('.')) {
    return;
  } else {
    currentValue += button;
  }
  updateDisplay();
}


function handleEqualClick() {
  console.log(`BEFORE:`);  
  console.log(`currentValue ${currentValue}`);
  console.log(`previousValue ${previousValue}`);
  console.log(`operator ${operator}`);
  console.log(`calculationResult ${calculationResult}`);
  console.log(`continuedCalculation ${continuedCalculation}`);
  console.log(``);  
  if (currentValue && previousValue) {
      currentValue = performCalculation(operator);
      calculationResult = currentValue;
      continuedCalculation = true;
      updateDisplay();
      currentValue = '0';
      operator = null;
      previousValue = null;
    // Delete this else if section if can't get to work
  } else if (currentValue === 0 && previousValue) {
    currentValue = previousValue;
    performCalculation(operator);
    continuedCalculation === true;
    updateDisplay(); 
  } else {
    return;
  }
  console.log(`AFTER:`);  
  console.log(`currentValue ${currentValue}`);
  console.log(`previousValue ${previousValue}`);
  console.log(`operator ${operator}`);
  console.log(`calculationResult ${calculationResult}`);
  console.log(`continuedCalculation ${continuedCalculation}`);
  console.log(``);  
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
