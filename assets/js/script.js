const domain = `https://api.themoviedb.org/3`
const api_key = `api_key=bb345a2244ae9b10552839e78cce228e&page=1`

const fetchMovies = async (value) => {
    let url = ''
    if (value) {
        url = `${domain}/search/movie?${api_key}&query=${value}`
    } else {
        url = `${domain}/discover/movie?${api_key}&sort_by=popularity.desc`
    }
    let response = await fetch(url);
    const data = await response.json();
    let movies = data.results;
    let output = "";
    movies.forEach((movie) => {
        output += `
        <div class="col-xxl-3 col-md-4 col-sm-6 col-12 mb-4">
            <div class="card h-100">
                <img class="card-img-top" src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                <div class="card-body">
                    <h6 class="card-title gradient">${movie.title}</h6>
                    <p>${movie.release_date}</p>
                    <p class="rating"><img src="assets/img/star.svg"> ${movie.vote_average}</p>
                </div>
            </div>
        </div>
        `;
        document.getElementById("movies").innerHTML = output;
    });
}

let timeout = null;
const search = document.getElementById("search");

search.addEventListener("keyup", (e) => {
    clearTimeout(timeout);

    timeout = setTimeout(function () {
        const value = e.target.value;
        if (value.length > 0) {
            fetchMovies(value);
        } else {
            fetchMovies();
        }
    }, 800);
});

fetchMovies();