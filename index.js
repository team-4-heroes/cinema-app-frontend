import "https://unpkg.com/navigo"  //Will create the global Navigo object used below

import {
  renderText, adjustForMissingHash, loadTemplate, renderTemplate, setActiveLink
} from "./utils.js"

import { setupLoginHandlers, logout, updateLoginDependentComponents } from "./pages/login-logout/login-logout.js"
import { signupHandlers } from "./pages/sign-up/sign-up.js"
import { renderScreenings } from "./pages/screening/show-screenings.js"
import { createNewScreening, renderOptions } from "./pages/screening/add-screening.js"
import { showSeats } from "./pages/reservation/reserve-seat.js"

import {populateMovies, renderFullSingleMovieInfo} from "./pages/movie/show-movies.js"

import {displayUserProfile} from "./pages/mange-profile/mange-profile.js";


window.addEventListener("load", async () => {
  const router = new Navigo("/", { hash: true })
  const templateLogin = await loadTemplate("./pages/login-logout/login.html")
  const templateLogout = await loadTemplate("./pages/login-logout/logout.html")
  const templateHome = await loadTemplate("./pages/home/home.html")
  const templateSignUp = await loadTemplate("./pages/sign-up/sign-up.html")
  const templateShowScreenings = await loadTemplate("./pages/screening/show-screenings.html")
  const templateAddScreening = await loadTemplate("./pages/screening/add-screening.html")
  const templateAddMovie = await loadTemplate("./pages/movie/add-movie.html")
  const templateShowMovie = await loadTemplate("./pages/movie/show-movies.html")
  const templateShowMovieDetails = await loadTemplate("./pages/movie/show-single-movie.html")
  const templateMangeProfile = await loadTemplate("./pages/mange-profile/mange-profile.html")

  const templateReserveSeat = await loadTemplate("./pages/reservation/reserve-seat.html")

  adjustForMissingHash()
  await router
  .hooks({
    before(done, match) {
      setActiveLink("top-nav", match.url)
      done()
    }
  })
  .on("/", ()=>renderTemplate(templateHome, "content"))
  .on("/show-screenings", ()=>{
    renderTemplate(templateShowScreenings, "content")
    renderScreenings()
  })
  .on("/add-screening", ()=>{
    renderTemplate(templateAddScreening, "content")
    renderOptions()
    document.getElementById("btn-add-screening").onclick = createNewScreening
  })
  .on("/login", () => {
    renderTemplate(templateLogin, "content")
    setupLoginHandlers(router.navigate)
  })
  .on("/logout", () => {
    renderTemplate(templateLogout, "content")
    logout()
  })
  .on("/sign-up",() =>{
    renderTemplate(templateSignUp,"content")
    signupHandlers()
  })
  .on("/add-movie", () => {
    renderTemplate(templateAddMovie, "content")
    // add movie: fetch from OMDB and display search result. Ez
   })
  .on("/show-movies", () => {
    renderTemplate(templateShowMovie, "content")
    populateMovies()
  })
    .on("/show-single-movie/:movieId", (navigoMatch) => {
      renderTemplate(templateShowMovieDetails, "content")
      renderFullSingleMovieInfo(navigoMatch.data.movieId)
    })
  .on("/mange-profile", () => {
      renderTemplate(templateMangeProfile, "content")
      displayUserProfile()
  })
  .on("/reserve-seat", () => {
    renderTemplate(templateReserveSeat, "content")
    // under construction
})
  .notFound(() => renderText("No page for this route found", "content"))
  .resolve()
  })

updateLoginDependentComponents()
window.onerror = (e) => alert(e)