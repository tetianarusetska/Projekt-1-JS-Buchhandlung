const cartContainer = document.getElementById("cart-container");

let cart = JSON.parse(localStorage.getItem("cart") || "[]");

generateCart();


// Function to render all books currently in the cart
function generateCart() {

    if (!cart || cart.length === 0) {
        cartContainer.innerHTML = `<p class="noBooks">Keine Bücher</p>`;
        document.getElementById("cart-box").innerHTML = `<p class="booksSum">Gesamt: 0€</p>`;
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
                <button id="likeButton" class="like-Button"></button>
                <button id="cartButton" class="cart-Button"></button>
            </div>
        </div>
    `).join("");

    cartContainer.querySelectorAll(".cart-Button").forEach((btn, index) => {

        btn.classList.add("clicked");

        btn.addEventListener("click", (e) => {

            e.stopPropagation();
            const bookId = cart[index].id;   // Get the id of the clicked book
            cart = cart.filter(book => book.id !== bookId);   // Remove book from cart array
            localStorage.setItem("cart", JSON.stringify(cart));  // Save updated cart to localStorage
            generateCart();  // Re-render the cart

        });
    });

    // MY CART:
    // Medium article...
    const sum = cart.reduce((acc, book) => acc + parseFloat(book.price), 0);
    document.getElementById("cart-box").innerHTML = `
                                                    <p class="booksCount">${cart.length} Artikel</p>
                                                    <p class="booksSum">Gesamt: ${sum.toFixed(2)} €</p>
                                                    `;

}

// LOADER

const button = document.getElementById('accept-button');
const loader = document.getElementById('loader');

button.addEventListener('click', () => {
    loader.classList.add('active');

    setTimeout(() => {
        loader.classList.remove('active');
        alert("Bestellung abgeschlossen! ✅");
    }, 2000);

});



