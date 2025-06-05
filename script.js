let display = document.getElementById("display");
let history = [];
const historyDiv = document.getElementById("history");

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

function clearHistory() {
  history = [];
  renderHistory();
}

// Update renderHistory to add a clear button
function renderHistory() {
  if (!historyDiv) return;
  let html = '<div style="display:flex;align-items:center;justify-content:space-between;"><h3>History</h3><button onclick="clearHistory()" style="background:#222;color:#fff;border:none;border-radius:6px;padding:2px 10px;font-size:0.95em;cursor:pointer;transition:background 0.2s;">Clear</button></div><ul class="history-list">';
  if (history.length === 0) {
    html += '<li style="color:#666;">No history</li>';
  } else {
    for (let i = history.length - 1; i >= 0; i--) {
      html += `<li>${history[i]}</li>`;
    }
  }
  html += '</ul>';
  historyDiv.innerHTML = html;
}

function calculate() {
  try {
    const expression = display.innerText;
    const result = eval(expression);
    display.innerText = result;
    if (expression !== result.toString()) {
      history.push(expression + ' = ' + result);
      if (history.length > 20) history.shift();
      renderHistory();
    }
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

renderHistory();
