document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const message = document.getElementById("message");
    const resetButton = document.getElementById("reset-button");

    let currentPlayer = "X";
    let gameOver = false;
    let boardState = ["", "", "", "", "", "", "", "", ""];

    // Function to check for a win
    const checkWin = () => {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return boardState[a];
            }
        }

        return null;
    };

    // Function to check for a draw
    const checkDraw = () => {
        return !boardState.includes("");
    };

    // Function to handle cell click
    const handleCellClick = (cell) => {
        const cellIndex = cell.dataset.index;

        if (boardState[cellIndex] === "" && !gameOver) {
            boardState[cellIndex] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.classList.add(currentPlayer);

            const winner = checkWin();
            if (winner) {
                message.textContent = `${winner} wins!`;
                gameOver = true;
            } else if (checkDraw()) {
                message.textContent = "It's a draw!";
                gameOver = true;
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                message.textContent = `Current player: ${currentPlayer}`;
            }
        }
    };

    // Function to reset the game
    const resetGame = () => {
        currentPlayer = "X";
        gameOver = false;
        boardState = ["", "", "", "", "", "", "", "", ""];
        board.innerHTML = "";
        message.textContent = "Choose X or O";

        // Create the game board cells
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = i;
            cell.addEventListener("click", () => handleCellClick(cell));
            board.appendChild(cell);
        }
    };

    // Event listener for reset button
    resetButton.addEventListener("click", resetGame);

    // Initialize the game
    resetGame();
});
