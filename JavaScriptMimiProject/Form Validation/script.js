const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const rePassword = document.getElementById("re-password");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (username.value === "") {
    showError(username, "กรุณาป้อนข้อมูล");
  } else if (username.value.length < 4) {
    showError(username, "กรุณาป้อนรหัสผ่านมากกว่า 4 ตัว");
  } else {
    showSuccess(username);
  }
  if (email.value === "") {
    showError(email, "กรุณาป้อน Email");
  } else if (!validateEmail(email.value.trim())) {
    showError(email, "Email ไม่ถูกต้อง");
  } else {
    showSuccess(email);
  }
  checkPassword(password, rePassword);
});

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function checkPassword(password, rePassword) {
  if (password.value === "") {
    showError(password, "กรุณาป้อนรหัสผ่าน");
  } else if (password.value.length < 6) {
    showError(password, "กรุณาป้อนรหัสผ่านมากกว่า 6 ตัว");
  } else {
    showSuccess(password);
  }
  if (rePassword.value !== password.value || rePassword.value.length < 6) {
    showError(rePassword, "รหัสผ่านไม่ถูกต้อง");
  } else if (rePassword.value === "") {
    showError(rePassword, "กรุณาป้อนรหัสผ่าน");
  } else {
    showSuccess(rePassword);
  }
}
