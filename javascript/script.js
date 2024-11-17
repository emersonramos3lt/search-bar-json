// Search
const moviesCardTemplate = document.querySelector("[data-movies-template]");
const moviesCardContainer = document.querySelector("[data-movies-card-container]");
const searchInput = document.querySelector("[data-search]");

let moviesLet = [];

// Hide elements
searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();
    moviesLet.forEach(movies => {
        const isVisible =
            movies.title.toLowerCase().includes(value) ||
            movies.category.toLowerCase().includes(value);
            movies.element.classList.toggle("hide", !isVisible);
    });
});

fetch("./javascript/movies.json")
.then(res => res.json())
.then(data => {

    moviesLet = data.map(movies => {
        const card = moviesCardTemplate.content.cloneNode(true).children[0];

        const movieImg = card.querySelector("[data-image]");
        const category = card.querySelector("[data-category]");
        const title = card.querySelector("[data-title]");

        movieImg.src = movies.imagePath;
        category.textContent = movies.category;
        title.textContent = movies.title;

        moviesCardContainer.append(card);
        return { image: movies.imagePath, category: movies.category, title: movies.title, element: card }
    });
});