// Fetching books on main html page //
let allBooks = document.querySelector(".books");

window.addEventListener("DOMContentLoaded", getBooks);
function getBooks() {
  fetch("http://localhost:8000/api/v1/book/")
    .then(function (re) {
      return re.json();
    })
    .then(function (data) {
      displayBooks(data.data.book);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function displayBooks(data) {
  console.log(data);
  let bookDiv = "";
  data.forEach((book) => {
    const title = `<a class = 'title' href= "books/book.html?id=${book.id}">  ${book.title}</a>  `;
    const author = `<div class = 'author'> ${book.author} </div> `;
    const bookCover = `<img class = 'book-cover' src ="images/book-${
      book.id % 10
    }.png">`;
    bookDiv += `<div class='book'> ${title} ${author} ${bookCover}   </div> `;
  });
  allBooks.innerHTML = bookDiv;
}

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
    window.open("index.html", "_self");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("password");
  }
}

checkingUsernameSessionValue();
