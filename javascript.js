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
let lastOperator = null;
let lastOperand = null;
let calculationResult = null;
let continuedCalculation = false;




function updateDisplay() {
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
  previousValue = null;
  currentValue = null;
  operator = null;
  lastOperator = null;
  calculationResult = null;
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
  if (!continuedCalculation) {
    if (!previousValue) {
      previousValue = currentValue;
      lastOperand = currentValue;
    } else if (previousValue) {
      lastOperand = currentValue;
      currentValue = performCalculation(operator);
      updateDisplay();
      previousValue = currentValue;
    }
    operator = input;
    lastOperator = operator;
    lastOperand = currentValue;
    currentValue = null;
  } else if (continuedCalculation && !operator) {
    previousValue = calculationResult;
    operator = input;
    lastOperator = operator;
    lastOperand = currentValue;
  } else if (continuedCalculation && operator) {
    currentValue = performCalculation(operator);
    updateDisplay();
    previousValue = currentValue;
    operator = input;
    lastOperator = operator;
    currentValue = null;
    lastOperand = currentValue;
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
  if (operator === null) {
    continuedCalculation = false;
  }

  let currentDigits = countDigits(currentValue);
  
  if (currentValue === null && button !== '.') {
    currentValue = button;
    lastOperand = currentValue;
  } else if (button === '.' && currentValue.includes('.')) {
    return;
  } else if (currentDigits >= 20) {
    return;
  } else {
    currentValue += button;
    lastOperand = currentValue;
    console.log(typeof(currentValue));
    console.log(currentValue);
    console.log(currentValue.length);
  }
  updateDisplay();
}


function handleEqualClick() {
  // console.log(``);  
  // console.log(`BEFORE:`);  
  // console.log(`currentValue ${currentValue}`);
  // console.log(`previousValue ${previousValue}`);
  // console.log(`operator ${operator}`);
  // console.log(`lastOperator ${lastOperator}`);
  // console.log(`lastOperand ${lastOperand}`);
  // console.log(`calculationResult ${calculationResult}`);
  // console.log(`continuedCalculation ${continuedCalculation}`);
  // console.log(``);  
  if (currentValue && previousValue && !continuedCalculation) {
    console.log(`equal 1st condition`)
    result = performCalculation(operator);
    currentValue = roundAccurately(result,8).toString();
    calculationResult = currentValue;
    continuedCalculation = true;
    updateDisplay();
    currentValue = null;
    lastOperator = operator;
    operator = null; 
    previousValue = null; 
  
  } else if (currentValue && previousValue && continuedCalculation && lastOperand) {
    console.log(`equal 2-A condition`)
    currentValue = lastOperand;
    previousValue = calculationResult;
    result = performCalculation(operator);
    currentValue = roundAccurately(result,8).toString();
    calculationResult = currentValue;
    continuedCalculation = true;
    updateDisplay();
    currentValue = null;
    lastOperator = operator;
    operator = null; 
    previousValue = null; 

  } else if (currentValue && previousValue && continuedCalculation && !lastOperand) {
    console.log(`equal 2-B condition`)
    previousValue = calculationResult;
    result = performCalculation(operator);
    currentValue = roundAccurately(result,8).toString();
    calculationResult = currentValue;
    continuedCalculation = true;
    updateDisplay();
    currentValue = lastOperand;
    lastOperator = operator;
    lastOperand = currentValue;
    operator = null; 
    previousValue = null; 

    // This works once
  } else if (currentValue === null && previousValue) {
    console.log(`equal 3rd condition`)
    currentValue = previousValue;
    result = performCalculation(operator);
    currentValue = roundAccurately(result,8).toString();
    calculationResult = currentValue;
    lastOperator = operator;
    lastOperand = previousValue;
    continuedCalculation === true;
    updateDisplay(); 

    // Delete this if issues
  } else if (continuedCalculation && lastOperator) {
    console.log(`equal 4th condition`)
    operator = lastOperator;
    previousValue = calculationResult;
    currentValue = lastOperand;
    result = performCalculation(operator);
    currentValue = roundAccurately(result, 8).toString();
    calculationResult = currentValue;
    lastOperator = operator;
    continuedCalculation === true;
    updateDisplay(); 

  } else {
    console.log(`equal 3rd condition`)
    return;
  }
  // console.log(``);  
  // console.log(`AFTER:`);  
  // console.log(`currentValue ${currentValue}`);
  // console.log(`previousValue ${previousValue}`);
  // console.log(`operator ${operator}`);
  // console.log(`lastOperator ${lastOperator}`);
  // console.log(`lastOperand ${lastOperand}`);
  // console.log(`calculationResult ${calculationResult}`);
  // console.log(`continuedCalculation ${continuedCalculation}`);
  // console.log(``);  
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
