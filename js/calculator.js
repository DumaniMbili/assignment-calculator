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
    return "Can't Divide By Zero >:(";
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
    if (firstNumber.includes(".") && number === ".") {
      return; // Do not allow multiple decimal points in the first number
    }
    firstNumber += number;
    updateDisplay(firstNumber);
  } else {
    if (secondNumber.includes(".") && number === ".") {
      return; // Do not allow multiple decimal points in the second number
    }
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

const decimalButton = document.querySelector("#decimal");
decimalButton.addEventListener("click", decimalClickHandler);

function decimalClickHandler() {
  const decimal = ".";
  if (result !== "") {
    clear();
  }
  if (operator === "") {
    if (!firstNumber.includes(decimal)) {
      firstNumber += decimal;
      updateDisplay(firstNumber);
    }
  } else {
    if (!secondNumber.includes(decimal)) {
      secondNumber += decimal;
      updateDisplay(secondNumber);
    }
  }
  if (firstNumber.includes(decimal) || secondNumber.includes(decimal)) {
    decimalButton.disabled = true;
  }
}

/*const decimalButton = document.querySelector("#decimal");
decimalButton.addEventListener("click", decimalClickHandler);

function decimalClickHandler() {
  const decimal = ".";
  if (result !== "") {
    clear();
  }
  if (operator === "") {
    if (!firstNumber.includes(decimal)) {
      firstNumber += decimal;
      updateDisplay(firstNumber);
    }
  } else {
    if (!secondNumber.includes(decimal)) {
      secondNumber += decimal;
      updateDisplay(secondNumber);
    }
  }
  if (firstNumber.includes(decimal) || secondNumber.includes(decimal)) {
    decimalButton.disabled = true;
  }
}*/

const backspaceButton = document.querySelector("#backspace");
backspaceButton.addEventListener("click", backspaceClickHandler);

function backspaceClickHandler() {
  if (result !== "") {
    clear();
    return;
  }
  if (operator === "") {
    firstNumber = firstNumber.slice(0, -1);
    updateDisplay(firstNumber);
  } else {
    secondNumber = secondNumber.slice(0, -1);
    updateDisplay(secondNumber);
  }
}


window.addEventListener("keydown", (e) => {
  const key = e.key;
  if (key >= "0" && key <= "9") {
    const number = key;
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
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    const button = document.querySelector(`button[data-operator="${key}"]`);
    if (button) {
      button.click();
    }
  } else if (key === "=" || key === "Enter") {
    equalsClickHandler();
  } else if (key === ".") {
    const button = document.querySelector("#decimal");
    if (button && !button.disabled) {
      button.click();
    }
  } else if (key === "Backspace") {
    backspaceClickHandler();
  }
});

