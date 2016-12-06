/*
	The original code did not have any comments. I have edited them in to make it more readable
	and also to make it easier to understand.
*/

function fnLoad() {
	// Here, the game's functions are loaded into the grid, and the option is given to the user
	// to pick a board size of their choosing from an array of sizes, ranging from 3 x 3 to 10 x 10, arranged in squares
	var select = document.getElementById("grid");
	var tr = document.createElement('tr');
	for (i = 3; i <= 10; i++) {
		var option = document.createElement('option');
		select.options[select.options.length] = new Option(i + ' X ' + i, i);
	}
	// This is the constructor for the event listener that basically figures out which square has been clicked.
	// The square that has been clicked is passed onto other functions to determine what happens.
	addEvent(document.getElementById("game"), "click", fnChoose);

	fnNewGame();
}

function addEvent(element, eventName, callback) {
	// From what I understand from all this, if no event listener exists in the square that has been clicked on, then
	// one is created. This prevents squares from being overwritten in a current game.
	if (element.addEventListener) {
		element.addEventListener(eventName, callback, false);
	} else if (element.attachEvent) {
		element.attachEvent("on" + eventName, callback);
	}
}

function fnChoose(e) {
	// This function marks which squares had been filled. This determines if a full row of X's or O's have been completed,
	// basically determines if the game has been won by either competitor, or drawn.
	if (e.target && e.target.nodeName == "TD") {
		var targetElement = document.getElementById(e.target.id);
		var prevTurn;
		// Here, boxes are checked for whether they can be filled or not.
		// If a box hasn't been chosen, then it is filled with the marker of whosever turn it is.
		if ((targetElement.className).indexOf("disabled") == -1) {
			targetElement.innerHTML = turn;
			targetElement.classList.add('disabled');
			targetElement.classList.add(turn);
			score[turn] += 1;
			prevTurn = turn;
			turn = turn === "X" ? "O" : "X";
			if (fndecide(targetElement, prevTurn)) {
				alert(prevTurn + ' has won the game');
				fnNewGame();	// Checks if X or O has won the game.
			} else if ((score['X'] + score['O']) == (gridValue * gridValue)) {
				alert('Draw!');
				fnNewGame();	// If nobody has completed any rows in the entire board, then it is a draw.
			}
		}
	}
}

function fndecide(targetElement, prevTurn) {
	// This function determines whether the game has been won by either player.
	var UL = document.getElementById('game');
	var elements, i, j, cnt;
	// Checks to see if the score of whoever went last is greater than the size of the board grid.
	// If it is, then the count in this function, used to determine whether a row of X's or O's has been filled,
	// is increased. If the counted number of markers (in a row) placed becomes equal to the size of the grid,
	// Then the function returns a value of true to fnchoose, which then determines whether the game has ended
	// in a tie, or if there has been a winner.
	if (score[prevTurn] >= gridValue) {
		var classes = targetElement.className.split(/\s+/);
		for (i = 0; i < classes.length; i += 1) {
			cnt = 0;
			// Checks for matching row horizontally, vertically, and diagonally
			if (classes[i].indexOf('row') !== -1 || classes[i].indexOf('col') !== -1 || classes[i].indexOf('dia') !== -1) {
				elements = UL.getElementsByClassName(classes[i]);
				for (j = 0; j < elements.length; j += 1) {
					if (elements[j].innerHTML == prevTurn) {
						cnt += 1;
					}
				}
				// As mentioned previously, this returns true to fnchoose, supposing the row of markers counted
				// matches the size of the grid.
				if (cnt == gridValue) {
					return true;
				}
			}
		}
	}
	// Returns false by default to prevent the game from declaring a nonsensical victory or draw before the game even progresses
	// far enough.
	return false;
}

function fnNewGame() {
	// This function starts a new game based on the board size picked by the user.
	var gameUL = document.getElementById("game");
	if (gameUL.innerHTML !== '') {
		gameUL.innerHTML = null;
		score = {
			'X': 0,
			'O': 0
		};
		// Defaults the first turn to X. Can be modified to make sure O goes first.
		turn = 'X';
		gridValue = 0;
	}
	// This selects the grid so that it can be modified
	var select = document.getElementById("grid");
	gridValue = select.options[select.selectedIndex].value;
	var i, j, li, k = 0, classLists;	// Declares variables, sets their values and pairs them with classList DOMTokenList objects.
	var gridAdd = +gridValue + 1;
	// Grid size is generated according to the option chosen by the player.
	for (i = 1; i <= gridValue; i += 1) {
		tr = document.createElement('tr');
		for (j = 1; j <= gridValue; j += 1) {
			k += 1;
			li = document.createElement('td');
			li.setAttribute("id", 'li' + k);

			classLists = 'td row' + i + ' col' + j;	// Adds 
			
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
	// Just checks for an even number. Probably used to determine if X or O goes for that turn.
	return value % 2 == 0;
}