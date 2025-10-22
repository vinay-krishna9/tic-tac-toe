const GameState = {
  board: ["", "", "", "", "", "", "", "", ""],
  currentPlayer: "X",
  gameMode: null,
  isGameActive: false,
  winner: null,
};

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const modeSelectorSection = document.getElementById("modeContainer");
const gameContainerSection = document.getElementById("gameContainer");
const cells = document.querySelectorAll(".cell");
const currentPlayerDisplay = document.getElementById("playerTurn");
const pvpBtn = document.getElementById("singlePlayerBtn");
const pvcBtn = document.getElementById("compPlayerBtn");
const resetBtn = document.getElementById("resetBtn");

function selectCell(index) {
  if (
    !GameState.isGameActive ||
    GameState.board[index] !== "" ||
    GameState.winner
  ) {
    return;
  }

  playMove(index, GameState.currentPlayer);

  if (checkWinner()) {
    currentPlayerDisplay.textContent = `Player ${GameState.winner} Wins! 🌟`;
    return;
  }

  switchPlayer();
}

function playMove(index, player) {
  GameState.board[index] = player;
  const cell = cells[index];
  cell.textContent = GameState.board[index];
  cell.classList.add(GameState.board[index]);
  cell.classList.add("disabled");
}

function switchPlayer() {
  GameState.currentPlayer = GameState.currentPlayer === "X" ? "O" : "X";
  currentPlayerDisplay.textContent = `Current Turn: Player ${GameState.currentPlayer}`;
}

function checkWinner() {
  for (let combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;

    console.group("Checking combination:", a, b, c);
    console.log(GameState.board[a], GameState.board[b], GameState.board[c]);
    console.groupEnd();

    if (
      GameState.board[a] !== "" &&
      GameState.board[a] === GameState.board[b] &&
      GameState.board[a] === GameState.board[c]
    ) {
      cells[a].classList.add("winning");
      cells[b].classList.add("winning");
      cells[c].classList.add("winning");

      cells[a].classList.remove("disabled");
      cells[b].classList.remove("disabled");
      cells[c].classList.remove("disabled");

      GameState.winner = GameState.board[a];
      return true;
    }
  }
  return false;
}

function initializeGame() {
  console.log("Init game");

  pvpBtn.addEventListener("click", () => startGame("PVP"));
  pvcBtn.addEventListener("click", () => startGame("PVC"));

  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => selectCell(index));
  });
}

function startGame(mode) {
  GameState.gameMode = mode;
  GameState.isGameActive = true;
  GameState.currentPlayer = "X";

  modeSelectorSection.style.display = "none";
  gameContainerSection.style.display = "block";

  updateTurnDisplay();
}

function updateTurnDisplay() {
  if (GameState.gameMode === "PVP") {
    currentPlayerDisplay.textContent = `Current Turn: Player ${GameState.currentPlayer}`;
  }
}

document.addEventListener("DOMContentLoaded", initializeGame);
