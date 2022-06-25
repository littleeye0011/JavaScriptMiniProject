const questionData = [
  {
    question: "1.ข้อใดไม่ใช่ระบบปฏิบัติการ",
    a: "ระบบปฏิบัติการดอส",
    b: "ไมโครซอฟท์เวิร์ด",
    c: "ไมโครซอฟต์วินโดวส์",
    d: "ระบบปฏิบัติการแอนดรอยด์",
    correct: "b",
  },
  {
    question: "2.ข้อใดคือโปรแกรม Web Browser",
    a: "Google Chrome",
    b: "Keyboard",
    c: "Mouse",
    d: "Monitor",
    correct: "a",
  },
  {
    question: "3.ข้อใดคือฮา์ดแวร์",
    a: "Keyboard",
    b: "Mouse",
    c: "Monitor",
    d: "ถูกทุกข้อ",
    correct: "d",
  },
];

const questionEl = document.getElementById("question");
const answerEl = document.querySelectorAll(".answer");
const choiceA = document.getElementById("a-text");
const choiceB = document.getElementById("b-text");
const choiceC = document.getElementById("c-text");
const choiceD = document.getElementById("d-text");

const container = document.querySelector(".question-container");

const btn = document.getElementById("submit");

let currentQuestion = 0;
let score = 0;
loadQuestion();

function loadQuestion() {
  checkChoice();
  const currentQuizData = questionData[currentQuestion];
  questionEl.innerText = currentQuizData.question;
  choiceA.innerText = currentQuizData.a;
  choiceB.innerText = currentQuizData.b;
  choiceC.innerText = currentQuizData.c;
  choiceD.innerText = currentQuizData.d;
}

function checkChoice() {
  answerEl.forEach((answer) => (answer.checked = false));
}

btn.addEventListener("click", () => {
  let answer = getChoiceAnswer();
  if (answer === questionData[currentQuestion].correct) {
    score++;
  }
  currentQuestion++;
  if (currentQuestion < questionData.length) {
    loadQuestion();
  } else {
    container.innerHTML = `<h2>คุณได้คะแนน ${score}/${questionData.length}</h2>
    <button type="submit" id="reset">เล่นใหม่</button>
    `;
    const resetBtn = document.getElementById("reset");
    resetBtn.addEventListener("click", () => {
      location.reload();
    });
  }
});

function getChoiceAnswer() {
  let answer;
  answerEl.forEach((answerCheck) => {
    if (answerCheck.checked) {
      answer = answerCheck.id;
    }
  });
  return answer;
}
