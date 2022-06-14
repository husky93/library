const addBookModal = document.querySelector('.modal-panel');
const modalBackdrop = document.querySelector('.modal-backdrop');
const modalPopupBtn = document.querySelector('button[data-modal-toggle]');
const modalCancelBtn = document.querySelector('.cancel');
const modalAddBtn = document.querySelector('.add');
const addBookForm = document.querySelector('.add-book-form');
const booksContainer = document.querySelector('.books');

let myLibrary = [];

addBookModal.addEventListener('click', e => e.stopPropagation());
modalPopupBtn.addEventListener('click', showModal);
modalBackdrop.addEventListener('click', hideModal);
modalCancelBtn.addEventListener('click', hideModal);
addBookForm.addEventListener('submit', addBookToLibrary);

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`;
    } 
}

function addBookToLibrary(e) {
    e.preventDefault();
    hideModal();
    const title = e.target.elements.title.value;
    const author = e.target.elements.author.value;
    const pages = parseInt(e.target.elements.pages.value);
    const read = e.target.elements.read.checked;

    myLibrary.push(new Book(title, author, pages, read));
    displayBooks();
}

function displayBooks() {
    myLibrary.forEach(book => {
        const card = document.createElement('div');
        const title = document.createElement('h5');
        const author = document.createElement('p');
        const pages = document.createElement('p');

        card.classList.add('block', 'p-6', 'max-w-sm', 'bg-white', 'rounded-lg', 'border', 'border-gray-200', 'shadow-md',
                                'hover:bg-gray-100', 'dark:bg-gray-800', 'dark:border-gray-700', 'dark:hover:bg-gray-700');
        title.classList.add('mb-1', 'text-2xl', 'font-bold', 'tracking-tight', 'text-gray-900', 'dark:text-white');
        author.classList.add('font-medium', 'mb-4', 'text-gray-700', 'dark:text-gray-400');
        pages.classList.add('text-sm', 'font-normal', 'text-gray-600', 'dark:text-gray-400');

        title.textContent = book.title;
        author.textContent = book.author;
        pages.textContent = `${book.pages} pages`;

        card.append(title, author, pages);

        if(book.read) {
            const container = document.createElement('div');
            const checkmark = document.createElement('ion-icon');
            const read = document.createElement('p');

            container.classList.add('flex', 'items-center');
            read.classList.add('text-sm', 'font-normal', 'text-gray-600', 'dark:text-gray-400');
            checkmark.classList.add('w-6', 'h-6', 'text-lime-600');

            checkmark.setAttribute('name', 'checkmark-outline');
            read.textContent = 'Read';

            container.append(checkmark, read);
            card.appendChild(container);
        }

        booksContainer.appendChild(card);
    })
}

function showModal() {
    modalBackdrop.classList.add('ease-out', 'duration-300', 'opacity-0');
    addBookModal.classList.add('ease-out', 'duration-300', 'opacity-0', 'sm:scale-95');
    modalBackdrop.classList.remove('hidden');
    addBookModal.classList.remove('hidden');
    setTimeout(() => {
        modalBackdrop.classList.add('opacity-100');
        addBookModal.classList.add('opacity-100', 'sm:scale-100');
    }, 200)
    setTimeout(() => {
        modalBackdrop.classList.remove('ease-out', 'duration-300', 'opacity-0', 'opacity-100');
        addBookModal.classList.remove('ease-out', 'duration-300', 'opacity-0', 'opacity-100', 'sm:scale-100', 'sm:scale-95');
    }, 500)
}

function hideModal() {
    modalBackdrop.classList.add('ease-in', 'duration-200');
    addBookModal.classList.add('ease-in', 'duration-200');
    setTimeout(() => {
    modalBackdrop.classList.add('opacity-0');
    addBookModal.classList.add('opacity-0', 'sm:scale-95');
    }, 200);
    setTimeout(() => {
        modalBackdrop.classList.remove('ease-in', 'duration-200', 'opacity-0');
        addBookModal.classList.remove('ease-in', 'duration-200', 'opacity-0', 'sm:scale-95');
        modalBackdrop.classList.add('hidden');
        addBookModal.classList.add('hidden');
    }, 500)
}