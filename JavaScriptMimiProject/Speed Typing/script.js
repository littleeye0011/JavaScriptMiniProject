const wordEl = document.getElementById("word");
const textEl = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");

const btnLevelEl = document.getElementById("level-btn");
const settingsEl = document.getElementById("settings");
const levelFormEl = document.getElementById("level-form");
const levelEl = document.getElementById("level-select");
const gameoverEl = document.getElementById("gameover-container");
const startBtn = document.getElementById("start-btn");

const words = [
  "ตีงูหลังหัก",
  "เข็นครก",
  "ตำน้ำพริก",
  "แม่น้ำ",
  "ฝนตก",
  "หน้าแล้ง",
  "ไฟไหม้",
  "ลำโพง",
  "อิ่มท้อง",
  "น้องสาว",
  "หมาหน้าแมว",
];

let randomText;
let score = 0;
let time = 20;

let level = "medium";
const saveMode =
  localStorage.getItem("mode") !== null
    ? localStorage.getItem("mode")
    : "medium";
levelEl.value = saveMode;

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function displayWord() {
  randomText = getRandomWord();
  wordEl.innerHTML = randomText;
  timeEl.innerHTML = time;
}

textEl.addEventListener("input", (e) => {
  const inputText = e.target.value;

  if (inputText === randomText) {
    if (saveMode == "easy") {
      time += 10;
    } else if (saveMode == "medium") {
      time += 5;
    } else {
      time += 3;
    }
  }
  displayWord();
  updateScore();
  e.target.value = "";
});

function updateScore() {
  score += 10;
  scoreEl.innerText = score;
}

function showGameOver() {
  gameoverEl.innerHTML = `<h1>จบเกม!!!!!</h1> <p>คะแนน = ${score}</p> <button onClick="location.reload()">เล่นใหม่</button>`;
  gameoverEl.style.display = "flex";
}
btnLevelEl.addEventListener("click", () => {
  settingsEl.classList.toggle("hide");
});

levelEl.addEventListener("change", (e) => {
  level = e.target.value;
  localStorage.setItem("mode", level);
  const saveMode =
    localStorage.getItem("mode") !== null
      ? localStorage.getItem("mode")
      : "medium";
  levelEl.value = saveMode;
});

function startGame() {
  if (saveMode == "easy") {
    time = 20;
  } else if (saveMode == "medium") {
    time = 15;
  } else {
    time = 5;
  }
  displayWord();
}

startBtn.addEventListener("click", () => {
  const timeInterval = setInterval(updateTime, 1000);
  function updateTime() {
    time--;
    timeEl.innerHTML = time;
    if (time === 0) {
      clearInterval(timeInterval);
      showGameOver();
    }
  }
  startGame();
});

textEl.focus();
