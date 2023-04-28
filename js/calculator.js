let firstNumber = "";
let operator = "";
let secondNumber = "";
let result = "";

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Don't Divide By Zero >:(";
  }
  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return "Error: invalid operator";
  }
}

function clear() {
  firstNumber = "";
  operator = "";
  secondNumber = "";
  result = "";
  updateDisplay("");
}

function updateDisplay(value) {
  const display = document.querySelector("#input");
  display.value = value;
}

function numberClickHandler(e) {
  const number = e.target.textContent;
  if (result !== "") {
    clear();
  }
  if (operator === "") {
    firstNumber += number;
    updateDisplay(firstNumber);
  } else {
    secondNumber += number;
    updateDisplay(secondNumber);
  }
}

function operatorClickHandler(e) {
  const newOperator = e.target.textContent;
  if (firstNumber === "") {
    return;
  }
  if (operator !== "" && secondNumber !== "") {
    const currentValue = operate(
      operator,
      parseFloat(firstNumber),
      parseFloat(secondNumber)
    );
    firstNumber = currentValue.toString();
    secondNumber = "";
    operator = newOperator;
    updateDisplay(firstNumber);
  } else {
    operator = newOperator;
  }
}

function equalsClickHandler() {
  if (operator === "" || secondNumber === "") {
    return;
  }
  result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
  updateDisplay(result);
}

const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach((button) => {
  button.addEventListener("click", numberClickHandler);
});

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((button) => {
  button.addEventListener("click", operatorClickHandler);
});

const equalsButton = document.querySelector("#equals");
equalsButton.addEventListener("click", equalsClickHandler);

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", clear);
