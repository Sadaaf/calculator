// Calculator display highest digits 19
let previousInput = null;
let currentInput = null;
let newOperation = null;
let currentOperation = null;
let decimalUsed = false;

const display = document.querySelector(".display");

/////////////
// Buttons //
/////////////
const clear = document.querySelector(".clear");
const positiveNegativeToggler = document.querySelector(
  ".positive-negative-toggler"
);
const arithmeticOps = document.querySelectorAll(".arithmeticOp");
const equals = document.querySelector(".equals");
const decimal = document.querySelector(".decimal");

///////////////////
// functionality //
///////////////////
clear.addEventListener("click", handleClear);
positiveNegativeToggler.addEventListener("click", togglePositiveNegative);
equals.addEventListener("click", handleEqualsOperation);
decimal.addEventListener("click", handleDecimal);

arithmeticOps.forEach((a) =>
  a.addEventListener("click", handleArithmeticOperation)
);

// Adding functionality to each number
for (let i = 0; i <= 9; i++) {
  const numberButton = document.querySelector(`.calc-button${i}`);
  numberButton.setAttribute("value", i);
  numberButton.addEventListener("click", handleNumberPress);
}

////////////////////
//handlerFunctions//
////////////////////
function togglePositiveNegative() {
  updateDisplay(currentInput ? (currentInput *= -1) : (previousInput *= -1));
}

function handleClear() {
  setCurrentInput(null);
  setPreviousInput(null);
  decimalUsed = false;
  decimal.disabled = false;
  updateDisplay(0);
}

function handleEqualsOperation(e) {
  // TODO: Bug after equal once direct number entry causes error
  e.target.value = null;
  handleArithmeticOperation(e);
}

function handleDecimal() {
  decimalUsed = true;
  decimal.disabled = true;
  updateDisplay(currentInput + ".");
  setCurrentInput(currentInput.toFixed(1));
}

function handleNumberPress(event) {
  const number = getValueFromEvent(event);
  if (!currentInput) {
    setCurrentInput(number);
  } else {
    if (!decimalUsed) {
      setCurrentInput(parseFloat(`${currentInput}${number}`));
    } else {
      let inputAsString = currentInput.toString();
      let afterDecimal = inputAsString.split(".")[1];
      if (afterDecimal.length === 1 && afterDecimal === "0")
        inputAsString = inputAsString.slice(
          0,
          currentInput.toString().length - 1
        );
      setCurrentInput(parseFloat(`${inputAsString}${number}`));
    }
  }
  updateDisplay();
}

function handleArithmeticOperation(event) {
  // FIXME: Fractional arithmetics are not precise
  let nextOperation = event.target.value;
  let result;
  if (!previousInput) {
    result = currentInput;
  } else {
    result = !currentInput
      ? (result = previousInput)
      : handleCalculation(previousInput, currentOperation, currentInput);
  }
  currentOperation = nextOperation;
  nextOperation = null;
  setPreviousInput(result);
  setCurrentInput(null);
  updateDisplay(result ? result : 0);
  decimalUsed = false;
  decimal.disabled = false;
}

//////////////////////
// Helper Functions //
//////////////////////
function updateDisplay(value = currentInput) {
  // TODO: More than 15 digits == infinity
  display.innerText = value;
}

function setCurrentInput(value) {
  if (value && value.toString().length > 19) {
    return;
  }
  currentInput = value;
}

function setPreviousInput(value) {
  if (value && value.toString().length > 19) {
    return;
  }
  previousInput = value;
}

const handleCalculation = (value1, operation, value2) => {
  let result = 0;
  switch (operation) {
    case "+":
      result = value1 + value2;
      break;
    case "-":
      result = value1 - value2;
      break;
    case "x":
      result = value1 * value2;
      break;
    case "÷":
      result = value1 / value2;
      break;
    case "%":
      result = (value1 / 100) * value2;
      break;
    default:
      result = "Error";
      break;
  }
  return result % 1 === 0 ? parseInt(result) : result;
};

getValueFromEvent = (e) => parseFloat(e.target.value);
