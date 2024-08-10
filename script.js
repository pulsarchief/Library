const myLibrary = [];
const body = document.querySelector("body");
const main = document.querySelector("main");
const btn = document.querySelector("button");

const dialog = document.querySelector("dialog");
const submit = document.querySelector("button#submit");
const cancel = document.querySelector("button#cancel");

const titleInput = document.querySelector("input#title");
const authorInput = document.querySelector("input#author");
const pageInput = document.querySelector("input#pages");

let i = 0;

btn.addEventListener("click", () => {
    dialog.showModal();
});

document.getElementById("form_input").addEventListener("submit", event => {
    event.preventDefault();

    const readingInput = document.querySelector("input[name='READING']");

    let data = [];

    data[0] = titleInput.value;
    data[1] = authorInput.value;
    data[2] = pageInput.value;
    data[3] = readingInput.value;

    titleInput.value = "";
    authorInput.value = "";
    pageInput.value = "";

    addBookToLibrary(data);
    dialog.close();
});

/**
 *
 * @param {Array} data
 */

function addBookToLibrary(data) {
    let book = new Book(data[0], data[1], data[2], data[3]);
    myLibrary[i] = book;
    obj(book);
    i++;
}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

/**
 *
 * @param {Book} book
 */
function obj(book) {
    let bookCard = document.createElement("div");
    bookCard.id = "id" + i;
    bookCard.style.border = "1px solid black";

    let title = document.createElement("p");
    title.textContent = book.title;

    let author = document.createElement("p");
    author.textContent = book.author;

    let pages = document.createElement("p");
    pages.textContent = book.pages;

    let read = document.createElement("p");
    read.className = "readOutput";
    read.textContent = book.read;

    let changeRead = document.createElement("button");
    if (book.read == "READ") {
        changeRead.textContent = "NOT READ";
    } else {
        changeRead.textContent = "READ";
    }
    changeRead.className = "readButton";
    changeRead.dataset.index = i;
    changeRead.addEventListener("click", () => {
        readNotRead(changeRead);
    });

    let delButton = document.createElement("button");
    delButton.textContent = "DELETE";
    delButton.className = "deleteButton";
    delButton.dataset.index = i;
    delButton.addEventListener("click", () => {
        let card = document.getElementById("id" + delButton.dataset.index);
        main.removeChild(card);
        myLibrary[delButton.dataset.index] = null;
    });

    let buttonWrapper = document.createElement("div");
    buttonWrapper.appendChild(changeRead);
    buttonWrapper.appendChild(delButton);

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(read);
    bookCard.appendChild(buttonWrapper);

    main.appendChild(bookCard);
}

function readNotRead(button) {
    if (button.textContent == "READ") {
        button.textContent = "NOT READ";
        myLibrary[button.dataset.index].read = "READ";
        let readValue = document.querySelector(
            "#id" + button.dataset.index + ">.readOutput"
        );
        readValue.textContent = "READ";
    } else if (button.textContent == "NOT READ") {
        button.textContent = "READ";
        myLibrary[button.dataset.index].read = "NOT READ";
        let readValue = document.querySelector(
            "#id" + button.dataset.index + ">.readOutput"
        );
        readValue.textContent = "NOT READ";
    }
}

cancel.addEventListener("click", () => {
    dialog.close();
});
