
document.addEventListener('keydown', function(event) {
    var keyPressed = event.key;

    if (!isNaN(parseInt(keyPressed)) || '+-*/().'.includes(keyPressed)) {
        appendCharacter(keyPressed);
    } else if (keyPressed === 'Backspace') {
        deleteLastCharacter();
    } else if (keyPressed === 'Enter') {
        calculateResult();
    }
});

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
        var result = evaluateExpression(expression);
        document.getElementById('display').value = result;
        addToHistory(expression, result);
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}

function evaluateExpression(expression) {
    expression = expression.replace(/sqrt/g, 'Math.sqrt');
    expression = expression.replace(/sin/g, 'Math.sin');
    expression = expression.replace(/cos/g, 'Math.cos');
    expression = expression.replace(/tan/g, 'Math.tan');
    expression = expression.replace(/log/g, 'Math.log');
    expression = expression.replace(/frac\((.*?)\/(.*?)\)/g, '($1/$2)');
    expression = expression.replace(/÷/g, '/');
    return Function('"use strict";return (' + expression + ')')();
}

function addToHistory(expression, result) {
    var historyList = document.getElementById('history-list');
    var listItem = document.createElement('li');
    listItem.textContent = expression + ' = ' + result;
    historyList.insertBefore(listItem, historyList.firstChild);
    if (historyList.children.length > 10) {
        historyList.removeChild(historyList.lastChild);
    }
}

function clearHistory() {
    var historyList = document.getElementById('history-list');
    historyList.innerHTML = ''; 
}
