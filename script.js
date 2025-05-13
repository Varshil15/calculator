let display = document.getElementById("display");

function append(value) {
  if (display.innerText === "0") {
    display.innerText = value;
  } else {
    display.innerText += value;
  }
}

function clearDisplay() {
  display.innerText = "0";
}

function calculate() {
  try {
    display.innerText = eval(display.innerText);
  } catch (e) {
    display.innerText = "Error";
  }
}

function backspace() {
  if (display.innerText.length > 1) {
    display.innerText = display.innerText.slice(0, -1);
  } else {
    display.innerText = "0";
  }
}

document.addEventListener("keydown", function (event) {
  const key = event.key;

  if ("0123456789.+-*/%".includes(key)) {
    append(key);
  }

  if (key === "Enter" || key === "=") {
    calculate();
  }

  if (key === "Backspace") {
    backspace();
  }

  if (key === "Escape") {
    clearDisplay();
  }
});
