const favoritesContainer = document.getElementById("favorites-container");

let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
console.log(favorites);

generateFavorites();

function generateFavorites() {

    if (!favorites || favorites.length === 0) {
        favoritesContainer.innerHTML = `<p class="noBooks">Keine Bücher</p>`;
        return;
    }

    favoritesContainer.innerHTML = favorites.map((book) => `
            <div class="book">
                <img src="${book.src}" alt="${book.name}" class="booksImage">
                <p class="booksName">${book.name}</p>
                <p class="booksAuthor">${book.author}, ${book.publishedDate}</p>
                <p class="booksTags">${book.tags.join(", ")}</p>
                <p class="booksPrice">${book.price}${book.currency}</p>
                <div class="actionButtons">
                    <button class="like-Button"></button>
                    <button id="cartButton" class="cart-Button"></button>
                </div>
            </div>
     `).join("");

    favoritesContainer.querySelectorAll(".like-Button").forEach((btn, index) => {

        btn.classList.add("liked");
        
        btn.addEventListener("click", (e) => {

            e.stopPropagation();
            const bookId = favorites[index].id;   // Get the id of the clicked book
            favorites = favorites.filter(book => book.id !== bookId);    // Remove book from favorites array
            localStorage.setItem("favorites", JSON.stringify(favorites));  // Save updated favorites to localStorage
            generateFavorites();  // Re-render the favorites

        });
    });
}

