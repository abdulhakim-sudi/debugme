document.addEventListener("DOMContentLoaded", loadLeaderboard);

function gradeCode() {
    let code = document.getElementById("codeInput").value;
    let result = document.getElementById("result");

    if (code.includes("console.log")) {
        result.innerText = "✅ Good job! You're using console.log() to debug!";
        saveToLeaderboard();
    } else {
        result.innerText = "❌ Try using console.log() for debugging!";
    }
}

// ✅ Save user to leaderboard
function saveToLeaderboard() {
    let username = prompt("Enter your name for the leaderboard:");
    if (!username) return;  // If the user cancels, do nothing

    let newEntry = { name: username, score: 1 };

    fetch("http://localhost:3000/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
    })
    .then(() => loadLeaderboard()); // Reload leaderboard after adding user
}

// ✅ Load leaderboard from db.json
function loadLeaderboard() {
    fetch("http://localhost:3000/leaderboard")
    .then(response => response.json())
    .then(data => {
        let leaderboard = document.getElementById("leaderboard");
        leaderboard.innerHTML = "<h2>Leaderboard</h2>";

        data.forEach((entry, index) => {
            leaderboard.innerHTML += `<p>${index + 1}. ${entry.name} - ${entry.score} points</p>`;
        });
    });
}

// ✅ Clear leaderboard
function clearLeaderboard() {
    if (confirm("Are you sure you want to clear the leaderboard?")) {
        fetch("http://localhost:3000/leaderboard", {
            method: "PUT",  // Overwrite leaderboard with an empty array
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify([])
        })
        .then(() => loadLeaderboard()); // Reload leaderboard after clearing
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const numBubbles = 20;
    for (let i = 0; i < numBubbles; i++) {
        let bubble = document.createElement("div");
        bubble.classList.add("bubble");
        bubble.style.left = Math.random() * 100 + "vw";
        bubble.style.animationDuration = (Math.random() * 3 + 3) + "s"; // Random speed
        document.body.appendChild(bubble);
    }
});
