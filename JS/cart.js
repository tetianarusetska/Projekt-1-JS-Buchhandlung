const cartContainer = document.getElementById("cart-container");

let cart = JSON.parse(localStorage.getItem("cart") || "[]");
console.log(cart);

generateCart();

function generateCart() {

    if (!cart || cart.length === 0) {
        cartContainer.innerHTML = `<p class="noBooks">Keine Bücher</p>`;
        return;
    }

    cartContainer.innerHTML = cart.map((book) => `
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

    cartContainer.querySelectorAll(".card-Button").forEach((btn, index) => {

        btn.classList.add("clicked");
        
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const bookId = cart[index].id;
            cart = cart.filter(book => book.id !== bookId);
            localStorage.setItem("cart", JSON.stringify(cart));
            generateCart();
        });
    });
}


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