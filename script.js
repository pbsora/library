let myLibrary = [];
const openButton = document.querySelector(".openButton");
const closeButton = document.querySelector(".closeButton");
const modal = document.querySelector(".modal");
let titleBox = document.getElementById("book-title");
let authorBox = document.getElementById("book-author");
let pagesBox = document.getElementById("book-pages");
let statusBox = document.querySelector('input[type="checkbox"]');
let coverBox = document.getElementById("book-img");

function Book(title, author, pages, status, img) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  this.img = img;
}

//Creates new book object
function addBookToLibrary(title, author, pages, status, img) {
  let book = new Book(title, author, pages, status, img);
  return book;
}

//Creates new book object, pushes into array and then refreshes DOM
function createBook(title, author, pages, status, img) {
  let book = addBookToLibrary(title, author, pages, status, img);
  myLibrary.push(book);
  delBooks();
  myLibrary.forEach((item) => {
    let index = myLibrary.indexOf(item);
    addDivs(item.title, item.author, item.pages, item.status, item.img, index);
  });
}

//Add book card to DOM
function addDivs(title, author, pages, status, img, index) {
  //Create new book div
  const div = document.createElement("div");
  div.setAttribute("class", `book book-${index}`);
  //Insert image
  const image = document.createElement("img");
  image.src = img;
  div.appendChild(image);
  //Set title
  const h2 = document.createElement("h2");
  h2.textContent = `${title}`;
  div.appendChild(h2);
  //Set author
  const writer = document.createElement("p");
  writer.textContent = `Author: ${author}`;
  div.append(writer);
  //Set page number
  const page = document.createElement("p");
  page.textContent = `${pages} pages`;
  div.append(page);
  //Set read status
  const read = document.createElement("p");
  read.textContent = `Read? ${status ? "Yes" : "No"}`;
  div.append(read);
  //Delete book button
  const btn = document.createElement("button");
  btn.setAttribute("class", "del-btn");
  btn.innerHTML = `<img src="images/delete.svg" alt="" style="border: none; height:20px;">`;
  //Gets current book and deletes
  btn.addEventListener("click", () => {
    const current = document.querySelector(".book");
    const classNm = index;
    myLibrary.splice(classNm, 1);
    current.remove(classNm);
    delBooks();
    loadBook();
  });
  div.append(btn);
  //Appends new div with all elements inside
  document.getElementById("books").appendChild(div);
}

//Deletes all books from the DOM
function delBooks() {
  const books = document.querySelectorAll(".book");
  books.forEach((bk) => {
    bk.remove();
  });
}
//Add new book button
const addBtn = document.querySelector(".add-btn");
addBtn.addEventListener("click", () => {
  createBook(
    titleBox.value,
    authorBox.value,
    pagesBox.value,
    statusBox.checked,
    coverBox.value ? coverBox.value : "images/img-nf.png"
  );
  clearInput();

  modal.close();
});
//Iterates through the array and displays books
function loadBook() {
  myLibrary.forEach((item) => {
    let index = myLibrary.indexOf(item);
    addDivs(item.title, item.author, item.pages, item.status, item.img, index);
  });
}

//Clears input values on DOM
function clearInput() {
  (titleBox.value = ""),
    (authorBox.value = ""),
    (pagesBox.value = ""),
    (statusBox.checked = !statusBox.checked),
    (coverBox.value = "");
}

//Modal methods
openButton.addEventListener("click", () => {
  modal.showModal();
});

closeButton.addEventListener("click", () => {
  modal.close();
});

//Close dialog if you click outside the box
const dialog = document.querySelector("dialog");
dialog.addEventListener("click", (e) => {
  const dialogDimensions = dialog.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    dialog.close();
  }
});

//2 initial books
myLibrary.push(
  addBookToLibrary(
    "The name of the wind",
    "Patrick Rothfuss",
    1663,
    true,
    "images/name-of-the-wind.png"
  )
);
myLibrary.push(
  addBookToLibrary(
    "The wise man's fear",
    "Patrick Rothfuss",
    1332,
    true,
    "https://m.media-amazon.com/images/I/51QolUHRfuS.jpg"
  )
);
