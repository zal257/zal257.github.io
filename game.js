/*
	The original code did not have any comments. I have edited them in to make it more readable
	and also to make it easier to understand.
*/

function fnLoad() {
	// Here, the game's functions are loaded into the grid, and the option is given to the user
	// to pick a board size of their choosing from an array of sizes, ranging from 3 x 3 to 100 x 100, arranged in squares
	var select = document.getElementById("grid");
	var tr = document.createElement('tr');
	for (i = 3; i <= 100; i++) {
		var option = document.createElement('option');
		select.options[select.options.length] = new Option(i + ' X ' + i, i);
	}
	// This is the constructor for the event listener that basically figures out which square has been clicked.
	// The square that has been clicked is passed onto other functions to determine what happens.
	addEvent(document.getElementById("game"), "click", fnChoose);

	fnNewGame();
}

function addEvent(element, eventName, callback) {
	// This is where the event listener actually performs its function.
	// If no event listener exists in the square that has been clicked on, then
	// 
	if (element.addEventListener) {
		element.addEventListener(eventName, callback, false);
	} else if (element.attachEvent) {
		element.attachEvent("on" + eventName, callback);
	}
}

function fnChoose(e) {
	if (e.target && e.target.nodeName == "TD") {
		var targetElement = document.getElementById(e.target.id);
		var prevTurn;
		if ((targetElement.className).indexOf("disabled") == -1) {
			targetElement.innerHTML = turn;
			targetElement.classList.add('disabled');
			targetElement.classList.add(turn);
			score[turn] += 1;
			prevTurn = turn;
			turn = turn === "X" ? "O" : "X";
			if (fndecide(targetElement, prevTurn)) {
				alert(prevTurn + ' has won the game');
				fnNewGame();
			} else if ((score['X'] + score['O']) == (gridValue * gridValue)) {
				alert('Draw!');
				fnNewGame();
			}
		}
	}
}

function fndecide(targetElement, prevTurn) {
	var UL = document.getElementById('game');
	var elements, i, j, cnt;
	if (score[prevTurn] >= gridValue) {
		var classes = targetElement.className.split(/\s+/);
		for (i = 0; i < classes.length; i += 1) {
			cnt = 0;
			if (classes[i].indexOf('row') !== -1 || classes[i].indexOf('col') !== -1 || classes[i].indexOf('dia') !== -1) {
				elements = UL.getElementsByClassName(classes[i]);
				for (j = 0; j < elements.length; j += 1) {
					if (elements[j].innerHTML == prevTurn) {
						cnt += 1;
					}
				}
				if (cnt == gridValue) {
					return true;
				}
			}
		}
	}
	return false;
}

function fnNewGame() {
	var gameUL = document.getElementById("game");
	if (gameUL.innerHTML !== '') {
		gameUL.innerHTML = null;
		score = {
			'X': 0,
			'O': 0
		};
		turn = 'X';
		gridValue = 0;
	}
	var select = document.getElementById("grid");
	gridValue = select.options[select.selectedIndex].value;
	var i, j, li, k = 0,
		classLists;
	var gridAdd = +gridValue + 1;

	for (i = 1; i <= gridValue; i += 1) {
		tr = document.createElement('tr');
		for (j = 1; j <= gridValue; j += 1) {
			k += 1;
			li = document.createElement('td');
			li.setAttribute("id", 'li' + k);

			classLists = 'td row' + i + ' col' + j;

			if (i === j) {
				classLists = 'td row' + i + ' col' + j + ' dia0';
			}

			if ((i + j) === gridAdd) {
				classLists = 'td row' + i + ' col' + j + ' dia1';
			}

			if (!isEven(gridValue) && (Math.round(gridValue / 2) === i && Math.round(gridValue / 2) === j))
				classLists = 'td row' + i + ' col' + j + ' dia0 dia1';

			li.className = classLists;
			tr.appendChild(li);

		}
		gameUL.appendChild(tr);
	}
}


function isEven(value) {
	return value % 2 == 0;
}