// Calculator display highest digits 19
let previousInput = "0";
let currentInput = "0";

const display = document.querySelector(".display");

/////////////
// Buttons //
/////////////
const clear = document.querySelector(".clear");
const positiveNegativeToggler = document.querySelector(
  ".positive-negative-toggler"
);

///////////////////
// functionality //
///////////////////
clear.addEventListener("click", handleClear);
positiveNegativeToggler.addEventListener("click", togglePositiveNegative);

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
  setCurrentInput("0");
  previousInput = "0";
  updateDisplay();
}
function togglePositiveNegative() {
  setCurrentInput(currentInput * -1);
  updateDisplay();
}

function handleNumberPress(event) {
  setCurrentInput(filterInput(currentInput, event.target.value));
  updateDisplay();
}

//////////////////////
// Helper Functions //
//////////////////////
function updateDisplay() {
  if (currentInput.length < 19) display.innerText = currentInput;
}

function filterInput(currentValue, valueToAdd) {
  if (currentValue === "0") {
    if (valueToAdd === "0") {
      return "0";
    } else {
      return valueToAdd;
    }
  }
  return (currentValue += valueToAdd);
}

function setCurrentInput(value) {
  if (value.length < 19) {
    currentInput = value;
  }
}

function setCurrentInput(value) {
  if (value.length < 19) {
    currentInput = value;
  }
}
