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
const endBtn = document.getElementById("endBtn");

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

function checkDraw() {
  return GameState.board.every((cell) => cell !== "");
}

function endGame() {
  GameState.board = ["", "", "", "", "", "", "", "", ""];
  GameState.currentPlayer = "X";
  GameState.isGameActive = false;
  GameState.winner = null;

  modeSelectorSection.style.display = "block";
  gameContainerSection.style.display = "none";
  currentPlayerDisplay.textContent = "";

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("X", "O", "disabled", "winning");
  });
}

function tryToWin() {
  // First, try to win
  for (let combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    const cells = [GameState.board[a], GameState.board[b], GameState.board[c]];

    // Check if computer can win
    if (
      cells.filter((cell) => cell === "O").length === 2 &&
      cells.includes("")
    ) {
      return combination[cells.indexOf("")];
    }
  }

  // Second, try to block player
  for (let combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    const cells = [GameState.board[a], GameState.board[b], GameState.board[c]];

    // Check if player is about to win
    if (
      cells.filter((cell) => cell === "X").length === 2 &&
      cells.includes("")
    ) {
      return combination[cells.indexOf("")];
    }
  }

  // take center if available
  if (GameState.board[4] === "") {
    return 4;
  }

  return null;
}

function computerMove() {
  if (!GameState.isGameActive || GameState.winner) return;

  let availableCells = GameState.board
    .map((cell, index) => (cell === "" ? index : null))
    .filter((index) => index !== null);

  if (availableCells.length === 0) return;

  // const randomIndex = Math.floor(Math.random() * availableCells.length);
  // const cellIndex = availableCells[randomIndex];

  let cellIndex = tryToWin();

  // If no strategic move, pick random
  if (cellIndex === null) {
    cellIndex =
      availableCells[Math.floor(Math.random() * availableCells.length)];
  }

  playMove(cellIndex, "O");

  if (checkWinner()) {
    currentPlayerDisplay.textContent = `Computer Wins! 🌟`;
    return;
  }

  if (checkDraw()) {
    currentPlayerDisplay.textContent = "It's a Draw! 🤝";
    return;
  }

  switchPlayer();
}

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

  if (checkDraw()) {
    currentPlayerDisplay.textContent = "It's a Draw! 🤝";
    return;
  }

  switchPlayer();

  if (GameState.gameMode === "PVC" && GameState.currentPlayer === "O") {
    setTimeout(computerMove, 500);
  }
}

function updateTurnDisplay() {
  if (GameState.gameMode === "PVP") {
    currentPlayerDisplay.textContent = `Current Turn: Player ${GameState.currentPlayer}`;
  } else {
    currentPlayerDisplay.textContent =
      GameState.currentPlayer === "X" ? "Your Turn (X)" : "Computer's Turn (O)";
  }
}

function startGame(mode) {
  GameState.gameMode = mode;
  GameState.isGameActive = true;
  GameState.currentPlayer = "X";

  modeSelectorSection.style.display = "none";
  gameContainerSection.style.display = "block";

  updateTurnDisplay();
}

function initializeGame() {
  pvpBtn.addEventListener("click", () => startGame("PVP"));
  pvcBtn.addEventListener("click", () => startGame("PVC"));

  endBtn.addEventListener("click", () => endGame());

  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => selectCell(index));
  });
}

document.addEventListener("DOMContentLoaded", initializeGame);
