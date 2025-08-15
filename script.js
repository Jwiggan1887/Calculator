const display = document.getElementById('display');
const liveResult = document.getElementById('live-result');

function appendValue(value) {
  if (display.innerText === '0' || display.innerText === 'Error') {
    display.innerText = value === '*' ? 'x' : value;
  } else {
    display.innerText += value === '*' ? 'x' : value;
  }
  updateLiveResult();
}

function updateLiveResult() {
  try {
    let expression = display.innerText
      .replace(/÷/g, '/')
      .replace(/x/g, '*')
      .replace(/\^/g, '**')
      .replace(/π/g, 'Math.PI')
      .replace(/e/g, 'Math.E');
    const result = eval(expression);
    if (!isNaN(result) && isFinite(result)) {
      liveResult.innerText = '= ' + result;
    } else {
      liveResult.innerText = '';
    }
  } catch {
    liveResult.innerText = '';
  }
}

function clearDisplay() {
  display.innerText = '0';
  liveResult.innerText = '';
}

function calculate() {
  try {
    let expression = display.innerText
      .replace(/÷/g, '/')
      .replace(/x/g, '*')
      .replace(/\^/g, '**')
      .replace(/π/g, 'Math.PI')
      .replace(/e/g, 'Math.E');

    display.innerText = eval(expression);
    liveResult.innerText = '';
  } catch {
    display.innerText = 'Error';
    liveResult.innerText = '';
  }
}

function backspace() {
  if (display.innerText.length <= 1 || display.innerText === 'Error') {
    display.innerText = '0';
  } else {
    display.innerText = display.innerText.slice(0, -1);
  }
  updateLiveResult();
}

function applyFunction(func) {
  try {
    const value = parseFloat(display.innerText);
    let result;

    switch (func) {
      case 'sqrt':
        result = Math.sqrt(value);
        break;
      case 'square':
        result = value ** 2;
        break;
      case 'reciprocal':
        result = 1 / value;
        break;
      case 'log':
        result = Math.log10(value);
        break;
      case 'ln':
        result = Math.log(value);
        break;
      case 'sin':
        result = Math.sin(value);
        break;
      case 'cos':
        result = Math.cos(value);
        break;
      case 'tan':
        result = Math.tan(value);
        break;
      case 'percent':
        result = value / 100;
        break;
    }

    display.innerText = isNaN(result) || !isFinite(result) ? 'Error' : result;
  } catch {
    display.innerText = 'Error';
  }
}

document.addEventListener('keydown', (e) => {
  const key = e.key;

  if (!isNaN(key) || "+-*/().".includes(key)) {
    appendValue(key);
  } else if (key === "Enter") {
    e.preventDefault();
    calculate();
  } else if (key === "Backspace") {
    e.preventDefault();
    backspace();
  } else if (key === "Escape") {
    clearDisplay();
  }
});
