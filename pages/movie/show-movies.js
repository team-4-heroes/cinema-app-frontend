import {getAllMovies, getSingleMovie, handleErrors} from "../../fetch-facade.js"

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
            <td><a href="/show-single-movie.html"> ${movie.title} </a></td>
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

// Functions for Movie Details

function createMovieDetailColumn(movie) {
    for (const [key, value] of Object.entries(movie)) {
        var tdNode = document.getElementById(`get-${key}-tbl-data`)
        if (tdNode) {
            if(key===`actors`) {
                tdNode.innerHTML = createActorsTd(value);
            } else if(key===`posterUrl`) {

                console.log(movie.posterUrl);
                tdNode.innerHTML = createImgTd(movie);
            } else {
                tdNode.innerHTML = value
            }
        } else {
            console.log("couldn't find node for the key" + key)
        }
    }
}

function createActorsTd(actors) {
    const tdActors = actors.map(a => `${a.firstName} ${a.lastName}`).join(", ")
    return tdActors;
}

function createImgTd(movie) {
    return `<img src="${movie.posterUrl}" alt="Poster for ${movie.title}">`;
}