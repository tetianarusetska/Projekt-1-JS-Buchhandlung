// -------------------------------------------------------------------------------------------------------------------------------------------
// SHOW SECTION 2 = ART BOOKS

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

const artBooksElement = document.getElementById("artBooks");

function showArtBooks() {

    artBooksElement.innerHTML = artBooks.map(book => `
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
    `).join("");

    artBooksElement.querySelectorAll(".like-Button").forEach((btn, index) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            btn.classList.toggle("liked");
            saveFavorite(artBooks[index]);
        });
    });

    artBooksElement.querySelectorAll(".card-Button").forEach((btn, index) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            btn.classList.toggle("clicked");
            buyBooks(artBooks[index]);
        });
    });

    artBooksElement.querySelectorAll(".a-book").forEach((bookEl, index) => {
        bookEl.addEventListener("click", () => {
            const book = artBooks[index];
            localStorage.setItem("selectedBook", JSON.stringify(book));
            window.location.href = "bookpage.html";
        });
    });
}

if (artBooksElement) {
    showArtBooks();
}


// -------------------------------------------------------------------------------------------------------------------------------------------
// SHOW SECTION 3 - ALL BOOKS
// + PAGINATION, CATEGORISATION

const pageWithBooks = document.getElementById("pageWithBooks");


let books = [];
let currentBooks = [];

let currentPage = 1;
let booksPerPage = 9;



async function getBooks() {

    const response = await fetch("/books.json")
    books = await response.json();

    currentBooks = books;

    console.log(books);
    renderBooks(books);
}

if (pageWithBooks) {
    getBooks();
}



function renderBooks() {

    pageWithBooks.innerHTML = "";

    const start = (currentPage - 1) * booksPerPage;
    const end = start + booksPerPage;
    const pageBooks = currentBooks.slice(start, end);

    pageWithBooks.innerHTML = pageBooks.map(book => `
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
    `).join("");

    pageWithBooks.querySelectorAll(".like-Button").forEach((btn, index) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            btn.classList.toggle("liked");
            saveFavorite(pageBooks[index]);
        });
    });

    pageWithBooks.querySelectorAll(".card-Button").forEach((btn, index) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            btn.classList.toggle("clicked");
            buyBooks(pageBooks[index]);
        });
    });

    pageWithBooks.querySelectorAll(".book").forEach((bookEl, index) => {
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

// searchButton.addEventListener("click", () => {
//     searchContainer.classList.toggle('active');
// });

// searchInput.addEventListener("input", (e) => {

//     e.preventDefault();

//     const query = searchInput.value.toLowerCase();

//     currentBooks = books.filter(book =>
//         book.name.toLowerCase().includes(query) ||
//         book.author.toLowerCase().includes(query) ||
//         book.tags.some(tag => tag.toLowerCase().includes(query))
//     );

//     currentPage = 1;
//     renderBooks();

// });

if (searchButton && searchInput) {

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


    if (!favorites.some(b => b.id === book.id)) {
        favorites.push(book);
    } else {
        favorites = favorites.filter(b => b.id !== book.id);
    }

    console.log(favorites);
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

// -------------------------------------------------------------------------------------------------------------------------------------------
// CARt SYSTEM


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