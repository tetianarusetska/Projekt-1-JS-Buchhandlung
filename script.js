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
        currency: "€",
        summary: "Gesamtkatalog der Werke von Egon Schiele, mit über 600 Illustrationen, Essays über sein Leben und Werk sowie Schieles persönlichen Schriften.",
        info: "Hardcover, 25 x 34 cm, 3.88 kg, 608 Seiten"
    },
    {
        src: "assets/images/books/dali11.png",
        name: "Dalí. BABY SUMO",
        author: "Hans Werner Holzwarth",
        publishedDate: 2018,
        tags: ["Surrealismus", "Sammleredition", "Kunstgeschichte"],
        price: 1000,
        currency: "€",
        summary: "Salvador Dalí, einer der Titanen der modernen Malerei, ist der Inbegriff des surrealistischen Künstlers, war aber auch Performer, Designer und Visionär. Diese Publikation präsentiert sein Werk in beispiellosem Format und Detailreichtum, mit einer Chronologie, die mit Fotos, Skizzen und Magazinseiten seinen Weg von Katalonien über Paris nach Hollywood und zurück nach Hause dokumentiert.",
        info: "Hardcover, 36,7 x 50 cm, 438 Seiten; mit Goldschnitt, Ausklappseiten, Goldprägung auf Titel- und Kapitelseiten, sowie einem 40-seitigen Begleitheft mit Abbildungsverzeichnis, 22 x 28,9 cm; in einer Clamshell-Box, 41 x 56,2 cm, gebunden in schwarzem Samt mit Goldfolienprägung und Tip-In; plus Chronologie mit Leineneinband, 22 x 28,9 cm, 624 Seiten; Gesamtgewicht 16 kg"
    },
    {
        src: "assets/images/books/baskia11.png",
        name: "Jean-Michel Basquiat",
        author: "Hans Werner Holzwarth",
        publishedDate: 2010,
        tags: ["Surreale Kunst", "Neoexpressionismus", "Street-Art-Geschichte"],
        price: 175,
        currency: "€",
        summary: "Umfassender Überblick über Jean-Michel Basquiats Werk, von frühen Zeichnungen über Graffiti-Phasen bis zu den wichtigsten Gemälden der Neoexpressionismus-Bewegung.",
        info: "Hardcover, 28 x 36 cm, 2.2 kg, 240 Seiten"
    },
    {
        src: "assets/images/books/holler11.png",
        name: "Carsten Höller. Book of Games",
        author: "Carsten Höller",
        publishedDate: 2015,
        tags: ["Konzeptkunst", "Spiel & Wahrnehmung", "Interaktive Experimente"],
        price: 120,
        currency: "€",
        summary: "Carsten Höller lädt zu 336 herrlich absurden Gedankenspielen ein. Jeder kann jederzeit antreten, allein oder in der Gruppe und ohne jegliches Material. Höller erklärt die Regeln, während Werke von Künstlern wie August Sander, Rineke Dijkstra und Salvador Dalí illustrieren, wie man spielerisch aus seiner Komfortzone tritt.",
        info: "Hardcover, 17 x 22.1 cm, 1.63 kg, 760 Seiten"
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

    const allBooks = document.querySelectorAll(".a-book");
    allBooks.forEach((bookEl, index) => {
        bookEl.addEventListener("click", () => {
            const book = artBooks[index];
            localStorage.setItem("selectedBook", JSON.stringify(book));
            window.location.href = "bookpage.html";
        });
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
                    <button class="like-Button"></button>
                    <button id="cardButton" class="card-Button"></button>
                </div>
            </div>
        `;
    });

    document.querySelectorAll(".like-Button").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            saveFavorite(pageBooks[index]);
        });
    });

    const allBooks = document.querySelectorAll(".book");
    allBooks.forEach((bookEl, index) => {
        bookEl.addEventListener("click", () => {
            const book = pageBooks[index];
            localStorage.setItem("selectedBook", JSON.stringify(book));
            window.location.href = "bookpage.html";
        });
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

const favoritesString = localStorage.getItem("favorites");

if (!favoritesString) {
    localStorage.setItem("favorites", JSON.stringify([]));
} else {
    favorites = JSON.parse(favoritesString);
}

function saveFavorite(book) {

    console.log(book);
    console.log(favorites);

    let favorites = JSON.parse(localStorage.getItem("favorites"));

    if (!favorites.some(b => b.id === book.id)) {
        favorites.push(book);
    } else {
        favorites = favorites.filter(b => b.id !== book.id);
    }
    
    console.log(favorites);
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

// -------------------------------------------------------------------------------------------------------------------------------------------
// SHOW BOOK DESCRIPTION

// const allBooks = document.querySelectorAll(".book, .a-book");

// allBooks.forEach((bookEl) => {

//     bookEl.addEventListener("click", () => {

//         window.open("bookpage.html");

//     });
// });



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