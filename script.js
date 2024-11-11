const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function initialize() {
  myLibrary.push(
    new Book("The Things They Carried", "Tim O'Brien", 233, true),
    new Book("The Great Gatsby", "F. Scott Fitzgerald", 208, true),
    new Book("The Catcher in the Rye", "J.D. Salinger", 234, true),
    new Book("1984", "George Orwell", 328, false),
    new Book("No Country for Old Men", "Cormac McCarthy", 320, false)
  );
  renderBooks();
}

function renderBooks() {
  const main = document.querySelector("main");
  main.innerHTML = ""; // Clear existing content before rendering

  myLibrary.forEach((book, index) => {
    // Create card element
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.style.border = "2px solid gray";
    bookCard.style.borderRadius = "8px";
    bookCard.style.padding = "1rem";
    bookCard.style.display = "flex";
    bookCard.style.flexDirection = "column";
    bookCard.style.justifyContent = "space-between";
    bookCard.style.gap = "0.5rem";
    bookCard.style.backgroundColor = "#0d1117";

    // Book title
    const title = document.createElement("h3");
    title.textContent = book.title;
    bookCard.appendChild(title);

    // Book author
    const author = document.createElement("p");
    author.textContent = `By: ${book.author}`;
    bookCard.appendChild(author);

    // Book page count
    const pages = document.createElement("p");
    pages.textContent = `Pages: ${book.pages}`;
    bookCard.appendChild(pages);
    // Card text container

    const cardText = document.createElement("div");
    cardText.classList.add("card-text");
    cardText.style.display = "flex";
    cardText.style.flexDirection = "column";
    cardText.style.gap = "0.5rem";

    cardText.appendChild(title);
    cardText.appendChild(author);
    cardText.appendChild(pages);
    bookCard.appendChild(cardText);

    // Read/unread button
    const buttonContainer = document.createElement("div");
    buttonContainer.style.display = "flex";
    buttonContainer.style.gap = "0.5rem";

    const toggleReadBtn = document.createElement("button");
    toggleReadBtn.textContent = book.read ? "Unread" : "Read";
    toggleReadBtn.classList.add("toggle-read");
    toggleReadBtn.style.flex = "1";
    toggleReadBtn.style.height = "2rem";
    toggleReadBtn.addEventListener("click", () => {
      book.read = !book.read; // Toggle read status
      renderBooks(); // Re-render to reflect changes
    });

    // Set border color based on read status
    bookCard.style.borderColor = book.read ? "amber" : "gray";

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.style.flex = "1";
    deleteBtn.style.height = "2rem";
    deleteBtn.style.backgroundColor = "red";
    deleteBtn.style.color = "white";
    deleteBtn.style.border = "none";
    deleteBtn.style.borderRadius = "4px";
    deleteBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
          <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
        </svg>`;
    const svg = deleteBtn.querySelector("svg");
    svg.style.fill = "white";
    deleteBtn.addEventListener("click", () => {
      myLibrary.splice(index, 1); // Remove book from library
      renderBooks(); // Re-render to update display
    });

    buttonContainer.appendChild(toggleReadBtn);
    buttonContainer.appendChild(deleteBtn);
    bookCard.appendChild(buttonContainer);

    // Append card to main
    main.appendChild(bookCard);
  });
}

function addBookToLibrary(event) {
  // do stuff here
  event.preventDefault();
  const titleInput = document.querySelector("#title");
  const authorInput = document.querySelector("#author");
  const pagesInput = document.querySelector("#pages");
  const readInput = document.querySelector("#read");

  const newBook = new Book(
    titleInput.value,
    authorInput.value,
    parseInt(pagesInput.value),
    readInput.checked
  );

  myLibrary.push(newBook);
  renderBooks();
}

const sumbitBtn = document.querySelector("#submit-btn");
sumbitBtn.addEventListener("click", addBookToLibrary);

initialize();
