var board = ["", "", "", "", "", "", "", "", ""];
var currentPlayer = "X";
var scores = { X: 0, O: 0 };
var flag = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6] 
];

function makeMove(cell, index) {
    if (board[index] === "" && flag) {
        board[index] = currentPlayer;
        cell.classList.add(currentPlayer);
        cell.textContent = currentPlayer;
        animateMove(cell);
        checkWin();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        updateStatusMessage();
    }
}

function animateMove(cell) {
    cell.style.animation = "popIn 0.3s ease-out";
    cell.addEventListener("animationend", () => {
        cell.style.animation = "";
    }, { once: true });
}

function checkWin() {
    for (var condition of winningConditions) {
        var [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            flag = false;
            scores[board[a]] += 1;
            updateScoreboard();
            showStatusMessage(`Player ${board[a]} wins!`);
            animateWinningCells([a, b, c]);
            setTimeout(() => {
            }, 500);
            return;
        }
    }
    if (!board.includes("")) {
        flag = false;
        showStatusMessage("It's a draw!");
        animateDraw();
    }
}

function animateWinningCells(cells) {
    cells.forEach((index, i) => {
        setTimeout(() => {
            document.querySelectorAll('.cell')[index].style.animation = "winPulse 0.5s ease-in-out infinite";
        }, i * 100);
    });
}

function animateDraw() {
    document.querySelectorAll('.cell').forEach((cell, index) => {
        setTimeout(() => {
            cell.style.animation = "drawShake 0.5s ease-in-out";
        }, index * 50);
    });
}

function updateStatusMessage() {
    const statusMessage = document.getElementById("statusMessage");
    if (flag) {
        statusMessage.textContent = `Player ${currentPlayer}'s turn`;
        statusMessage.style.animation = "fadeIn 0.5s ease-out";
    }
}

function showStatusMessage(message) {
    const statusMessage = document.getElementById("statusMessage");
    statusMessage.textContent = message;
    statusMessage.style.animation = "bounceIn 0.5s ease-out";
}

function updateScoreboard() {
    const scoreX = document.getElementById("scoreX");
    const scoreO = document.getElementById("scoreO");
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
    scoreX.style.animation = "scoreUpdate 0.5s ease-out";
    scoreO.style.animation = "scoreUpdate 0.5s ease-out";
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    flag = true;
    document.querySelectorAll(".cell").forEach(cell => {
        cell.classList.remove("X", "O");
        cell.textContent = "";
        cell.style.animation = "fadeIn 0.5s ease-out";
    });
    showStatusMessage(`Player ${currentPlayer}'s turn`);
}

updateStatusMessage();



window.onload = function () {
    document.getElementById('startModal').style.display = 'block';
}

function startGame() {
    document.getElementById('startModal').style.display = 'none';
}


