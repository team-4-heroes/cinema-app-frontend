import { SERVER_URL } from "../../settings.js"

export const loginRequest = async (user) => await fetch(`${SERVER_URL}auth/login`, makeOptions("post", user)).then(res => handleErrors(res))
export const signUpRequest = async (person) => await fetch(`${SERVER_URL}persons`, makeOptions("post", person)).then(res => handleErrors(res))

export const getAllScreenings = async () => await fetch(`${SERVER_URL}screenings`, makeOptions("get")).then(res => handleErrors(res))
export const getScreeningById = async (id) => await fetch(`${SERVER_URL}screenings/${id}`, makeOptions("get")).then(res => handleErrors(res))
export const addScreening = async (screening) => await fetch(`${SERVER_URL}screenings`, makeOptions("post", screening, false)).then(res => handleErrors(res))
export const updateScreening = async (id, screening) => await fetch(`${SERVER_URL}screenings/${id}`, makeOptions("put", screening, true)).then(res => handleErrors(res))
export const deleteScreeningById = async (id) => await fetch(`${SERVER_URL}screenings/${id}`, makeOptions("delete", null, true)).then(res => handleErrors(res))
export const getSeats = async (id) => await fetch(`${SERVER_URL}reservations/${id}`, makeOptions("get")).then(res => handleErrors(res))

export const getAllMovies = async () => await fetch(`${SERVER_URL}movies`, makeOptions("get")).then(res => handleErrors(res))
export const getMoviesFromOMDB = async () => await fetch(`http://www.omdbapi.com/?apikey=c058a009&type=movie&plot=short&s=universe`, {method: "get"}).then(res => handleErrors(res))
export const getAllRooms = async () => await fetch(`${SERVER_URL}rooms`, makeOptions("get")).then(res => handleErrors(res))
// TODO: He, refactor getMoviesRequest to getAllMovies above
export const getMoviesRequest = async (movie) => await fetch(`${SERVER_URL}movies`, makeOptions("get", movie)).then(res => handleErrors(res))
//export const getMovieRequest = async (movie) => await fetch(`${SERVER_URL}movies/{id}`, makeOptions("get", movie)).then(res => handleErrors(res))
//export const getMoviesByKeywordRequest = async (movie) => await fetch(`${SERVER_URL}movies/keyword`, makeOptions("get", movie)).then(res => handleErrors(res))
//export const getMoviesByActorRequest = async (movie) => await fetch(`${SERVER_URL}movies/search-actor`, makeOptions("get", movie)).then(res => handleErrors(res))
//export const addMovieRequest = async (movie) => await fetch(`${SERVER_URL}movies`, makeOptions("put", movie)).then(res => handleErrors(res))
//export const editMovieRequest = async (movie) => await fetch(`${SERVER_URL}movies/{id}`, makeOptions("patch", movie)).then(res => handleErrors(res))
//export const deleteMovieRequest = async (movie) => await fetch(`${SERVER_URL}movies/{id}`, makeOptions("delete", movie)).then(res => handleErrors(res))
//export const addActorToMovieRequest = async (movie) => await fetch(`${SERVER_URL}movies/add-actor`, makeOptions("post", movie)).then(res => handleErrors(res))

// Do you fetches here, like above

export function makeOptions(method, body, addToken) {
    const opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      }
    }
    if (body) opts.body = JSON.stringify(body) // Add optional body
    if (addToken) {
        let jwt = sessionStorage.getItem("token") // Authentication
        if (jwt) opts.headers.Authorization = `Bearer ${jwt}`
    }
    return opts
}

export async function handleErrors(res) {
    if (!res.ok) {
      const errorResponse = await res.json()
      const error = new Error(errorResponse.error)
      throw error
    }
    return res.json()
}