import "https://unpkg.com/navigo"  //Will create the global Navigo object used below

import {
  renderText, adjustForMissingHash, loadTemplate, renderTemplate, setActiveLink
} from "./utils.js"

import { setupLoginHandlers, logout, updateLoginDependentComponents } from "./pages/login-logout/login-logout.js"
import { signupHandlers } from "./pages/sign-up/sign-up.js"
import { populateMovies } from "./pages/movie/show-movie.js"

window.addEventListener("load", async () => {
  const router = new Navigo("/", { hash: true })
  const templateLogin = await loadTemplate("./pages/login-logout/login.html")
  const templateLogout = await loadTemplate("./pages/login-logout/logout.html")
  const templateHome = await loadTemplate("./pages/home/home.html")
  const templateSignUp = await loadTemplate("./pages/sign-up/sign-up.html")
  const templateShowMovie = await loadTemplate("./pages/movie/show-movie.html")
  //const templateManageMovie = await loadTemplate("./pages/movie/manage-movie.html")
  adjustForMissingHash()
  await router
    .hooks({
      before(done, match) {
        setActiveLink("top-nav", match.url)
        done()
      }
    })
    .on("/", ()=>renderTemplate(templateHome, "content"))
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
      .on("/show-movie", () => {
        renderTemplate(templateShowMovie, "content")
        populateMovies()
      })
    .notFound(() => renderText("No page for this route found", "content"))
    .resolve()
})



updateLoginDependentComponents()
window.onerror = (e) => alert(e)