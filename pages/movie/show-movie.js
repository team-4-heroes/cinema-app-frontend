import { getMoviesRequest } from "../../fetch-facade.js"

export function populateMovies() {
    getMoviesRequest()
        .then(movies => {
            renderRows(movies);
        })
}

function renderRows(movies) {
    //Object.entries(data).map(([k, v]) => createRows(v.name)).join("\n") What does this do
    var tableElement = document.getElementById("get-all-movies");
    tableElement.innerHTML = createTableRows(movies);
}

function createTableRows(movies) {
    const rows = movies.map(movie =>
        `<tr>
            <td>${movie.title}</td>
            <td>${movie.releaseYear}</td>
            <td>${movie.lengthInMinutes}</td>
            <td>${movie.description}</td>
        </tr>`
    ).join("\n")
    return rows;
}