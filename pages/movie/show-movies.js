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

function createMovieTableRows(movies) {//TODO: Add link here to movie-detail-page using movie id
    const rows = movies.map(movie =>
        `<tr>
            <td> ${movie.title} </td> 
            <td> ${movie.lengthInMinutes} </td>
            <td> ${movie.releaseYear} </td>
            <td> ${movie.description} </td>
        </tr>   
    `).join("\n")
    return rows;
}

export function renderFullSingleMovieInfo() {
    const id = 1;
    getSingleMovie(id)
        .then(movie => createMovieDetailColumn(movie))
}

function createMovieDetailColumn(movie) {
    for (const [key, value] of Object.entries(movie)) {
        var tdNode = document.getElementById(`get-${key}-tbl-data`)
        if (tdNode) {
            tdNode.innerHTML = value;
        } else {
            console.log("couldn't find node for the key" + key)
        }
    }
}