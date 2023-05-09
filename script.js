let myLibrary = [];
const addBtn = document.querySelector(".add-btn");

function Book(
  title,
  author,
  pages,
  status,
  img = "images/name-of-the-wind.png"
) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  this.img = img;
}

//Creates new book object and pushes into array
function addBookToLibrary(title, author, pages, status) {
  let book = new Book(title, author, pages, status);
  return book;
}

function createBook(title, author, pages, status) {
  let book = addBookToLibrary(title, author, pages, status);
  const bookNumber = myLibrary.push(book) - 1;

  //Create new book div
  const div = document.createElement("div");
  div.setAttribute("class", `book book-${bookNumber}`);
  //Insert image
  const img = document.createElement("img");
  img.src = "images/name-of-the-wind.png";
  div.appendChild(img);
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
  btn.addEventListener("click", () => {
    const current = document.querySelector(".book");
    const classNm = bookNumber;
    myLibrary.splice(classNm, 1);
    current.remove(classNm);
    delBooks();

    /*  for (i = 0; i <= myLibrary.length; i++) {
      //createBook("The name of the wind", "Patrick Rothfuss", 662, true);
      console.log(myLibrary[i]);
    } */

    myLibrary.forEach((bk) =>
      createBook("The name of the wind", "Patrick Rothfuss", 662, true)
    );
  });
  div.append(btn);

  document.getElementById("books").appendChild(div);
}

//createBook("The name of the wind", "Patrick Rothfuss", 662, true);
//createBook("The name of the wind2", "Patrick Rothfuss2", 662, true);

addBtn.addEventListener("click", () => {
  createBook("botao", "c", 6969, false);
});

//Deletes all books from the DOM
function delBooks() {
  const books = document.querySelectorAll(".book");
  books.forEach((bk) => {
    bk.remove();
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
