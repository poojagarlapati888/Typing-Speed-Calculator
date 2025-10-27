const textDisplay = document.getElementById("textDisplay");
const textInput = document.getElementById("textInput");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const result = document.getElementById("result");

const texts = [
  "Practice makes perfect, so keep typing until you master your speed.",
  "The quick brown fox jumps over the lazy dog.",
  "Typing is an essential skill that improves with daily practice.",
  "Consistency and accuracy are more important than raw speed."
];

let startTime, endTime, timerRunning = false;
let currentText = "";

// Select random text
function getRandomText() {
  return texts[Math.floor(Math.random() * texts.length)];
}

// Start test
startBtn.addEventListener("click", () => {
  currentText = getRandomText();
  textDisplay.textContent = currentText;
  textInput.value = "";
  textInput.disabled = false;
  textInput.focus();
  result.textContent = "";
  timerRunning = false;
  startTime = null;
});

// Typing logic
textInput.addEventListener("input", () => {
  const typedText = textInput.value;

  // Start timer on first keystroke
  if (!timerRunning && typedText.length === 1) {
    timerRunning = true;
    startTime = new Date().getTime();
  }

  // Stop timer when text matches
  if (typedText === currentText) {
    endTime = new Date().getTime();
    const timeTaken = (endTime - startTime) / 1000; // in seconds
    const wordCount = currentText.split(" ").length;
    const wpm = Math.round((wordCount / timeTaken) * 60);

    result.innerHTML = `
      ⏱️ Time: ${timeTaken.toFixed(2)} seconds <br>
      🧠 Speed: ${wpm} WPM
    `;

    textInput.disabled = true;
  }
});

// Reset test
resetBtn.addEventListener("click", () => {
  textDisplay.textContent = "";
  textInput.value = "";
  textInput.disabled = true;
  result.textContent = "";
});
