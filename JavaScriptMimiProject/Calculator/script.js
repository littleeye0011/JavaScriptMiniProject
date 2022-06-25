const calculatorDisplay = document.querySelector("h1");
const inputBtn = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");
const operatorDisplay = document.querySelector("small");

const calculate = {
  "/": (firstNumber, secondNumber) =>
    secondNumber != 0 ? firstNumber / secondNumber : "error",
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber,
};

let firstValue = 0;
let operatorValue = "";
let waitForNext = false;

function setNumberValue(number) {
  if (waitForNext) {
    calculatorDisplay.textContent = number;
    waitForNext = false;
  } else {
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}

function callOperator(operator) {
  const currentVale = Number(calculatorDisplay.textContent);
  operatorDisplay.textContent = operator;
  if (operatorValue && waitForNext) {
    operatorValue = operator;
    return;
  }

  if (!firstValue) {
    firstValue = currentVale;
  } else {
    const result = calculate[operatorValue](firstValue, currentVale);
    calculatorDisplay.textContent = result;
    firstValue = result;
    if (firstValue === "error") {
      resetAll();
    }
  }
  operatorValue = operator;
  waitForNext = true;
}

function addDecimal() {
  if (waitForNext) return;
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

function addMinus() {
  const addMinsNum = calculatorDisplay.textContent * -1;
  calculatorDisplay.textContent = addMinsNum;
}

inputBtn.forEach((input) => {
  if (input.classList.length === 0) {
    input.addEventListener("click", () => setNumberValue(input.value));
  } else if (input.classList.contains("operator")) {
    input.addEventListener("click", () => callOperator(input.value));
  } else if (input.classList.contains("decimal")) {
    input.addEventListener("click", () => addDecimal(input.value));
  } else if (input.classList.contains("minus")) {
    input.addEventListener("click", () => addMinus(input.value));
  }
});

function resetAll() {
  firstValue = 0;
  operationValue = "";
  waitForNext = false;
  calculatorDisplay.textContent = "0";
  operatorDisplay.textContent = "";
}

clearBtn.addEventListener("click", () => resetAll());
