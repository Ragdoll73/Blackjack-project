let timeLeft = 60;
let score = 0;
let hand = [];
let autoDeal;

// Create a random card (values 1–11)
function drawCard() {
    return Math.floor(Math.random() * 11) + 1;
}

// Update display
function updateUI() {
    document.getElementById("timer").innerText = "Time: " + timeLeft;
    document.getElementById("score").innerText = "Score: " + score;
    document.getElementById("hand").innerText = "Hand: " + hand.join(", ") + " (Total: " + handTotal() + ")";
}

// Calculate total
function handTotal() {
    return hand.reduce((a, b) => a + b, 0);
}

// Start a new round
function resetHand() {
    hand = [drawCard()];
    updateUI();
}

// Auto deal every 2 seconds
function startAutoDeal() {
    autoDeal = setInterval(() => {
        hand.push(drawCard());
        checkStatus();
        updateUI();
    }, 2000);
}

// Check if player busts or hits 21
function checkStatus() {
    const total = handTotal();

    if (total === 21) {
        score += 3;
        resetHand();
    } else if (total > 21) {
        score -= 1;
        resetHand();
    }
}

// Handle stay button
document.getElementById("stayBtn").addEventListener("click", () => {
    const total = handTotal();

    if (total >= 17 && total < 21) {
        score += 1;
    }

    resetHand();
});

// Countdown timer
function startTimer() {
    const timerInterval = setInterval(() => {
        timeLeft--;
        updateUI();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            clearInterval(autoDeal);
            alert("Time's up! Final Score: " + score);
        }
    }, 1000);
}

// Start the game
resetHand();
startAutoDeal();
startTimer();
