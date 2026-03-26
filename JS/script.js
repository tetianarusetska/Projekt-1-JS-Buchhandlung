const artBooks = [
    {
        id: 96,
        src: "/assets/images/books/schiele11.png",
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
        id: 97,
        src: "/assets/images/books/dali11.png",
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
        id: 98,
        src: "/assets/images/books/baskia11.png",
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
        id: 99,
        src: "/assets/images/books/holler11.png",
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

// -------------------------------------------------------------------------------------------------------------------------------------------
// SHOW ART BOOKS

const artBooksEl = document.getElementById("artBooks");


// show art books

function showArtBooks() {

    artBooksEl.innerHTML = artBooks.map(book => `
        <div class="a-book">
            <img class="a-booksImage" src="${book.src}">
            <p class="a-name">${book.name}</p>
            <p class="a-author">${book.author}, ${book.publishedDate}</p>
            <p class="a-tags">${book.tags.join(",  ")}</p>
            <p class="a-price">${book.price}${book.currency}</p>
            <div class="actionButtons">
                <button id="likeButton" class="like-Button"></button>
                <button id="cartButton" class="cart-Button"></button>
            </div>
        </div>
    `).join("");

}

function initArtBooks() {

    showArtBooks();

    addLike(artBooksEl, artBooks);                           //like
    addToCart(artBooksEl, artBooks);                         // cart
    showBooksDescription(artBooksEl, artBooks, ".a-book");   //book´s description
        
}

if (artBooksEl) {
    initArtBooks();
}


// -------------------------------------------------------------------------------------------------------------------------------------------
// SHOW SECTION 3 - ALL BOOKS


const pageWithBooks = document.getElementById("pageWithBooks");

let books = [];            // Array to store all books fetched from JSON
let currentBooks = [];     // Array to store currently filtered/active books

let currentPage = 1;
let booksPerPage = 9;


// get books

async function getBooks() {

    const response = await fetch("/books.json");
    books = await response.json();

    currentBooks = books;   // Set currentBooks to full list initially

    console.log(books);

    initAllBooks(); 

}


if (pageWithBooks) {
    getBooks();
}


// show all books

function renderBooks() {

    const pageBooks = getPageBooks();     // Nur Bücher für aktuelle Seite holen

    pageWithBooks.innerHTML = pageBooks.map(book => `
        <div class="book">
            <img src="${book.src}" alt="${book.name}" class="booksImage">
            <p class="booksName">${book.name}</p>
            <p class="booksAuthor">${book.author}, ${book.publishedDate}</p>
            <p class="booksTags">${book.tags.join(", ")}</p>
            <p class="booksPrice">${book.price}${book.currency}</p>
            <div class="actionButtons">
                <button class="like-Button"></button>
                <button class="cart-Button"></button>
            </div>
        </div>
    `).join("");

}


function initAllBooks() {

    renderBooks();

    const pageBooks = getPageBooks();                          // Get current page books for event binding

    addLike(pageWithBooks, pageBooks);                         //like
    addToCart(pageWithBooks, pageBooks);                       //cart
    showBooksDescription(pageWithBooks, pageBooks, ".book");   //book´s description
}

// ---------------------------------------------------------------------------------------------------------------------------------------------
// FILTER(CATEGORISATION) + PAGINATION
// mit StackOverflow Hilfe...


// fliter(categorisation)
// Filter books by category and reset to page 1

function filterBooks(category) {

    currentPage = 1;

    currentBooks = books.filter(book =>
        book.category.toLowerCase() === category.toLowerCase()
    );

    initAllBooks();           //Re-render with filtered results
}


// change to a specific page and re-render
function changePage(page) {

    currentPage = page;
    initAllBooks();

}


// ----------------------------------------------------------------------------------------------------------------------------------------------
// PAGINATION


// Return the slice of books for the current page
function getPageBooks() {

    const start = (currentPage - 1) * booksPerPage;
    const end = start + booksPerPage;
    return currentBooks.slice(start, end);

}

// -------------------------------------------------------------------------------------------------------------------------------------------
// LIKE SYSTEM

function addLike(container, booksArray) {

    container.querySelectorAll(".like-Button").forEach((btn, index) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            btn.classList.toggle("liked");
            saveFavorite(booksArray[index]);      // Save/remove from favorites
        });
    });

}

// -------------------------------------------------------------------------------------------------------------------------------------------
// CART SYSTEM

function addToCart(container, booksArray) {

    container.querySelectorAll(".cart-Button").forEach((btn, index) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            btn.classList.toggle("clicked");
            buyBooks(booksArray[index]);      // Add/remove from cart
        });
    });

}

// -------------------------------------------------------------------------------------------------------------------------------------------
// SHOW BOOK´S DESCRIPTION(BOOK´S PAGE) SYSTEM

function showBooksDescription(container, booksArray, bookClass) {

    container.querySelectorAll(bookClass).forEach((el, index) => {
        el.addEventListener("click", () => {
            localStorage.setItem("selectedBook", JSON.stringify(booksArray[index]));  // Save selected book data to localStorage
            window.location.href = "bookpage.html";   // Navigate to the book detail page
        });
    });

}


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


    if (!favorites.some(b => b.id === book.id)) {  // If book not in favorites, add it
        favorites.push(book);
    } else {
        favorites = favorites.filter(b => b.id !== book.id); // Otherwise remove it from favorites
    }

    console.log(favorites);
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

// -------------------------------------------------------------------------------------------------------------------------------------------
// CART SYSTEM


let  cart = [];

const cartString = localStorage.getItem("cart");

if (!cartString) {
    localStorage.setItem("cart", JSON.stringify([]));
} else {
    cart = JSON.parse(cartString);
}

function buyBooks(book) {

    console.log(book);
    console.log(cart);


    if (!cart.some(b => b.id === book.id)) {
        cart.push(book);
    } else {
        cart = cart.filter(b => b.id !== book.id);
    }

    console.log(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
}



// -------------------------------------------------------------------------------------------------------------------------------------------
// DECORATION - ANIMATION

const textPath = document.querySelector("#animatedText textPath");
const textEl = document.getElementById("animatedText");

if (textEl && textPath) {
    textEl.setAttribute("fill", "red");

    let offset = 0;
    const speed = 0.2;

    function animate() {
        offset += speed;
        if (offset > 100) offset = 0;
        textPath.setAttribute("startOffset", offset + "%");
        requestAnimationFrame(animate);
    }

    animate();
}


// -------------------------------------------------------------------------------------------------------------------------------------------
// RESPONSIVE DESIGN

const icon = document.getElementById("threedots");
const menu = document.getElementById("menu-1");


document.addEventListener("click", () => {
        icon.addEventListener("click", () => {
            menu.style.display = "block";
        });
});