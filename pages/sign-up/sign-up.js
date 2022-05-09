import {SERVER_URL} from "../../settings.js";
import {makeOptions} from "../../utils.js";

export function signupHandlers() {
    document.getElementById("btn-sign-up").onclick = signUp
}

function signUp() {
    const person = {}
    console.log("Called signUp")
    person.username = document.getElementById("floatingUsername").value
    person.password = document.getElementById("floatingPassword").value
    person.email = document.getElementById("floatingEmail").value
    person.firstName = document.getElementById("floatingFname").value
    person.lastName = document.getElementById("floatingLname").value
    person.phoneNumber = document.getElementById("floatingTelephone").value

    const options = makeOptions("POST", person)

    fetch(SERVER_URL + "persons", options)
        .then(res => res.json())
        .then(person => {
            document.getElementById("person-info-all").innerText =
                "New user created with username " + JSON.stringify(person.username)
        })
        .catch(e => console.error(e))
}