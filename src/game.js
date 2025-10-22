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
