var numericFormat = 'bin';

function toggleBinary() {
    numericFormat = 'bin';
    updateDisplay();
}

function toggleOctal() {
    numericFormat = 'oct';
    updateDisplay();
}

function toggleHex() {
    numericFormat = 'hex';
    updateDisplay();
}

function updateDisplay() {
    var display = document.getElementById('display');
    switch (numericFormat) {
        case 'bin':
            display.value = parseInt(display.value, 2).toString(2);
            break;
        case 'oct':
            display.value = parseInt(display.value, 2).toString(8);
            break;
        case 'hex':
            display.value = parseInt(display.value, 2).toString(16).toUpperCase();
            break;
        default:
            throw new Error('Formato numérico no válido: ' + numericFormat);
    }
}

function appendCharacter(character) {
    document.getElementById('display').value += character;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function deleteLastCharacter() {
    var currentValue = document.getElementById('display').value;
    document.getElementById('display').value = currentValue.substring(0, currentValue.length - 1);
}

function calculateResult() {
    var expression = document.getElementById('display').value;
    try {
        var originalBinaryValue = expression;
        var result = evaluateExpression(expression);

        document.getElementById('display').value = originalBinaryValue;

        updateDisplay();

        addToHistory(expression, result);
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}

function shiftLeft() {
    var display = document.getElementById('display');
    display.value = (parseInt(display.value, 2) << 1).toString(2);
}

function shiftRight() {
    var display = document.getElementById('display');
    display.value = (parseInt(display.value, 2) >> 1).toString(2);
}


function evaluateExpression(expression) {
    var tokens = expression.split(/([&|^~])/);

    for (var i = 0; i < tokens.length; i++) {
        if (tokens[i].trim() === '') continue;
        if (['&', '|', '^', '~'].includes(tokens[i])) continue;
        tokens[i] = parseInt(tokens[i], 2);
    }

    var result = tokens[0];
    for (var i = 1; i < tokens.length; i += 2) {
        var operator = tokens[i];
        var operand = tokens[i + 1];
        switch (operator) {
            case '&':
                result &= operand;
                break;
            case '|':
                result |= operand;
                break;
            case '^':
                result ^= operand;
                break;
            case '~':
                result = ~operand;
                break;
            default:
                throw new Error('Operador desconocido: ' + operator);
        }
    }

    return result.toString(2);
}

function addToHistory(expression, result) {
    var historyList = document.getElementById('history-list');
    var listItem = document.createElement('li');
    
    listItem.textContent = expression + ' = ' + result;

    var display = document.getElementById('display');
    switch (numericFormat) {
        case 'bin':
            display.value = result;
            break;
        case 'oct':
            display.value = parseInt(result, 2).toString(8);
            break;
        case 'hex':
            display.value = parseInt(result, 2).toString(16).toUpperCase();
            break;
        default:
            throw new Error('Formato numérico no válido: ' + numericFormat);
    }

    historyList.insertBefore(listItem, historyList.firstChild);

    if (historyList.children.length > 10) {
        historyList.removeChild(historyList.lastChild);
    }
}

function clearHistory() {
    var historyList = document.getElementById('history-list');
    historyList.innerHTML = ''; 
}

document.addEventListener('keydown', function(event) {
    var keyPressed = event.key;

    if (!isNaN(parseInt(keyPressed)) || '+-*/().'.includes(keyPressed) || /^[a-zA-Z]$/.test(keyPressed)) {
        appendCharacter(keyPressed);
    } else if (keyPressed === 'Backspace') {
        deleteLastCharacter();
    } else if (keyPressed === 'Enter') {
        calculateResult();
    } else if (keyPressed === '&' || keyPressed === '|' || keyPressed === '^' || keyPressed === '~') {
        appendCharacter(keyPressed);
    }
});
