const searchButton = document.getElementById("searchIcon");
const searchContainer = document.getElementById("searchContainer");
const searchInput = document.querySelector("#searchContainer input");

if (searchButton && searchInput) {

    searchButton.addEventListener("click", () => {
        searchContainer.classList.toggle('active');
    });

    // Filter books in real time as user types
    searchInput.addEventListener("input", (e) => {

        e.preventDefault();

        const query = searchInput.value.toLowerCase();

        // Filter books matching query in name, author or tags
        currentBooks = books.filter(book =>
            book.name.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query) ||
            book.tags.some(tag => tag.toLowerCase().includes(query))
        );

        currentPage = 1;   // Reset to first page after search
        initAllBooks();    // Re-render filtered results

    });
}
