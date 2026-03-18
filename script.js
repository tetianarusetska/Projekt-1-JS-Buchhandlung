// -------------------------------------------------------------------------------------------------------------------------------------------
// SHOW SECTION 2 = ART BOOKS

const artBooks = [
    {
        src: "assets/images/books/schiele11.png",
        name: "Egon Schiele Werkverzeichnis",
        author: "Rudolf Leopold",
        publishedDate: 1990,
        tags: ["Gemälde", "Aquarelle", "Zeichnungen"],
        price: 100,
        currency: "€"
    },
    {
        src: "assets/images/books/dali11.png",
        name: "Dalí. BABY SUMO",
        author: "Hans Werner Holzwarth",
        publishedDate: 2011,
        tags: ["Surrealismus", "Sammleredition", "Kunstgeschichte"],
        price: 1000,
        currency: "€"
    },
    {
        src: "assets/images/books/baskia11.png",
        name: "Jean-Michel Basquiat",
        author: "Hans Werner Holzwarth",
        publishedDate: 2010,
        tags: ["Surreale Kunst", "Neoexpressionismus", "Street-Art-Geschichte"],
        price: 175,
        currency: "€"
    },
    {
        src: "assets/images/books/holler11.png",
        name: "Carsten Höller. Book of Games",
        author: "Carsten Höller",
        publishedDate: 2015,
        tags: ["Konzeptkunst", "Spiel & Wahrnehmung", "Interaktive Experimente"],
        price: 120,
        currency: "€"
    }
];

const artBooksElement = document.getElementById("artBooks");

function showArtBooks() {

    artBooksElement.innerHTML = "";

    artBooks.forEach((book) => {
        artBooksElement.innerHTML += `
            <div class="a-book">
                <img class="a-booksImage" src="${book.src}">
                <p class="a-name">${book.name}</p>
                <p class="a-author">${book.author}, ${book.publishedDate}</p>
                <p class="a-tags">${book.tags.join(",  ")}</p>
                <p class="a-price">${book.price}${book.currency}</p>
                <div class="actionButtons">
                    <button id="likeButton" class="like-Button"></button>
                    <button id="cardButton" class="card-Button"></button>
                </div>
             </div>
        `;
    });
}

showArtBooks();


// -------------------------------------------------------------------------------------------------------------------------------------------
// SECTION 3 
// SHOW AND FILTER ALL BOOKS

const pageWithBooks = document.getElementById("pageWithBooks");


let books = [];
let currentBooks = [];

let currentPage = 1;
let booksPerPage = 9;

async function getBooks() {

    const response = await fetch("books.json");
    books = await response.json();

    currentBooks = books;

    console.log(books);
    renderBooks(books);
}

getBooks();

function renderBooks() {

    pageWithBooks.innerHTML = "";

    const start = (currentPage - 1) * booksPerPage;
    const end = start + booksPerPage;
    const pageBooks = currentBooks.slice(start, end);

    pageBooks.forEach(book => {
        pageWithBooks.innerHTML += `
            <div class="book">
                <img src="${book.src}" alt="${book.name}" class="booksImage">
                <p class="booksName">${book.name}</p>
                <p class="booksAuthor">${book.author}, ${book.publishedDate}</p>
                <p class="booksTags">${book.tags.join(", ")}</p>
                <p class="booksPrice">${book.price}${book.currency}</p>
                <div class="actionButtons">
                    <button id="likeButton" class="like-Button"></button>
                    <button id="cardButton" class="card-Button"></button>
                </div>
            </div>
        `;
    });
}

function filterBooks(category) {

    currentPage = 1;

    currentBooks = books.filter(book =>
        book.category.toLowerCase() === category.toLowerCase()
    );

    renderBooks();
}

function changePage(page) {

    currentPage = page;
    renderBooks();
}

// -------------------------------------------------------------------------------------------------------------------------------------------
// SEARCH

const searchButton = document.getElementById("searchIcon");
const searchContainer = document.getElementById("searchContainer");
const searchInput = document.querySelector("#searchContainer input");

searchButton.addEventListener("click", () => {
    searchContainer.classList.toggle('active');
});

searchInput.addEventListener("input", (e) => {

    e.preventDefault();

    const query = searchInput.value.toLowerCase();

    currentBooks = books.filter(book =>
        book.name.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.tags.some(tag => tag.toLowerCase().includes(query))
    );

    currentPage = 1;
    renderBooks();

});

// -------------------------------------------------------------------------------------------------------------------------------------------
// LIKE SYSTEM

let favorites = [];





// -------------------------------------------------------------------------------------------------------------------------------------------
// SHOW BOOK DESCRIPTION

const allBooks = document.querySelectorAll(".book, .a-book");

allBooks.forEach((bookEl) => {

    bookEl.addEventListener("click", () => {

        window.open("bookpage.html");

    });
});



// -------------------------------------------------------------------------------------------------------------------------------------------
// NEUE START MIT API

// const pageWithBooks = document.getElementById("pageWithBooks");

// async function getBooks(query) {

//     const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
//     const data = await response.json();

//     console.log(data);
//     renderBooks(data);

// }

// getBooks("love");

// function renderBooks(data) {
//     pageWithBooks.innerHTML = "";

//     data.docs.forEach(book => {
//         if (!book.title || !book.first_publish_year || !book.cover_i) return;

//         const coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
//         const authors = book.author_name ? book.author_name.join(", ") : "Неизвестно";

//         pageWithBooks.innerHTML += `
//             <div class="book">
//                 <img src="${coverUrl}" alt="${book.title}" class="booksImage">
//                 <p class="booksName">${book.title}</p>
//                 <p class="booksAuthor">${authors}, ${book.first_publish_year}</p>
//                 <div class="actionButtons">
//                     <button class="like-Button"></button>
//                     <button class="card-Button"></button>
//                 </div>
//             </div>
//         `;
//     });
// }