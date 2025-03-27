document.addEventListener("DOMContentLoaded", loadLeaderboard);

let score = 0;
let attempts = 0;

// ✅ Easy Challenges (First 10)
const easyChallenges = [
    { question: `Fix the missing semicolon:\nconsole.log("Hello World")`, answer: `console.log("Hello World");` },
    { question: `Fix the spelling mistake:\nconsol.log("DebugMe!")`, answer: `console.log("DebugMe!");` },
    { question: `Complete the missing quotes:\nconsole.log(Hello Debuggers);`, answer: `console.log("Hello Debuggers");` },
    { question: `Fix the wrong capital letter:\nConsole.log("Debugging is fun!");`, answer: `console.log("Debugging is fun!");` },
    { question: `Complete the closing parenthesis:\nconsole.log("This is my first code";`, answer: `console.log("This is my first code");` },
    { question: `Fix the broken variable name:\nlet my Name = "John"; console.log(my Name);`, answer: `let myName = "John"; console.log(myName);` },
    { question: `Use console.log() correctly:\nconsole("Debugging is awesome!");`, answer: `console.log("Debugging is awesome!");` },
    { question: `Fix the number in quotes:\nconsole.log("5" + "5");`, answer: `console.log(5 + 5);` },
    { question: `Add a missing value:\nlet age;\nconsole.log(age);`, answer: `let age = 20;\nconsole.log(age);` },
    { question: `Fix the missing equal sign:\nlet name "Alice"; console.log(name);`, answer: `let name = "Alice"; console.log(name);` },
];

// ✅ Difficult Challenges (Only if user agrees)
const difficultChallenges = [
    { question: `What will this output?\nconsole.log(1 + "1" - 1);`, answer: `10`, hint: "Think about string concatenation!" },
    { question: `Fix the syntax error:\nlet x == 5;`, answer: `let x = 5;`, hint: "Double equal (==) is for comparison, not assignment!" },
    { question: `Predict the output:\nconsole.log(typeof NaN);`, answer: `"number"`, hint: "NaN is a weird JavaScript type!" },
    { question: `What's wrong with this loop?\nfor(let i = 0; i < 5; i--) {\n console.log(i);\n}`, answer: `Infinite loop`, hint: "The loop condition is never false!" },
    { question: `Why does this return false?\nconsole.log([] == ![]);`, answer: `Type coercion`, hint: "JavaScript converts types automatically!" },
];

function nextChallenge() {
    if (attempts >= 10) {
        finishEasyGame(); // After 10 questions, finish easy game
        return;
    }

    let challenge = easyChallenges[attempts];
    let userAnswer = prompt(`Challenge ${attempts + 1}/10:\n\n${challenge.question}`);

    if (userAnswer === challenge.answer) {
        alert("✅ Correct!");
        score += 10;
    } else {
        alert(`❌ Incorrect! The correct answer is:\n\n${challenge.answer}`);
    }

    attempts++;

    if (attempts < 10) {
        nextChallenge();
    } else {
        finishEasyGame();
    }
}

function finishEasyGame() {
    let percentageScore = (score / 100) * 100;
    alert(`🎉 You've completed all easy challenges!\nYour Score: ${percentageScore}%`);

    if (percentageScore > 0) {
        saveToLeaderboard(percentageScore);
    }

    // Ask if they want to take difficult questions
    let wantHarder = confirm("Great job! Would you like to try some harder debugging challenges?");

    if (wantHarder) {
        startDifficultChallenges();
    }
}

// ✅ Harder Challenges Start Here
function startDifficultChallenges() {
    let hardScore = 0;

    for (let i = 0; i < difficultChallenges.length; i++) {
        let challenge = difficultChallenges[i];
        let userAnswer = prompt(`Difficult Challenge ${i + 1}/5:\n\n${challenge.question}\n\nHint: ${challenge.hint}`);

        if (userAnswer === challenge.answer) {
            alert("✅ Correct!");
            hardScore++;
        } else {
            alert(`❌ Incorrect! The correct answer is:\n\n${challenge.answer}`);
        }
    }

    if (hardScore === 0) {
        alert("💡 You got all difficult questions wrong! Keep practicing, and you'll get better!");
    } else {
        alert(`🎉 Awesome! You got ${hardScore}/5 difficult questions right! Here's a motivational quote:\n\n💻 'Every great developer you know got there by solving problems they were unqualified to solve until they actually did it.' - Patrick McKenzie`);
    }
}

// ✅ Save user to leaderboard
function saveToLeaderboard(score) {
    let username = prompt("Enter your name for the leaderboard:");
    if (!username) return;

    let newEntry = { name: username, score: score };

    fetch("http://localhost:3000/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
    })
    .then(() => loadLeaderboard());
}

// ✅ Load leaderboard from db.json
function loadLeaderboard() {
    fetch("http://localhost:3000/leaderboard")
    .then(response => response.json())
    .then(data => {
        let leaderboard = document.getElementById("leaderboard");
        leaderboard.innerHTML = "<h2>Leaderboard</h2>";

        data.sort((a, b) => b.score - a.score);

        data.forEach((entry, index) => {
            leaderboard.innerHTML += `<p>${index + 1}. ${entry.name} - ${entry.score}%</p>`;
        });
    });
}

// Start the game on page load
window.onload = function() {
    if (confirm("Would you like to start the debugging challenge?")) {
        nextChallenge();
    }
};
