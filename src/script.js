const addBookModal = document.querySelector('.modal-panel');
const modalBackdrop = document.querySelector('.modal-backdrop');
const modalPopupBtn = document.querySelector('button[data-modal-toggle]');
const modalCancelBtn = document.querySelector('.cancel');

let myLibrary = [];

addBookModal.addEventListener('click', e => e.stopPropagation());
modalPopupBtn.addEventListener('click', showModal);
modalBackdrop.addEventListener('click', hideModal);
modalCancelBtn.addEventListener('click', hideModal);

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`;
    } 
}

function addBookToLibrary() {
    
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