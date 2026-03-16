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
                <p class="a-author">${book.author}</p>
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

searchInput.addEventListener("input", () => {

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

// const likeButton = document.getElementById("likeButton");
// const favoritesContainer = document.getElementById("favoritesContainer");

// let favorites = [];

// likeButton.addEventListener("click", () => {

//     getBooks();
//     favorites.push(books);
//     renderFavorites();

// });

// function renderFavorites() {

//     favoritesContainer.innerHTML = "";

//     favorites.forEach((fav) => {
//         favoritesContainer.innerHTML += `
//             <div>
//                 <img src="${fav.src}" alt="${fav.name}" class="booksImage">
//                 <p class="booksName">${fav.name}</p>
//                 <p class="booksAuthor">${fav.author}, ${fav.publishedDate}</p>
//                 <p class="booksTags">${fav.tags.join(", ")}</p>
//                 <p class="booksPrice">${fav.price}${fav.currency}</p>
//             </div>
//         `;
//     });

// }

// -------------------------------------------------------------------------------------------------------------------------------------------
// SHOW BOOK DESCRIPTION

