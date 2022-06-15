const addBookModal = document.querySelector('.modal-panel');
const modalBackdrop = document.querySelector('.modal-backdrop');
const modalPopupBtn = document.querySelector('button[data-modal-toggle]');
const modalCancelBtn = document.querySelector('.cancel');
const modalAddBtn = document.querySelector('.add');
const addBookForm = document.querySelector('.add-book-form');
const booksContainer = document.querySelector('.books');
const deleteButtons = document.querySelectorAll('.close');

let myLibrary = [];

addBookModal.addEventListener('click', e => e.stopPropagation());
modalPopupBtn.addEventListener('click', showModal);
modalBackdrop.addEventListener('click', hideModal);
modalCancelBtn.addEventListener('click', hideModal);
addBookForm.addEventListener('submit', e => {
    addBookToLibrary(e);
    displayBooks();
});

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
}

function deleteBook(e) {
    const book = e.target.parentNode.parentNode;
    const index = book.dataset.index;

    myLibrary.splice(index, 1);

    displayBooks()
}

function displayBooks() {
    let myLibraryDOM = [];
    let index = 0;

    myLibrary.forEach(book => {
        const card = document.createElement('div');
        const title = document.createElement('h5');
        const author = document.createElement('p');
        const pages = document.createElement('p');
        const close = document.createElement('a');
        const closeIcon = document.createElement('ion-icon');
        const readContainer = document.createElement('div');
        const toggler = book.read ? createToggleInput(index, true) : createToggleInput(index, false);

        card.classList.add('relative', 'block', 'p-6', 'max-w-sm', 'bg-white', 'rounded-lg', 'border', 'border-gray-200', 'shadow-md',
                                'hover:bg-gray-100', 'dark:bg-gray-800', 'dark:border-gray-700', 'dark:hover:bg-gray-700');
        close.classList.add('absolute', 'top-2', 'right-1', 'cursor-pointer', 'close')
        closeIcon.classList.add('w-5','h-5');
        title.classList.add('mb-1', 'text-2xl', 'font-bold', 'tracking-tight', 'text-gray-900', 'dark:text-white');
        author.classList.add('font-medium', 'mb-6', 'text-gray-700', 'dark:text-gray-400');
        pages.classList.add('text-sm', 'font-normal', 'text-gray-600', 'dark:text-gray-400');
        readContainer.classList.add('flex', 'items-center', 'mt-2');

        closeIcon.setAttribute('name', 'close-outline');
        card.setAttribute('data-index', index);

        title.textContent = book.title;
        author.textContent = book.author;
        pages.textContent = `${book.pages} pages`;

        close.appendChild(closeIcon);
        card.append(close, title, author, pages, readContainer, toggler);

        close.addEventListener('click', deleteBook);
        toggler.addEventListener('change', changeReadStatus)

        if(book.read) {
            addReadCheckmark(readContainer);
        } else {
            readContainer.setAttribute('data-read', false);
        }

        myLibraryDOM.push(card);
        index++;
    })
    booksContainer.replaceChildren(...myLibraryDOM);
}

function addReadCheckmark(parentNode) {
    const checkmark = document.createElement('ion-icon');
    const read = document.createElement('p');
    read.classList.add('text-sm', 'font-normal', 'text-gray-600', 'dark:text-gray-400');
    checkmark.classList.add('w-6', 'h-6', 'text-lime-600');
    checkmark.setAttribute('name', 'checkmark-outline');
    read.textContent = 'Read';
    parentNode.append(checkmark, read);
    parentNode.setAttribute('data-read', true);
}

function removeCheckmark(parentNode) {
    while(parentNode.firstChild) {
        parentNode.removeChild(parentNode.lastChild);
    }
}

function createToggleInput(index, read) {
    const toggler = document.createElement('label');
    const input = document.createElement('input');
    const dot = document.createElement('div');
    const label = document.createElement('span');

    toggler.classList.add('inline-flex', 'relative', 'items-center', 'mt-4', 'cursor-pointer');
    input.classList.add('sr-only', 'peer');
    dot.classList.add('w-9', 'h-5', 'bg-gray-200', 'peer-focus:outline-none', 'rounded-full', 
                        'peer', 'dark:bg-gray-700', 'peer-checked:after:translate-x-full', 'peer-checked:after:border-white', `after:content-['']`, 
                        'after:absolute', 'after:top-[2px]', 'after:left-[2px]', 'after:bg-white', 'after:border-gray-300', 'after:border', 'after:rounded-full',
                        'after:h-4', 'after:w-4', 'after:transition-all', 'dark:border-gray-600', 'peer-checked:bg-blue-600')
    label.classList.add('text-sm', 'font-normal', 'text-gray-600', 'dark:text-gray-400', 'ml-2');

    toggler.setAttribute('data-index', index);
    toggler.setAttribute('for', `toggler-${index}`);
    input.setAttribute('type', 'checkbox');
    input.setAttribute('id', `toggler-${index}`);
    if(read) {
        input.checked = true;
    }

    label.textContent = 'Change read status';

    toggler.append(input, dot, label);

    return toggler;
}

function changeReadStatus(e) {
    const index = e.target.parentNode.dataset.index;
    const readContainer = document.querySelector(`div[data-index="${index}"] div[data-read]`);

    if(e.target.checked) {
        myLibrary[index].read = true;
        addReadCheckmark(readContainer);
    } else {
        myLibrary[index].read = false;
        removeCheckmark(readContainer);
    }
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