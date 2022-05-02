import { makeOptions } from "../../utils.js"
import { SERVER_URL } from "../../settings.js"

export function setupLoginHandlers() {
  document.getElementById("btn-login").onclick = login
}

function login() {
  // Athenticate user with credential from login form
  let user = {username: document.getElementById("username").value, password: document.getElementById("password").value}
  fetch(`${SERVER_URL}auth/login`, makeOptions("POST", user)).then(resp=>resp.json())
  .then(resp=>{
    setLoginState(resp.token, resp.roles, resp.username)
    // TODO: navigate to index
  })
}

export function logout() {
  setLoginState(null)
}

export function setLoginState(token, loggedInAs, username) {
  if (token) {
    sessionStorage.setItem("token", token)
    if (loggedInAs) sessionStorage.setItem("logged-in-as", loggedInAs)
    if (username) sessionStorage.setItem("username", username)
  } else {
    sessionStorage.clear("token")
    sessionStorage.clear("logged-in-as")
    sessionStorage.clear("username")
  }
  updateLoginDependentComponents()
}

export function updateLoginDependentComponents() {
  const loggedIn = sessionStorage.getItem("token")
  const loggedInAs = sessionStorage.getItem("logged-in-as")
  const username = sessionStorage.getItem("username")

  if (loggedIn) {
    document.getElementById("user-details").innerText = `Logged on with username ${username} as ${loggedInAs}`
    document.getElementById("user-details").style.display = "inline"
  }
  document.getElementById("login").style.display = loggedIn ? "none" : "block"
  document.getElementById("logout").style.display = loggedIn ? "block" : "none"
  document.getElementById("user-details").style.display = loggedIn ? "inline" : "none"
  document.getElementById("movie-search").style.display = loggedIn ? "flex" : "none"
}