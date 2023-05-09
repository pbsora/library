let myLibrary = [];

function Book(title, author, pages, status, img = "images/img-nf.png") {
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
  createBook("botao", "c", 6969, false, "images/name-of-the-wind.png");
});
//Iterates through the array and displays books
function loadBook() {
  myLibrary.forEach((item) => {
    let index = myLibrary.indexOf(item);
    addDivs(item.title, item.author, item.pages, item.status, item.img, index);
  });
}

/* const delBtn = document.getElementsByClassName("del-btn");
delBtn.addEventListener("click", () => {
  const current = document.querySelector(".book");
  const classNm = current.className.slice(10);
  console.log(classNm);
  //console.log(current.className);
  //current.remove();
}); */

/* myLibrary.forEach(bookTest);

function bookTest(item) {
  console.log(item);
}
 */

//add books manually to the array and the loop through it to create the divs
