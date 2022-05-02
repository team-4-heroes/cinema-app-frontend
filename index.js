import "https://unpkg.com/navigo"  //Will create the global Navigo object used below

import {
  renderText, adjustForMissingHash, loadTemplate, renderTemplate, setActiveLink
} from "./utils.js"

import { setupLoginHandlers, logout, updateLoginDependentComponents } from "./pages/login-logout/login-logout.js"

window.addEventListener("load", async () => {
  const router = new Navigo("/", { hash: true });
  const templateLogin = await loadTemplate("./pages/login-logout/login.html")
  const templateLogout = await loadTemplate("./pages/login-logout/logout.html")
  const templateHome = await loadTemplate("./pages/home/home.html")
  
  adjustForMissingHash()
  router
    .hooks({
      before(done, match) {
        setActiveLink("top-nav", match.url)
        done()
      }
    })
    .on("/", ()=>renderTemplate(templateHome, "content"))
    .on("/login", () => {
      renderTemplate(templateLogin, "content")
      setupLoginHandlers()
    })
    .on("/logout", () => {
      renderTemplate(templateLogout, "content")
      logout()
    })
    .notFound(() => renderText("No page for this route found", "content"))
    .resolve()
});

updateLoginDependentComponents()
window.onerror = (e) => alert(e)