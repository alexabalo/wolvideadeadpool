const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("reset");

const winnerModal = document.getElementById("winnerModal");
const winnerMessage = document.getElementById("winnerMessage");
const closeModal = document.getElementById("closeModal");

let currentPlayer = "X"; // Jugador inicial
let gameState = Array(9).fill(null); // Estado inicial del tablero

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/* Manejador de eventos */
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    // Evita sobreescribir una celda tomada o continuar si ya hay un ganador
    if (gameState[index] || checkWinner()) return;

    gameState[index] = currentPlayer; // Actualiza el estado del tablero
    cell.innerHTML = `<img src="${
      currentPlayer === "X" ? "./img/Recurso 1.png" : "./img/Recurso 2.png"
    }" alt="cara" class="character-face">`; // Cambia el contenido visible
    cell.classList.add("taken"); // Añade una clase CSS

    // Verifica si hay un ganador o empate
    if (checkWinner()) {
      setTimeout(() => showWinnerMessage(currentPlayer), 10);
    } else if (gameState.every((cell) => cell !== null)) {
      setTimeout(() => {
        winnerMessage.textContent = "¡Empate!";
        winnerModal.classList.remove("hidden");
      }, 10);
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X"; // Cambia de jugador
    }
  });
});

// Lógica para reiniciar el juego
resetButton.addEventListener("click", () => {
  gameState.fill(null);
  cells.forEach((cell) => {
    cell.innerHTML = ""; // Limpia el contenido de cada celda
    cell.classList.remove("taken");
  });
  currentPlayer = "X"; // Reinicia el jugador
  winnerModal.classList.add("hidden"); // Oculta el modal
});

// Verifica si hay un ganador
function checkWinner() {
  return winningCombinations.some((combination) =>
    combination.every((index) => gameState[index] === currentPlayer)
  );
}

// Muestra el mensaje del ganador
function showWinnerMessage(player) {
  winnerMessage.textContent = `${player} Gano “No lo intentes. Ni siquiera yo puedo matarme.”`;
  winnerModal.classList.remove("hidden");
}

// Cierra el modal al hacer clic en el botón
closeModal.addEventListener("click", () => {
  winnerModal.classList.add("hidden");
});
