import { SERVER_URL } from "../../settings.js"

export const loginRequest = async (user) => await fetch(`${SERVER_URL}auth/login`, makeOptions("post", user)).then(res => handleErrors(res))
export const signUpRequest = async (person) => await fetch(`${SERVER_URL}persons`, makeOptions("post", person)).then(res => handleErrors(res))
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
      const error = new Error(errorResponse.message)
      error.apiError = errorResponse
      throw error
    }
    return res.json()
}