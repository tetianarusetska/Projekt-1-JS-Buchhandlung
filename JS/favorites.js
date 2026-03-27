const favoritesContainer = document.getElementById("favorites-container");
const likeContainer = document.getElementById("likeContainer");

let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
console.log(favorites);

generateFavorites();


function generateFavorites() {

    if (!favorites || favorites.length === 0) {
        if (favoritesContainer) favoritesContainer.innerHTML = `<p class="noBooks">Keine Bücher</p>`;
        if (likeContainer) likeContainer.innerHTML = `<p class="noBooks">Keine Bücher</p>`;
        return;
    }

    // merkzettel: show merkzettel
    if (favoritesContainer) {
        renderBooks(favoritesContainer, favorites);
        initLikeButtons(favoritesContainer);
    }

    // profile page: show merkzettel 
    if (likeContainer) {
        renderBooks(likeContainer, favorites);
        initLikeButtons(likeContainer);  
    }

}

// handler for like buttons
function initLikeButtons(container) {
    container.querySelectorAll(".like-Button").forEach((btn, index) => {

        btn.classList.add("liked");

        btn.addEventListener("click", (e) => {

            e.stopPropagation();
            const bookId = favorites[index].id;                               // Get the id of the clicked book
            favorites = favorites.filter(book => book.id !== bookId);        // Remove book from favorites array
            localStorage.setItem("favorites", JSON.stringify(favorites));   // Save updated favorites to localStorage
            generateFavorites();                                           // Re-render the favorites

        });
    });
}


// show books in merkzettel
function renderBooks(container, books) {
    container.innerHTML = books.map((book) => `
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


