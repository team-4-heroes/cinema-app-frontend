import { getAllMovies, getSingleMovie } from "../../fetch-facade.js"

export function populateMovies() {
    getAllMovies()
        .then(movies => {
            renderRows(movies);
        })
}

function renderRows(movies) {
    console.log(movies)
    const rows = createMovieTableRows(movies);
    document.getElementById("get-all-movies-tbl").innerHTML = rows;
}

function createMovieTableRows(movies) {
    const rows = movies.map(movie =>
        `<tr>
            <td> ${movie.title} </td>
            <td> ${movie.lengthInMinutes} </td>
            <td> ${movie.releaseYear} </td>
            <td> ${movie.ageLimit} </td> //TODO: Why is this not showing?
        </tr>   
    `).join("\n")
    return rows;
}

export function renderFullSingleMovieInfo() {
    const movie = getSingleMovie()
    const movieTable =
        `<tr>
            <td> ${movie.id} </td>
            <td> ${movie.title} </td>
            <td> ${movie.lengthInMinutes} </td>
            <td> ${movie.releaseYear} </td>
            <td> ${movie.price} </td>
            <td> ${movie.ageLimit} </td>
            <td> ${movie.description} </td>
            // genre, actor, screening
        </tr>   
        `
    document.getElementById("get-single-movie-tbl").innerHTML = movieTable;
}