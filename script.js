const submitBtn = document.getElementById('submit');
const playerForm = document.getElementById('player-form');
const game = document.getElementById('game');
const message = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');

let player1 = '';
let player2 = '';
let currentPlayer = '';
let currentSymbol = 'X';
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// Start Game
submitBtn.addEventListener('click', () => {
  player1 = document.getElementById('player-1').value;
  player2 = document.getElementById('player-2').value;

  if (player1 === '' || player2 === '') {
    alert('Enter both player names');
    return;
  }

  playerForm.classList.add('hidden');
  game.classList.remove('hidden');

  currentPlayer = player1;
  message.textContent = `${currentPlayer}, you're up`;
});

// Cell Click
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleClick(cell, index));
});

function handleClick(cell, index) {
  if (boardState[index] !== "" || !gameActive) return;

  boardState[index] = currentSymbol;
  cell.textContent = currentSymbol;

  if (checkWinner()) {
    message.textContent = `${currentPlayer} congratulations you won!`;
    gameActive = false;
    return;
  }

  // Switch player
  if (currentSymbol === 'X') {
    currentSymbol = 'O';
    currentPlayer = player2;
  } else {
    currentSymbol = 'X';
    currentPlayer = player1;
  }

  message.textContent = `${currentPlayer}, you're up`;
}

// Winning Logic
function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return boardState[a] &&
           boardState[a] === boardState[b] &&
           boardState[a] === boardState[c];
  });
}