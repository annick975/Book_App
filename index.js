import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://cart-e0dcd-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const orders = ref(database, "Books");

const inputField = document.getElementById("input-field");
const addBtn = document.getElementById("add-button");
let list = document.getElementById("shopping-list");
const listOfBooks = document.getElementById("bookList");

//onValue funct runs everytime there 's a change to the DB

onValue(orders, function (snapshot) {
  let booksArray = Object.values(snapshot.val());
  clearList();

  //Retrieving items in the DB

  for (let i = 0; i < booksArray.length; i++) {
    let bookList = booksArray[i];

    //console.log(bookList);

    function addBookToList() {
      listOfBooks.innerHTML += `<h3>${bookList}</h3>`;
    }
    addBookToList();
  }
});

//Updating items in realtime
onValue(orders, function (snapshot) {
  if (snapshot.exists()) {
    let booksInDB = Object.entries(snapshot.val());
    list.innerHTML = "";

    for (let i = 0; i < booksInDB.length; i++) {
      let bookList = booksInDB[i];
      let bookID = bookList[0];
      let bookValue = bookList[1];

      // list.innerHTML += `<li>${bookList}</li>`;

      let newEl = document.createElement("li");
      newEl.textContent = bookValue;

      newEl.addEventListener("click", function () {
        console.log(bookID);
      });

      newEl.addEventListener("click", function () {
        let exactLocation = ref(database, `Books/${bookID}`);

        remove(exactLocation);
      });

      list.append(newEl);
    }
  } else {
   list.innerHTML = "No items here yet"
  }
});

function clearList() {
  listOfBooks.innerHTML = "";
}

addBtn.addEventListener("click", function () {
  let inputValue = inputField.value;
  push(orders, inputValue);
  inputField.value = "";
  console.log(inputValue);
  //list.innerHTML += `<li>${inputValue}</li>`;
});
