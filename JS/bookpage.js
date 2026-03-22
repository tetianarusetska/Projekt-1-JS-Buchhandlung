const descriptionContainer = document.getElementById("descriptionContainer");

const book = JSON.parse(localStorage.getItem("selectedBook"));



function showDescription() {

    if (book) {
        descriptionContainer.innerHTML = `
            <div class="description">
                <div><img src=${book.src} alt=${book.name} class="descriprion-image"></div>
                <div class="description-text">
                    <p class="description-name">${book.name}</p>
                    <p class="description-author">${book.author}, ${book.publishedDate}</p>
                    <p class="description-tags">${book.tags.join(",  ")}</p>
                    <p class="description-price">${book.price}${book.currency}</p>
                    <p class="description-summary">${book.summary}</p>
                    <p class="description-info">${book.info}</p>
                    <div class="description-actionButtons">
                        <button id="likeButton" class="description-like-Button">Auf die Merkliste</button>
                        <button id="cardButton" class="description-card-Button">In den Warenkorb</button>
                    </div>
                </div>
            </div>
        `;
    }
}

showDescription();

const likeBtn = descriptionContainer.querySelector(".description-like-Button");
const cardBtn = descriptionContainer.querySelector(".description-card-Button");

let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
if (favorites.some(b => b.id === book.id)) likeBtn.classList.add("liked");

likeBtn.addEventListener("click", () => {
    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (!favorites.some(b => b.id === book.id)) {
        favorites.push(book);
        likeBtn.classList.add("liked");
    } else {
        favorites = favorites.filter(b => b.id !== book.id);
        likeBtn.classList.remove("liked");
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
});

let cart = JSON.parse(localStorage.getItem("cart") || "[]");
if (cart.some(b => b.id === book.id)) cardBtn.classList.add("clicked");

cardBtn.addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (!cart.some(b => b.id === book.id)) {
        cart.push(book);
        cardBtn.classList.add("clicked");
    } else {
        cart = cart.filter(b => b.id !== book.id);
        cardBtn.classList.remove("clicked");
    }
    localStorage.setItem("cart", JSON.stringify(cart));
});


const searchButton = document.getElementById("searchIcon");
const searchContainer = document.getElementById("searchContainer");
const searchInput = document.querySelector("#searchContainer input");

if (searchButton && searchInput) {
    searchButton.addEventListener("click", () => {
        searchContainer.classList.toggle('active');
    });

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        favorites = allFavorites.filter(book =>
            book.name.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query) ||
            book.tags.some(tag => tag.toLowerCase().includes(query))
        );
        generateFavorites();
    });
}


