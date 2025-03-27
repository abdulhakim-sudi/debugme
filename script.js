// ✅ Question & Answer System
const questions = [
    { question: "What does `console.log()` do?", answer: "Prints output to the console" },
    { question: "How do you declare a variable in JavaScript?", answer: "Using let, var, or const" },
    { question: "Which keyword is used to define a function?", answer: "function" },
    { question: "What is an array in JavaScript?", answer: "A collection of elements" },
    { question: "What symbol is used for comments in JavaScript?", answer: "//" },
    { question: "What does `document.getElementById()` do?", answer: "Selects an HTML element by ID" },
    { question: "How do you write an if statement?", answer: "if(condition) { }" }
];

let currentQuestionIndex = 0;
let score = 0;

// ✅ Load the first question
function loadQuestion() {
    let questionArea = document.getElementById("questionArea");
    let questionObj = questions[currentQuestionIndex];

    questionArea.innerHTML = `
        <h3>Question ${currentQuestionIndex + 1}:</h3>
        <p>${questionObj.question}</p>
        <input type="text" id="answerInput" placeholder="Type your answer here...">
        <button onclick="checkAnswer()">Submit</button>
        <p id="feedback"></p>
        <button id="nextButton" onclick="nextQuestion()" style="display: none;">Next ➡</button>
    `;
}

// ✅ Check Answer
function checkAnswer() {
    let userAnswer = document.getElementById("answerInput").value.trim().toLowerCase();
    let correctAnswer = questions[currentQuestionIndex].answer.toLowerCase();
    let feedback = document.getElementById("feedback");

    if (userAnswer === correctAnswer) {
        feedback.innerHTML = "✅ Correct!";
        score += 1;
    } else {
        feedback.innerHTML = `❌ Wrong! The correct answer is: <strong>${questions[currentQuestionIndex].answer}</strong>`;
    }

    document.getElementById("nextButton").style.display = "inline-block"; 
}

// ✅ Next Question
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showFinalScore();
    }
}

// ✅ Show Final Score
function showFinalScore() {
    let questionArea = document.getElementById("questionArea");
    let percentage = (score / questions.length) * 100;

    questionArea.innerHTML = `
        <h2>Your Score: ${percentage.toFixed(2)}%</h2>
        <p>You answered ${score} out of ${questions.length} correctly.</p>
        <button onclick="restartQuiz()">Try Again</button>
    `;
}

// ✅ Restart Quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
}

// ✅ Leaderboard Functionality
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

// ✅ Save User to Leaderboard
function saveToLeaderboard() {
    let username = prompt("Enter your name for the leaderboard:");
    if (!username) return; 

    let newEntry = { name: username, score: 1 };

    fetch("http://localhost:3000/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
    })
    .then(() => loadLeaderboard());
}

// ✅ Load Leaderboard
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

// ✅ Clear Leaderboard
function clearLeaderboard() {
    if (confirm("Are you sure you want to clear the leaderboard?")) {
        fetch("http://localhost:3000/leaderboard", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify([])
        })
        .then(() => loadLeaderboard());
    }
}

// ✅ Mouse Trail Effect
let particles = [];

document.addEventListener("mousemove", (event) => {
    let particle = document.createElement("div");
    particle.className = "trail";
    document.body.appendChild(particle);

    let size = Math.random() * 10 + 5;
    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.left = event.pageX + "px";
    particle.style.top = event.pageY + "px";

    let colors = ["#ff0000", "#ff7300", "#ffeb00", "#4cff00", "#00e1ff", "#d400ff"];
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    particles.push({ x: event.pageX, y: event.pageY, element: particle });

    setTimeout(() => {
        particle.remove();
        particles.shift();
    }, 700);

    drawLines();
});

// ✅ Draw Connecting Lines
function drawLines() {
    let canvas = document.getElementById("mouseCanvas");
    if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.id = "mouseCanvas";
        document.body.appendChild(canvas);
    }
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.lineWidth = 2;

    for (let i = 0; i < particles.length - 1; i++) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[i + 1].x, particles[i + 1].y);
        ctx.stroke();
    }
}

// ✅ Animated Star Background
document.addEventListener("DOMContentLoaded", () => {
    let canvas = document.createElement("canvas");
    canvas.id = "starCanvas";
    document.body.appendChild(canvas);

    let ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let stars = [];
    for (let i = 0; i < 100; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2,
            speed: Math.random() * 0.5 + 0.2
        });
    }

    function animateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";

        stars.forEach(star => {
            star.y -= star.speed;
            if (star.y < 0) star.y = canvas.height;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(animateStars);
    }

    animateStars();
});

// ✅ Start the quiz when the page loads
document.addEventListener("DOMContentLoaded", loadQuestion);
