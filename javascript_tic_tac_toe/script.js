const Gameboard = (function () {
  let _board = [null, null, null, null, null, null, null, null, null];

  function getBoard() {
    return _board;
  }

  function setBoard(cellIndex, symbol) {
    _board[cellIndex] = symbol;
  }

  return {
    getBoard,
    setBoard
  };s
})();


const Game = (function () {

  function checkForWin(lastMoveIndex, turn) {

    if (turn >= 5) {
      const board = Gameboard.getBoard();
      const lastMove = board[lastMoveIndex];
      let counter = 0;

      const winPatterns = getWinningPatterns()[lastMoveIndex];

      for (let i = 0; i < winPatterns.length; i++) {
        for (let j = 0; j < 3 ; j++) {
          if (board[winPatterns[i][j]] == lastMove) {
            counter++;
            if (counter == 3) return true;
          }
        }
        counter = 0;
      }
    }
    return false
  }

  function playerMove(cellIndex) {
    if (Gameboard.getBoard()[cellIndex] == null) {
      let tie = true;
      if (turnOf == 1) {
        player1.move(cellIndex);
        if (Game.checkForWin(cellIndex, turn)) {
          console.log(player1.getName() + " is the WINNER!");
          DisplayController.showWinner(player1);
          tie = false;
        }
        turnOf = 2;
      } else if (turnOf == 2) {
        player2.move(cellIndex);
        if (Game.checkForWin(cellIndex, turn)) {
          console.log(player2.getName() + " is the WINNER!");
          DisplayController.showWinner(player2);
          tie = false;
        }
        turnOf = 1;
      }

      if (turn == 9 && tie) {
        console.log("It's a tie!");
        DisplayController.showTie();
      }
      turn++;
      DisplayController.render();
    }
  }

  function endGame(winner) {
    let transparentPanel = document.createElement("div");
    if (winner == "X") {
      transparentPanel.setAttribute("id", "x-win-border");
    } else if (winner == "O") {
      transparentPanel.setAttribute("id", "o-win-border");
    } else {
      transparentPanel.setAttribute("id", "transparent-panel");
    }

    document.body.appendChild(transparentPanel);

    return;
  }

  function getWinningPatterns() {
    const row1 = [0,1,2];
    const row2 = [3,4,5];
    const row3 = [6,7,8];
    const column1 = [0,3,6];
    const column2 = [1,4,7];
    const column3 = [2,5,8];
    const diagonal1 = [0,4,8];
    const diagonal2 = [2,4,6];

    const index0 = [row1, column1, diagonal1];
    const index1 = [row1, column2];
    const index2 = [row1, column3, diagonal2];
    const index3 = [row2, column1];
    const index4 = [row2, column2, diagonal1, diagonal2];
    const index5 = [row2, column3];
    const index6 = [row3, column1, diagonal2];
    const index7 = [row3, column2];
    const index8 = [row3, column3, diagonal1];

    const listOfAll = [];

    listOfAll.push(index0);
    listOfAll.push(index1);
    listOfAll.push(index2);
    listOfAll.push(index3);
    listOfAll.push(index4);
    listOfAll.push(index5);
    listOfAll.push(index6);
    listOfAll.push(index7);
    listOfAll.push(index8);

    return listOfAll
  }

  return {
    checkForWin,
    playerMove,
    endGame
  }
})();


const DisplayController = (function (board) {

  function render() {
    let cells = document.querySelectorAll("td");

    for (let i = 0; i < board.length; i++) {
      if (board[i] == "X") {
        cells[i].innerHTML = '<img class="symbol-img" src="../images/xSymbolGame.png">';
      } else if (board[i] == "O") {
        cells[i].innerHTML = '<img class="symbol-img" src="../images/oSymbolGame.PNG">'
      }

    }
    return;
  };

  function showWinner(player) {
    let winnerText = document.createElement("h2");
    winnerText.setAttribute("id", "winner-text");
    winnerText.innerHTML = "WINNER: " + player.getName();
    document.body.appendChild(winnerText);
    Game.endGame(player.getSymbol());
    return;
  }

  function showTie() {
    let tieText = document.createElement("h2");
    tieText.setAttribute("id", "winner-text");
    tieText.innerHTML = "TIE!";
    document.body.appendChild(tieText);
    Game.endGame();
    return;
  }

  return {
    render,
    showWinner,
    showTie
  };
}) (Gameboard.getBoard());


const playerFactory = (name, symbol) => {
  const _name = name;
  const _symbol = symbol;
  let _moves = [0,0,0,0,0,0,0,0,0];

  function getName() {
    return _name;
  }

  function getSymbol() {
    return _symbol;
  }

  function getMoves() {
    return _moves;
  }

  function move(cellIndex) {
    _moves[cellIndex] = 1;
    Gameboard.setBoard(cellIndex, _symbol);
  }

  return {
    getName,
    getSymbol,
    getMoves,
    move
  }
};


// RUN
const player1 = playerFactory("Ricky", "X");
const player2 = playerFactory("Roman", "O");
const gridSize = 9;
let turnOf = 1;   //Whose turn is it?
let turn = 1;     //What turn is it?
