const buttons = document.querySelectorAll(".buttons button");
const display = document.querySelector(".display span");

let firstNumber = "";
let operator = "";
let waitingForSecondNumber = false;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "AC") {
      display.textContent = "0";
      firstNumber = "";
      operator = "";
      waitingForSecondNumber = false;
      return;
    }

    if (!isNaN(value)) {
      if (display.textContent === "0" || waitingForSecondNumber) {
        if (waitingForSecondNumber) {
          display.textContent = display.textContent + " " + value;
        } else {
          display.textContent = value;
        }

        waitingForSecondNumber = false;
      } else {
        display.textContent += value;
      }
      return;
    }

    if (value === ".") {
      display.textContent += value;
      return;
    }

    if (value === "+/-") {
      const numbers = display.textContent.split(" ");
      const lastNumber = Number(numbers[numbers.length - 1]);

      numbers[numbers.length - 1] = String(lastNumber * -1);
      display.textContent = numbers.join(" ");
      return;
    }

    if (value === "%") {
      const numbers = display.textContent.split(" ");
      const lastNumber = Number(numbers[numbers.length - 1]);

      numbers[numbers.length - 1] = String(lastNumber / 100);
      display.textContent = numbers.join(" ");
      return;
    }

    if (value === "+" || value === "−" || value === "×" || value === "÷") {
      firstNumber = Number(display.textContent.split(" ")[0]);
      operator = value;

      display.textContent = firstNumber + " " + operator;
      waitingForSecondNumber = true;
      return;
    }

    if (value === "=") {
      const parts = display.textContent.split(" ");

      if (parts.length < 3) {
        return;
      }

      const secondNumber = Number(parts[2]);
      let result;

      if (operator === "+") {
        result = firstNumber + secondNumber;
      } else if (operator === "−") {
        result = firstNumber - secondNumber;
      } else if (operator === "×") {
        result = firstNumber * secondNumber;
      } else if (operator === "÷") {
        if (secondNumber === 0) {
          display.textContent = "Error";
          firstNumber = "";
          operator = "";
          waitingForSecondNumber = false;
          return;
        }

        result = firstNumber / secondNumber;
      }

      display.textContent = String(result);

      firstNumber = "";
      operator = "";
      waitingForSecondNumber = true;
    }
  });
});
