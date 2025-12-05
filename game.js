let timeLeft = 60;
let score = 0;
let hand = [];
let gameEnded = false;

// draw a card 1–11
function drawCard() {
    return Math.floor(Math.random() * 11) + 1;
}

// total of all cards
function handTotal() {
    return hand.reduce((a, b) => a + b, 0);
}

// update screen text
function updateUI() {
    document.getElementById("timer").innerText = "Time: " + timeLeft;
    document.getElementById("score").innerText = "Score: " + score;
    document.getElementById("hand").innerText =
        "Hand: " + hand.join(", ") + " (Total: " + handTotal() + ")";
}

// reset with 1 starting card
function resetHand() {
    hand = [drawCard()];
    updateUI();
}

function endRound() {
    if (gameEnded) return;

    const total = handTotal();

    // scoring rules
    if (total === 21) {
        score += 3;
    } else if (total >= 17 && total < 21) {
        score += 1;
    } else {
        score -= 1;
    }

    updateUI();
    resetHand();
}

// END button ends game immediately
function finalEnd() {
    gameEnded = true;

    const total = handTotal();

    if (total === 21) score += 3;
    else if (total >= 17 && total < 21) score += 1;
    else score -= 1;

    updateUI();

    alert("Final Score: " + score);
}

// HIT button
document.getElementById("hitBtn").addEventListener("click", () => {
    if (gameEnded) return;

    hand.push(drawCard());
    updateUI();

    const total = handTotal();

    if (total > 21) {
        // bust
        score -= 1;
        resetHand();
        updateUI();
    } else if (total === 21) {
        // perfect 21 auto-scores
        score += 3;
        resetHand();
        updateUI();
    }
});

// END button
document.getElementById("endBtn").addEventListener("click", finalEnd);

// Countdown timer
function startTimer() {
    const timerInterval = setInterval(() => {
        if (gameEnded) {
            clearInterval(timerInterval);
            return;
        }

        timeLeft--;
        updateUI();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            finalEnd();
        }
    }, 1000);
}

// start game
resetHand();
startTimer();
