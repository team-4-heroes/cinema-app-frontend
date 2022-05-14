import { getAllMovies, getMoviesFromOMDB } from "../../fetch-facade.js"
import { appendLeadingZero } from "../../utils.js"

export const renderScreenings = async ()=>{
    const movies = await getMoviesFromOMDB()
    // console.log(JSON.stringify(movies))
    document.getElementById("screenings").innerHTML = movieCards(movies)
}

const movieCards = movies=>
    movies.Search.map(m=>{
        // sort by hour before mapping to markup
        // m.screenings.sort((a, b)=> (a.startTime[3] - b.startTime[3]))
        m.description = "A journey through the universe as it would appear to a space traveler beginning at the David Dunlap Observatory on Earth."
        m.Runtime = 100
        const startHours = [9,14,17,20]
        const startTimes = startHours.map(s=>
            `<a href="#">${appendLeadingZero(s)}:${appendLeadingZero(0)}</a>`).join("")
    
        return `
            <div class="card">
            <img src="${m.Poster}" class="card-img-top" alt="Poster for ${m.Title}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title text-uppercase">${m.Title}</h5>
                <p class="card-text">${m.description}</p>
                <div class="d-flex justify-content-between fw-bold mt-auto">
                    <div>${m.Runtime} min.</div><div>${m.Year}</div>
                </div>
                <div class="d-flex justify-content-between mt-1">${startTimes}</div>
            </div>
            </ul>
            </div>
            `
    }).join("")