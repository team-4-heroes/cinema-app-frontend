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

function createMovieTableRows(movies) {
    const rows = movies.sort((a,b) => a.title.localeCompare(b.title)).map(movie =>
        `<tr>
            <td><a className="nav-link active" href="#/show-single-movie/${movie.id}" data-navigo=""> ${movie.title} </a></td>
            <td> ${movie.lengthInMinutes} </td>
            <td> ${movie.releaseYear} </td>
            <td> ${movie.description} </td>
        </tr>   
    `).join("\n")
    return rows;
}

// Functions for Movie Details
export function renderFullSingleMovieInfo(movieId) {
    console.debug(`rendering details for movie ${movieId}`)
    getSingleMovie(movieId)
        .then(movie => createMovieDetailColumn(movie))
}

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