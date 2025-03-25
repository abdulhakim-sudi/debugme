let score = 0;
let challenges = [];

// Fetch coding challenges from db.json
async function fetchChallenges() {
    let response = await fetch("http://localhost:3000/challenges");
    let data = await response.json();
    return data;
}

// Fetch user score from db.json
async function fetchUserScore() {
    let response = await fetch("http://localhost:3000/users/1");
    let user = await response.json();
    score = user.score;
    document.getElementById("scoreDisplay").innerText = `Score: ${score}`;
}

// Update user score in db.json
async function updateScore(newScore) {
    await fetch("http://localhost:3000/users/1", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score: newScore })
    });

    fetchLeaderboard(); // Refresh leaderboard after score update
}

// Show a random coding challenge
function showChallenge() {
    if (challenges.length > 0) {
        let challenge = challenges[Math.floor(Math.random() * challenges.length)];
        document.getElementById("challengeText").innerText = challenge.question;
        document.getElementById("challengeAnswer").value = challenge.answer; // Hide this in production
    }
}

// Grade user code
function gradecode() {
    let userCode = document.getElementById("codeInput").value.trim();
    let correctAnswer = document.getElementById("challengeAnswer").value.trim();
    let resultElement = document.getElementById("result");

    if (userCode === correctAnswer) {
        score += 10; // Add points for correct answer
        resultElement.innerText = `🎉 Correct! +10 points. Total Score: ${score}`;
    } else {
        score -= 5; // Deduct points for incorrect answer
        resultElement.innerText = `😢 Incorrect! Try again. -5 points. Total Score: ${score}`;
    }

    updateScore(score); // Save updated score to db.json
    document.getElementById("scoreDisplay").innerText = `Score: ${score}`;
}

// Save user code to db.json
async function savecode() {
    let userCode = document.getElementById("codeInput").value.trim();
    
    if (userCode === "") {
        alert("Please enter some code before saving!");
        return;
    }

    await fetch("http://localhost:3000/users/1", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lastCode: userCode })
    });

    alert("✅ Code saved successfully!");
}

// Fetch leaderboard data from db.json
async function fetchLeaderboard() {
    let response = await fetch("http://localhost:3000/users");
    let users = await response.json();

    // Sort users by score in descending order
    users.sort((a, b) => b.score - a.score);

    // Display leaderboard
    let leaderboardHTML = "<tr><th>Rank</th><th>Name</th><th>Score</th></tr>";
    users.forEach((user, index) => {
        leaderboardHTML += `<tr>
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.score}</td>
        </tr>`;
    });

    document.getElementById("leaderboard").innerHTML = leaderboardHTML;
}

// Initialize the app
window.onload = function() {
    fetchUserScore(); // Load user score
    fetchChallenges().then(data => {
        challenges = data;
        showChallenge();
    });
    fetchLeaderboard(); // Load leaderboard
};
