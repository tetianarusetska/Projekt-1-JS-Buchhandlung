const descriptionContainer = document.getElementById("descriptionContainer");

const book = JSON.parse(localStorage.getItem("selectedBook"));

if (!book) throw new Error("No book found in localStorage");


// show book´s description
function showDescription() {

    if (book) {
        descriptionContainer.innerHTML = `
            <div class="description">
                <div><img src="${book.src}" alt="${book.name}" class="descriprion-image"></div>
                <div class="description-text">
                    <p class="description-name">${book.name}</p>
                    <p class="description-author">${book.author}, ${book.publishedDate}</p>
                    <p class="description-tags">${book.tags.join(",  ")}</p>
                    <p class="description-price">${book.price}${book.currency}</p>
                    <p class="description-summary">${book.summary}</p>
                    <p class="description-info">${book.info}</p>
                    <div class="description-actionButtons">
                        <button id="likeButton" class="description-like-Button">Auf die Merkliste</button>
                        <button id="cartButton" class="description-cart-Button">In den Warenkorb</button>
                    </div>
                </div>
            </div>
        `;
    }
}

showDescription();


// LIKE SYSTEM
const likeBtn = descriptionContainer.querySelector(".description-like-Button");
const cartBtn = descriptionContainer.querySelector(".description-cart-Button");

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


// CART SYSTEM
let cart = JSON.parse(localStorage.getItem("cart") || "[]");
if (cart.some(b => b.id === book.id)) cartBtn.classList.add("clicked");

cartBtn.addEventListener("click", () => {

    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (!cart.some(b => b.id === book.id)) {
        cart.push(book);
        cartBtn.classList.add("clicked");
    } else {
        cart = cart.filter(b => b.id !== book.id);
        cartBtn.classList.remove("clicked");
    }
    localStorage.setItem("cart", JSON.stringify(cart));

});



