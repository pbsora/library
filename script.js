let myLibrary = [];

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

function addBookToLibrary(title, author, pages, status) {
  let book = new Book(title, author, pages, status);
  myLibrary.push(book);
}

addBookToLibrary("teste", "a", 23, true);
addBookToLibrary("teste2", "ab", 232, false);

console.log(myLibrary);

function createBook() {
  //Create new book div
  const div = document.createElement("div");
  div.setAttribute("class", "book");
  //Insert image
  const img = document.createElement("img");
  img.src = "images/name-of-the-wind.png";
  div.appendChild(img);
  //Set title
  const h2 = document.createElement("h2");
  h2.textContent = "The name of the wind";
  div.appendChild(h2);
  //Set author
  const author = document.createElement("p");
  author.textContent = "Patrick Rothfuss";
  div.append(author);
  //Set page number
  const pages = document.createElement("p");
  pages.textContent = "6969";
  div.append(pages);
  //Set read status
  const read = document.createElement("p");
  read.textContent = "Yes";
  div.append(read);
  document.getElementById("books").appendChild(div);
}

createBook();
createBook();
createBook();
createBook();
createBook();
