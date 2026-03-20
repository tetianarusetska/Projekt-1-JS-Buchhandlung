const favoritesContainer = document.getElementById("favorites-container");

const favorites = JSON.parse(localStorage.getItem("favorites"));
console.log(favorites);

generateFavorites();

function generateFavorites() {

    favorites.forEach((book) => {
        favoritesContainer.innerHTML += `<div class="book">
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

    favoritesContainer.querySelectorAll(".like-Button").forEach((btn, index) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const bookId = favorites[index].id;
            favorites = favorites.filter(book => book.id !== bookId);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            generateFavorites();
        });
    });
}
