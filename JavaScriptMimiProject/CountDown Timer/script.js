const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const countdown = document.getElementById("countdown");
const countdownForm = document.getElementById("countdown-form");

let countDownDate = "";
let countDownActive = "";

function updateCountDown(e) {
  e.preventDefault();
  countDownDate = e.srcElement[0].value;

  countDown();
}

function countDown() {
  countDownActive = setInterval(() => {
    const now = new Date().getTime();
    countDownValue = new Date(countDownDate).getTime();
    const distance = countDownValue - now;

    const d = Math.floor(distance / 1000 / 60 / 60 / 24);
    const h = Math.floor((distance / 1000 / 60 / 60) % 24);
    const m = Math.floor((distance / 1000 / 60) % 60);
    const s = Math.floor((distance / 1000) % 60);

    days.innerHTML = d < 10 ? "0" + d : d;
    hours.innerHTML = h < 10 ? "0" + h : h;
    minutes.innerHTML = m < 10 ? "0" + m : m;
    seconds.innerHTML = s < 10 ? "0" + s : s;

    if (distance < 0) {
      clearInterval(countDownActive);
      days.innerHTML = "00";
      hours.innerHTML = "00";
      minutes.innerHTML = "00";
      seconds.innerHTML = "00";
    }
  }, 1000);
}

countdownForm.addEventListener("submit", updateCountDown);
