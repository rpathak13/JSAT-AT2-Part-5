// testing 
// Movie Class
class Movie {
    constructor(id, title, year, rating) {
        this.id = id;
        this.title = title;
        this.year = year;
        this.rating = rating;
    }
}

// Default Movies (From part 4)
const defaultMovies = [
    { id: 1, title: "Inception", year: 2010, rating: 8 },
    { id: 2, title: "The Dark Knight", year: 2008, rating: 9 },
    { id: 3, title: "Interstellar", year: 2014, rating: 10 },
    { id: 4, title: "The Fast and the Furious: Tokyo Drift", year: 2006, rating: 9 },
    { id: 5, title: "Avengers: Endgame", year: 2019, rating: 9 },
    { id: 6, title: "Avengers: Infinity War", year: 2018, rating: 10 },
    { id: 7, title: "Demon Slayer: Infinity Casstle", year: 2025, rating: 9 },
    { id: 8, title: "The Hangover", year: 2009, rating: 10 },
    { id: 9, title: "The Dictator", year: 2012, rating: 8.5 },
    { id: 10, title: "Spider-Man: No Way Home", year: 2021, rating: 10 },
    { id: 10, title: "Dragon Ball Super: Broly", year: 2018, rating: 9 },
    { id: 10, title: "F1: The Movie", year: 2025, rating: 8 },
];


// Movie List Class
class MovieList {
    constructor() {
        this.movies = [];
    }

    add(movie) {
        this.movies.push(movie);
    }

    getAll() {
        return this.movies;
    }

    searchById(id) {
        return this.movies.find(m => m.id == id);
    }

    searchByTitle(text) {
        return this.movies.filter(m =>
            m.title.toLowerCase().includes(text.toLowerCase())
        );
    }

    sortAZ() {
        this.movies.sort((a, b) => a.title.localeCompare(b.title));
    }

    sortZA() {
        this.movies.sort((a, b) => b.title.localeCompare(a.title));
    }

    sortBest() {
        this.movies.sort((a, b) => b.rating - a.rating);
    }
}

const movieList = new MovieList();

// Load default movies
defaultMovies.forEach(m => {
    movieList.add(new Movie(m.id, m.title, m.year, m.rating));
});


// UI Rendering
function renderMovies() {
    const grid = document.getElementById("movieGrid");
    grid.innerHTML = "";

    movieList.getAll().forEach(m => {
        const card = document.createElement("div");
        card.className = "movie-card";
        card.innerHTML = `
            <h3>${m.title}</h3>
            <p>Year: ${m.year}</p>
            <p>Rating: ${m.rating}</p>
        `;
        grid.appendChild(card);
    });
}


// MODAL CONTROLS
const modal = document.getElementById("addModal");

document.getElementById("addMovieBtn").onclick = () => {
    modal.style.display = "flex";
};

document.getElementById("closeModalBtn").onclick = () => {
    modal.style.display = "none";
};


// ADD MOVIE
document.getElementById("saveMovieBtn").onclick = () => {
    const id = document.getElementById("movieId").value;
    const title = document.getElementById("movieTitle").value;
    const year = document.getElementById("movieYear").value;
    const rating = document.getElementById("movieRating").value;

    if (!id || !title || !year || !rating) {
        alert("Please fill out all fields.");
        return;
    }

    movieList.add(new Movie(id, title, year, Number(rating)));
    modal.style.display = "none";

    renderMovies();
};


// SEARCH
document.getElementById("searchBtn").onclick = () => {
    const byTitle = document.getElementById("searchTitle").value;
    const byId = document.getElementById("searchId").value;

    let results = [];

    if (byId !== "") {
        const result = movieList.searchById(byId);
        results = result ? [result] : [];
    } else if (byTitle !== "") {
        results = movieList.searchByTitle(byTitle);
    }

    const out = document.getElementById("searchResults");

    out.innerHTML = results.length
        ? results.map(r => `${r.id} - ${r.title} (${r.year})`).join("<br>")
        : "0 results";
};


// SORTING
document.getElementById("sortAZBtn").onclick = () => {
    movieList.sortAZ();
    renderMovies();
};

document.getElementById("sortZABtn").onclick = () => {
    movieList.sortZA();
    renderMovies();
};

document.getElementById("sortBestBtn").onclick = () => {
    movieList.sortBest();
    renderMovies();
};

// Refresh button
document.getElementById("refreshBtn").onclick = renderMovies;

// Initial page load
renderMovies();