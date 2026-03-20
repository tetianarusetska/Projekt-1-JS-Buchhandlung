const descriptionContainer = document.getElementById("descriptionContainer");

const book = JSON.parse(localStorage.getItem("selectedBook"));

showDescription();

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


