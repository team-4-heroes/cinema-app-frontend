import { getMoviesScreenings } from "../../fetch-facade.js"
import { appendLeadingZero } from "../../utils.js"

export const renderScreenings = async ()=>{
    const movies = await getMoviesScreenings() //getMoviesFromOMDB()
    // console.log(JSON.stringify(movies))
    document.getElementById("screenings").innerHTML = movieCards(movies)
}

const movieCards = movies=>
    movies.map(m=>{
        let startHours = m.startTimes.map(t=>t[3])
        startHours.sort((a, b)=> (a - b))
        const startTimes = startHours.map(s=>
            `<button type="button" class="btn btn-primary btn-sm" onclick="alert('under construction!')">${appendLeadingZero(s)}:${appendLeadingZero(0)}</button>`).join("")
    
        return `
            <div class="card">
            <img src="${m.posterUrl}" class="card-img-top" alt="Poster for ${m.title}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title text-uppercase">${m.title}</h5>
                <p class="card-text">${m.description}</p>
                <div class="d-flex justify-content-between fw-bold mt-auto">
                    <div>${m.lengthInMinutes} min.</div><div>${m.releaseYear}</div>
                </div>
                <div class="d-flex justify-content-between mt-1">${startTimes}</div>
            </div>
            </ul>
            </div>
            `
    }).join("")