const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const moviesContainer = document.querySelector(".movies-container");

const API_KEY = "13a68bae";
const BASE_URL = "https://www.omdbapi.com/";

searchBtn.addEventListener("click", searchMovies);

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});

async function searchMovies() {
    const query = searchInput.value.trim();

    if(query === ""){
        moviesContainer.innerHTML = "<p>Type a movie name.</p>";
        return;
    }
    moviesContainer.innerHTML = "<p>Loading...</p>";

    try{
        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}`);
        const data = await response.json();

        if(data.Response === "False"){
            moviesContainer.innerHTML = `<p>${data.Error}</p>`;
            return;
        }
        displayMovies(data.Search);
    }
    catch(error){
        moviesContainer.innerHTML = "<p>Something went wrong.</p>";
    }
}

function displayMovies(movies){
    moviesContainer.innerHTML = "";

    movies.forEach(movie =>{
        const poster = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300?text=No+Image";

        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        movieCard.innerHTML = `
            <img src="${poster}" alt="${movie.Title}">
            <div class="movie-info">
                <h3>${movie.Title}</h3>
                <span>${movie.Year}</span>
            </div>`;
        moviesContainer.appendChild(movieCard);
    });
}