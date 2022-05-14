import { addScreening, getAllMovies, getAllRooms } from "../../fetch-facade.js"
import { displayMsg } from "../../utils.js"

const byId = (id)=>document.getElementById(id)

export const renderOptions = async ()=>{
    try {
        const movies = await getAllMovies()
        const rooms = await getAllRooms()
        // console.log(JSON.stringify(movies))
        byId("movie-select").innerHTML = movieOptions(movies)
        byId("room-select").innerHTML = roomOptions(rooms)
    } catch (err) {
        displayMsg(byId("screening-msg"), err.message)
    }
}

const movieOptions = movies=>
"<option selected>Choose Movie</option>" + movies.map(m => `<option value="${m.id}">${m.title}</option>`).join("")

const roomOptions = rooms=>
"<option selected>Choose Room</option>" + rooms.map(r => `<option value="${r.id}">${r.name}</option>`).join("")

export const createNewScreening = async ()=>{
    const screening = {
        movieId: byId("movie-select").value,
        roomId: byId("room-select").value,
        startTime: byId("start-time").value
    }

    try {
        const resp = await addScreening(screening)
        console.log(JSON.stringify(resp))
        displayMsg(byId("screening-msg"), "success","success")
    } catch (err) {
        console.log(err.apiError)
        displayMsg(byId("screening-msg"), err.message)
    }
}