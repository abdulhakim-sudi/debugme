document.addEventListener("DOMContentLoaded", loadLeaderboard);

function gradeCode() {
    let code = document.getElementById("codeInput").value;
    let result = document.getElementById("result");

    if (code.includes("console.log")) {
        result.innerText = "✅ Good job! You're using console.log() to debug!";
        saveToLeaderboard();
    } else {
        result.innerText = "Try using console.log() for debugging!";
    }
}

function saveToLeaderboard() {
    let username = prompt("Enter your name for the leaderboard:");
    if (!username) return;  // If user cancels, do nothing

    fetch("http://localhost:3000/leaderboard")
    .then(response => response.json())
    .then(data => {
        // Check if user already exists
        let userExists = data.some(entry => entry.name === username);
        if (userExists) {
            alert("You are already on the leaderboard! Try again.");
            return;
        }

        let newEntry = { name: username, score: 1 };

        fetch("http://localhost:3000/leaderboard", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEntry),
        })
        .then(() => loadLeaderboard()); // Reload leaderboard after adding user
    });
}

function loadLeaderboard() {
    fetch("http://localhost:3000/leaderboard")
    .then(response => response.json())
    .then(data => {
        let leaderboard = document.getElementById("leaderboard");
        leaderboard.innerHTML = "<h2>Leaderboard</h2>";

        if (data.length === 0) {
            leaderboard.innerHTML += "<p>No users yet. Be the first!</p>";
            return;
        }

        data.forEach((entry, index) => {
            leaderboard.innerHTML += `<p>${index + 1}. ${entry.name} - ${entry.score} points</p>`;
        });
    })
    .catch(error => {
        console.error("Error loading leaderboard:", error);
        document.getElementById("leaderboard").innerHTML = "<p>Error loading leaderboard.</p>";
    });
}

// Reset Leaderboard
function resetLeaderboard() {
    fetch("http://localhost:3000/leaderboard", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leaderboard: [] }),
    })
    .then(() => loadLeaderboard());
}
