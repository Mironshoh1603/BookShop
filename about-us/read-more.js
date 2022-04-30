function checkingUsernameSessionValue() {
  let usernameSessionValue = sessionStorage.getItem("username");
  let loginBtn = document.querySelector(".login-btn");
  let username = document.querySelector(".username");
  let signOutBtn = document.querySelector(".sign-out");
  if (usernameSessionValue) {
    username.style.display = "block";
    username.innerHTML = usernameSessionValue + '<i class="fas fa-user"></i>';
    loginBtn.style.display = "none";
    signOutBtn.style.display = "block";
  }
  signOutBtn.addEventListener("click", signOut);
  function signOut() {
    window.open("../index.html", "_self");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("password");
  }
}

checkingUsernameSessionValue();
