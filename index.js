import "https://unpkg.com/navigo"  //Will create the global Navigo object used below

import {
  renderText, adjustForMissingHash, loadTemplate, renderTemplate, setActiveLink
} from "./utils.js"

import { setupLoginHandlers, logout, updateLoginDependentComponents } from "./pages/login-logout/login-logout.js"
import { signupHandlers } from "./pages/sign-up/sign-up.js"
import { renderScreenings } from "./pages/screening/show-screenings.js"
import { createNewScreening, renderOptions } from "./pages/screening/add-screening.js"
import {populateMovies, renderFullSingleMovieInfo} from "./pages/movie/show-movies.js"

window.addEventListener("load", async () => {
  const router = new Navigo("/", { hash: true })
  const templateLogin = await loadTemplate("./pages/login-logout/login.html")
  const templateLogout = await loadTemplate("./pages/login-logout/logout.html")
  const templateHome = await loadTemplate("./pages/home/home.html")
  const templateSignUp = await loadTemplate("./pages/sign-up/sign-up.html")
  const templateShowScreenings = await loadTemplate("./pages/screening/show-screenings.html")
  const templateAddScreening = await loadTemplate("./pages/screening/add-screening.html")
  const templateShowMovie = await loadTemplate("./pages/movie/show-movies.html")
  const templateShowMovieDetails = await loadTemplate("./pages/movie/show-single-movie.html")

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
      .on("/show-movies", () => {
        renderTemplate(templateShowMovie, "content")
        populateMovies()
      })
      .on("/show-single-movie", () => {
        renderTemplate(templateShowMovieDetails, "content")
        //renderFullSingleMovieInfo()
      })
    .notFound(() => renderText("No page for this route found", "content"))
    .resolve()
})



updateLoginDependentComponents()
window.onerror = (e) => alert(e)