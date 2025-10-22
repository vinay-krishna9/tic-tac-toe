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

function initializeGame() {
  console.log("Init game");

  pvpBtn.addEventListener("click", () => startGame("PVP"));
  pvcBtn.addEventListener("click", () => startGame("PVC"));

  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => console.log(index));
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
