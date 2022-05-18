import { makeOptions, handleErrors, loginRequest, getLoggedOnPerson } from "../../fetch-facade.js"
import { displayMsg } from "../../utils.js"

let _navigate //Only accessible from inside this module

export function setupLoginHandlers(navigate) {
  _navigate = navigate // We need a handle to navigate to redirect after successful login
  document.getElementById("btn-login").onclick = login
}

async function login() {
  // Athenticate user with credentials from login form
  const user = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value
  }
  try {
    const resp = await loginRequest(user)
    setLoginState(resp.token, resp.roles[0], resp.username)
    console.log(await getLoggedOnPerson())
    _navigate("/") // navigate to home page after succesful login
  } catch (err) {
    displayMsg(document.getElementById("login-error"), err.message)
  }
}



export function logout() {
  setLoginState(null)
}

export async function setLoginState(token, loggedInAs, username) {
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
  document.getElementById("sign-up").style.display = loggedIn ? "none" : "block"
  document.getElementById("user-details").style.display = loggedIn ? "inline" : "none"
  document.getElementById("movie-search").style.display = loggedIn ? "flex" : "none"
  document.getElementById("mange-profile").style.display = loggedIn ? "flex" : "none"


}