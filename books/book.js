let currentUrl = new URL(location.href); // creating new url that contains current url
let searchParams = new URLSearchParams(currentUrl.search); //  searching in current  url params
let bookId = searchParams.get("id"); //  getting current url id// Fetching book when page is loaded
window.addEventListener("DomContentLoaded", getBook());

function getBook() {
  fetch(`http://localhost:8000/api/v1/book/${bookId}`)
    .then((res) => {
      return res.json();
    })

    .then((book) => {
      displayBook(book.data);
    });
}

function displayBook(book) {
  let main = document.querySelector("main"); // html main element
  let currentBook = "";
  console.log(book);
  // Getting values of online API and adding them to the UI
  const title = ` <h2 class = 'title' > ${book.title} </h2>`;
  const author = `<h5 class = 'author'> By (author)  ${book.author} </h5> `;
  const bookYear = `<h5 class = 'book-year'> Originally published: ${book.coped_year} </h5>`;
  const synopsis = `<p class = 'synopsis'> ${book.synopsis} </p> `;
  const bookPrice = `<h2> ${book.price} € </h2>`;
  const bookPurchaseH3 = `<h3> Free delivery worldwide</h3>`;
  const bookPurchaseP = `  <p> <i class="far fa-check-circle"></i> Available. Dispatched from Australia in 3  business  days. </p>`;
  const buttonBuy = `<button class= 'buy'> Buy Now </button>`;
  const buttonBasket = `<button class = 'basket' > Add to basket </button>`;
  const buttonWish = `<button class = 'wishlist' > Add to wishlist </button>`;
  const loginMsg = `<a class = 'login-msg' href = '../login/login.html'> Please Login To Buy Books </a>`;
  const bookInfoDiv = `<div class = 'book-info'> ${title} ${author} ${bookYear}  ${synopsis} </div>`;
  const bookCoverDiv = `<div class = 'book-cover-div'><img class = 'book-cover' src="../images/book-${
    book.id % 10
  }.png"></div>`;
  const bookPurchase = `<div class = 'book-purchase'> ${bookPrice} ${bookPurchaseH3} ${bookPurchaseP} ${buttonBuy} ${buttonBasket} ${buttonWish} ${loginMsg}  </div>`;
  currentBook = `<div class = 'book'>${bookInfoDiv} ${bookCoverDiv}  ${bookPurchase}</div>`;

  main.innerHTML = currentBook;
  let msg = document.querySelector(".login-msg");
  let buttonsBuy = document.querySelectorAll(".book button");
  let usernameSessionValue = sessionStorage.getItem("username");
  let loginBtn = document.querySelector(".login-btn");
  let username = document.querySelector(".username");
  let signOutBtn = document.querySelector(".sign-out");
  if (usernameSessionValue) {
    buttonsBuy.forEach((btn) => {
      btn.style.display = "block";
      username.style.display = "block";
      username.innerHTML = usernameSessionValue + '<i class="fas fa-user"></i>';
      loginBtn.style.display = "none";
      signOutBtn.style.display = "block";
    });
    msg.style.display = "none";
  } else {
    buttonsBuy.forEach((btn) => {
      btn.style.display = "none";
    });
  }

  signOutBtn.addEventListener("click", signOut);
  function signOut() {
    window.open("../index.html", "_self");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("password");
  }
  let buyButton = document.querySelector(".buy");
  buyButton.addEventListener("click", purchaseBook);
  function purchaseBook() {
    // Creating Date object and formatting in a way that it has ISO format and that it does not include hours , minutes and seconds
    let currentDate = new Date();
    let formattedDate = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getDate()}`;
    // Getting username and password from session storage
    const usernameSessionValue = sessionStorage.getItem("username");
    const passwordSessionValue = sessionStorage.getItem("password");
    // Authentication part //
    const base64EncodedString = btoa(
      `${usernameSessionValue}:${passwordSessionValue}`
    );
    fetch("https://bookshop-api.mirkwood.dev/purchases/", {
      method: "POST",
      headers: {
        Authorization: `Basic  ${base64EncodedString}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: 7,
        total_price: book.price,
        date: formattedDate,
        title: book.title,
        cover_url: book.cover_url,
        books: [book.id],
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  }
}
