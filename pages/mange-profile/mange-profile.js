import{SERVER_URL} from "../../settings.js";
import {makeOptions} from "../../fetch-facade.js";

export function displayPerson(){
    const person = {}
    person.person = person
    let currentUser = sessionStorage.getItem("username")
    fetch(`${SERVER_URL}persons/${currentUser}`,makeOptions("GET"))
        .then(res=>res.json())
        .then(jsonParsed=> {
            console.log(jsonParsed)
            renderUserDetails(jsonParsed.person)
        })

    function renderUserDetails(person) {
        const userDetails = {
            "id": "User Id",
            "username": "Username",
            "firstName": "First name",
            "lastName": "Last name",
            "email": "Email address",
            "phoneNumber": "Phone number"
        }
        let profileContainer = document.getElementById("user-profile-container")
        let userDetailsHTML = "";

        for (let key in person) {
            if (person.hasOwnProperty(key) && userDetails.hasOwnProperty(key)) {
                userDetailsHTML += renderItem(person[key], userDetails[key])
            }
        }
        profileContainer.innerHTML=userDetailsHTML
    }
}
    function renderItem(item, label) {
        return `<div class="input-group mb-3 ">
        <span id="labelFor${label}" class="input-group-text col-3">${label}</span>
        <input type="text" readOnly class="form-control" id="${label}_id" value="${item}" aria-label="Address" aria-describedby="labelFor${label}">
    </div>`
    }

