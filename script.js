let myLibrary = [];
const openButton = document.querySelector(".openButton");
const closeButton = document.querySelector(".closeButton");
const modal = document.querySelector(".modal");
const titleBox = document.getElementById("book-title");
const authorBox = document.getElementById("book-author");
const pagesBox = document.getElementById("book-pages");
const statusBox = document.querySelector('input[type="checkbox"]');
const coverBox = document.getElementById("book-img");

function Book(title, author, pages, status, img) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  this.img = img;
}

//Create toggle read status on Book prototype
Object.prototype.read = function (index) {
  const mark = document.querySelector(`.read-status-${index}`);
  mark.innerHTML = myLibrary[index].status
    ? "Read? <img src='images/not-read.svg' class='read-img'>"
    : "Read? <img src='images/read.svg' class='read-img'>";
  myLibrary[index].status = myLibrary[index].status ? false : true;
};

//Creates new book object
function addBookToLibrary(title, author, pages, status, img) {
  let book = new Book(title, author, pages, status, img);
  return book;
}

//Creates new book object, pushes into array and then refreshes DOM
function createBook(title, author, pages, status, img) {
  let book = addBookToLibrary(title, author, pages, status, img);
  myLibrary.unshift(book);
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
  read.setAttribute("class", `read-status-${index} read-status`);
  read.innerHTML = `Read? ${
    status
      ? "<img src='images/read.svg' class='read-img'>"
      : "<img src='images/not-read.svg' class='read-img'>"
  }`;
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
  //Toggle read status button
  const readbtn = document.createElement("button");
  readbtn.setAttribute("class", "status-btn");
  readbtn.innerHTML = `<img src="images/read-toggle.svg" alt="" style="border: none; height:20px;">`;
  readbtn.addEventListener("click", () => {
    Book.read(index);
  });
  div.append(readbtn);
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

function validateInput() {
  if (!titleBox.value || !authorBox.value || !pagesBox.value) {
    document.querySelector(".validationTxt").classList.remove("valHide");
    return false;
  } else {
    if (
      titleBox.value.length > 40 ||
      !authorBox.value.length > 40 ||
      !pagesBox.value.length > 40
    ) {
      window.alert("Maximum 40 characters");
      return false;
    } else {
      return true;
    }
  }
}
//Add new book button
const addBtn = document.querySelector(".add-btn");
addBtn.addEventListener("click", () => {
  if (validateInput()) {
    createBook(
      titleBox.value,
      authorBox.value,
      pagesBox.value,
      statusBox.checked,
      coverBox.value ? coverBox.value : "images/img-nf.png"
    );
    clearInput();
    modal.close();
  }
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
  if (statusBox.checked) {
    statusBox.checked = !statusBox.checked;
  }
  (titleBox.value = ""),
    (authorBox.value = ""),
    (pagesBox.value = ""),
    (coverBox.value = ""),
    document.querySelector(".validationTxt").classList.add("valHide");
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

//initial books
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
myLibrary.push(
  addBookToLibrary(
    "The eye of the world",
    "Robert Jordan",
    832,
    true,
    "https://m.media-amazon.com/images/I/A12KkuFw6kL.jpg"
  )
);
myLibrary.push(
  addBookToLibrary(
    "The way of kings",
    "Brandon Sanderson",
    1007,
    true,
    "https://m.media-amazon.com/images/I/91KzZWpgmyL.jpg"
  )
);
myLibrary.push(
  addBookToLibrary(
    "The richest man in Babylon",
    "George Clason",
    144,
    true,
    "https://kbimages1-a.akamaihd.net/9b641bf6-ae44-4c1e-aa2b-e57ca746eb82/1200/1200/False/the-richest-man-in-babylon-31.jpg"
  )
);
myLibrary.push(
  addBookToLibrary(
    "Atomic habits",
    "James Clear",
    320,
    true,
    "https://m.media-amazon.com/images/I/81bGKUa1e0L.jpg"
  )
);
myLibrary.push(
  addBookToLibrary(
    "Mistborn",
    "Brandon Sanderson",
    672,
    true,
    "https://m.media-amazon.com/images/I/51G0zeHL2FL.jpg"
  )
);
