// Calculator display highest digits 19
let previousInput = null;
let currentInput = null;

const display = document.querySelector(".display");

/////////////
// Buttons //
/////////////
const clear = document.querySelector(".clear");
const positiveNegativeToggler = document.querySelector(
  ".positive-negative-toggler"
);
const arithmeticOps = document.querySelectorAll(".arithmeticOp");

///////////////////
// functionality //
///////////////////
clear.addEventListener("click", handleClear);
positiveNegativeToggler.addEventListener("click", togglePositiveNegative);

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
function handleClear() {
  setCurrentInput(0);
  setPreviousInput(0);
  updateDisplay();
}

function togglePositiveNegative() {
  setCurrentInput(currentInput * -1);
  updateDisplay();
}

/**
 * 1 Show number if no number previously entered otherwise
 * 2 if press +/-/x/div/% show the number but wait for next number input
 * 3 remove previous number take next number up until +/-/x/div/% is pressed
 * 4 when +/-/x/div/%  is pressed
 * 5 do the calculation and show result.
 * 6 If new number pressed remove previous and show the new number
 *
 * take number
 * if currentValue 0
 *  currentValue+=number
 * endIf
 * else currentValue = parseFloat(currentValue.toString()+number)
 * updateDisplay()
 */

function handleNumberPress(event) {
  const number = event.target.value;
  if (!currentInput) {
    setCurrentInput(number);
  } else {
    setCurrentInput(parseFloat(currentInput + number));
  }

  updateDisplay();
}

function handleArithmeticOperation(event) {
  const operation = event.target.value;
  const result = handleCalculation(previousInput, operation, currentInput);
  //TODO create arithmeticOperation
}

//////////////////////
// Helper Functions //
//////////////////////
function updateDisplay() {
  if (currentInput.toString().length < 19) display.innerText = currentInput;
}

function setCurrentInput(value) {
  if (value.toString().length < 19) {
    currentInput = value;
  }
}

function setPreviousInput(value) {
  if (value.toString().length < 19) {
    previousInput = value;
  }
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
