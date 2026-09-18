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

function updateBooksPerPage() {
    booksPerPage =
        window.innerWidth >= 0 && window.innerWidth <= 1024
            ? 4
            : 9;
}

function renderPagination() {
    const pagination = document.querySelector(".roman-pagination");

    if (!pagination) return;

    const totalPages = Math.ceil(currentBooks.length / booksPerPage);

    pagination.innerHTML = "";

    const romanNumbers = [
        "I.", "II.", "III.", "IV.", "V.",
        "VI.", "VII.", "VIII.", "IX.", "X.",
        "XI.", "XII.", "XIII.", "XIV.", "XV.",
        "XVI.", "XVII.", "XVIII.", "XIX.", "XX.", "XXI", 
        "XXII", "XXIII", "XXIV"
    ];

    const pageTitles = [
        "Erste Seite",
        "Zweite Seite",
        "Dritte Seite",
        "Vierte Seite",
        "Fünfte Seite",
        "Sechste Seite",
        "Siebte Seite",
        "Achte Seite",
        "Neunte Seite",
        "Zehnte Seite",
        "Elfte Seite",
        "Zwölfte Seite",
        "Dreizehnte Seite",
        "Vierzehnte Seite",
        "Fünfzehnte Seite",
        "Sechzehnte Seite",
        "Siebzente Seite",
        "Achtzente Seite",
        "Neunzente Seite",
        "Zwanzigste Seite",
        "Einundzwanzigste Seite",
        "Zweiundzwanzigste Seite",
        "Dreiundzwanzigste Seite",
        "Vierundzwanzigste Seite",
    ];

    // Welche Seiten anzeigen
    const pages = [];

    if (totalPages <= 7) {
        // Если страниц мало — показываем все
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    } else {
        // Всегда первая страница
        pages.push(1);

        if (currentPage > 4) {
            pages.push("...");
        }

        // Страницы вокруг текущей
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (currentPage < totalPages - 3) {
            pages.push("...");
        }

        // Всегда последняя
        pages.push(totalPages);
    }

    pages.forEach(page => {
        // Троеточие
        if (page === "...") {
            const dots = document.createElement("span");
            dots.className = "pagination-dots";
            dots.textContent = "...";
            pagination.appendChild(dots);
            return;
        }

        const label = document.createElement("label");
        label.className = "roman-radio";

        label.innerHTML = `
            <input 
                type="radio" 
                name="radioName"
                ${page === currentPage ? "checked" : ""}
            >
            <span class="num">
                ${romanNumbers[page - 1] || page + "."}
            </span>
            <span class="title">
                ${pageTitles[page - 1] || `Seite ${page}`}
            </span>
        `;

        label.querySelector("input").addEventListener("click", () => {
            changePage(page);
        });

        pagination.appendChild(label);
    });
}


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

    updateBooksPerPage();

    const totalPages = Math.ceil(currentBooks.length / booksPerPage);

    if (currentPage > totalPages) {
        currentPage = 1;
    }

    renderBooks();

    renderPagination();

    const pageBooks = getPageBooks();

    addLike(pageWithBooks, pageBooks);
    addToCart(pageWithBooks, pageBooks);
    showBooksDescription(pageWithBooks, pageBooks, ".book");
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
            window.location.href = "./mainHTML/bookpage.html";   // Navigate to the book detail page
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
