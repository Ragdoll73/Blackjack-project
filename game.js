let timer = 10;
let cards = [];
let gameOver = false;
let countdown;

function drawCard() {
    return Math.floor(Math.random() * 10) + 1;
}

function updateDisplay() {
    document.getElementById("cards").innerText = cards.join(", ");
    const total = cards.reduce((a, b) => a + b, 0);
    document.getElementById("total").innerText = total;
    return total;
}

function endGame() {
    if (gameOver) return;
    gameOver = true;

    clearInterval(countdown);

    const total = updateDisplay();
    let message = "";

    if (total > 21) message = "Bust! You lost!";
    else if (total === 21) message = "Blackjack! You win!";
    else if (total >= 17) message = "You win!";
    else message = "You lose!";

    document.getElementById("result").innerText = message;

    document.getElementById("hitBtn").classList.add("hidden");
    document.getElementById("endBtn").classList.add("hidden");
    document.getElementById("restartBtn").classList.remove("hidden");
}

function restartGame() {
    timer = 10;
    cards = [];
    gameOver = false;
    document.getElementById("result").innerText = "";
    document.getElementById("restartBtn").classList.add("hidden");
    document.getElementById("hitBtn").classList.remove("hidden");
    document.getElementById("endBtn").classList.remove("hidden");

    startGame();
}

function startGame() {
    cards = [drawCard()];
    updateDisplay();

    countdown = setInterval(() => {
        timer--;
        document.getElementById("timer").innerText = timer;
        if (timer <= 0) {
            endGame();
        }
    }, 1000);
}

document.getElementById("hitBtn").onclick = () => {
    if (gameOver) return;
    cards.push(drawCard());
    const total = updateDisplay();
    if (total >= 21) endGame();
};

document.getElementById("endBtn").onclick = endGame;
document.getElementById("restartBtn").onclick = restartGame;

startGame();
