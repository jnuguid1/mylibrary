const myLibrary = [];
const bookContainer = document.querySelector('.book-container');
const newBookButton = document.querySelector('.new-book-button');
const formContainer = document.querySelector('.form-container');
const submitBookButton = document.querySelector('#form-submit');
const titleInput = document.querySelector('#book-title');
const authorInput = document.querySelector('#book-author');
const pagesInput = document.querySelector('#book-pages');
const completedInput = document.querySelector('#completed');

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
      return `${title} by ${author}, ${pages} pages, ${
        read ? 'has read' : 'has not read'
      }`;
    };
  }
}

function displayBooks() {
  let child = bookContainer.lastElementChild;
  while (child) {
    bookContainer.removeChild(child);
    child = bookContainer.lastElementChild;
  }

  function removeBook(event) {
    const index = event.target.getAttribute('index');
    myLibrary.splice(index, 1);
    displayBooks();
  }

  let index = 0;
  myLibrary.forEach((book) => {
    const card = document.createElement('div');
    const cardTitle = document.createElement('h2');
    const cardAuthor = document.createElement('p');
    const cardPagesCount = document.createElement('p');
    const cardCompleted = document.createElement('p');
    const infoDiv = document.createElement('div');
    const iconRow = document.createElement('div');
    const completeIcon = document.createElement('i');
    const deleteIcon = document.createElement('i');
    cardTitle.textContent = book.title;
    cardAuthor.textContent = book.author;
    cardPagesCount.textContent = `${book.pages} pages`;
    cardCompleted.textContent = book.read ? 'Completed' : 'Not read';
    card.classList.add('book-card');
    iconRow.classList.add('icon-row');
    completeIcon.classList.add('fa-solid');
    completeIcon.classList.add('fa-square-check');
    completeIcon.classList.add('fa-xl');
    deleteIcon.classList.add('fa-solid');
    deleteIcon.classList.add('fa-trash');
    deleteIcon.classList.add('fa-xl');
    deleteIcon.setAttribute('index', `${index}`);
    deleteIcon.addEventListener('click', removeBook);
    completeIcon.addEventListener('click', () => {
      cardCompleted.textContent = (cardCompleted.textContent === 'Completed' ? 'Not read' : 'Completed');
    });
    infoDiv.appendChild(cardTitle);
    infoDiv.appendChild(cardAuthor);
    infoDiv.appendChild(cardPagesCount);
    infoDiv.appendChild(cardCompleted);
    iconRow.appendChild(completeIcon);
    iconRow.appendChild(deleteIcon);
    card.appendChild(infoDiv);
    card.appendChild(iconRow);
    bookContainer.appendChild(card);
    index += 1;
  });
}

function addBookToLibrary(event) {
  const book = new Book(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    completedInput.checked,
  );
  myLibrary.push(book);
  displayBooks();
  titleInput.value = '';
  authorInput.value = '';
  pagesInput.value = '';
  completedInput.checked = false;
  formContainer.classList.toggle('form-container');
  event.preventDefault();
}

newBookButton.addEventListener('click', () => {
  formContainer.classList.toggle('form-container');
});

submitBookButton.addEventListener('click', addBookToLibrary, false);

myLibrary.push(new Book('The Hobbit', 'J.R.R. Tolkien', 227, true));
myLibrary.push(new Book('Fellowship of the Ring', 'J.R.R. Tolkien', 441, true));
myLibrary.push(new Book('Two Towers', 'J.R.R. Tolkien', 490, true));
myLibrary.push(new Book('Return of the King', 'J.R.R. Tolkien', 441, true));
myLibrary.push(new Book('Philosopher\'s Stone', 'J.K. Rollings', 310, true));
displayBooks();
