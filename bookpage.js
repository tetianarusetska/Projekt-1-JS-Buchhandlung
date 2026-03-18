const descriptionContainer = document.getElementById("descriptionContainer");

showDescription();

function showDescription() {


    allBooks.forEach((bookEl) => {
        descriptionContainer.innerHTML = `
        <div class="description">
            <img src=${bookEl.src} alt=${bookEl.name} class="descriprion-image">
            <p>
            <p class="description-name">${bookEl.name}</p>
            <p class="description-author">${bookEl.author}, ${bookEl.publishedDate}</p>
                <p class="description-tags">${bookEl.tags.join(",  ")}</p>
                <p class="description-price">${bookEl.price}${bookEl.currency}</p>
                <div class="description-actionButtons">
                    <button id="likeButton" class="description-like-Button"></button>
                    <button id="cardButton" class="description-card-Button"></button>
                </div>
        </div>
        `;
    });
}


