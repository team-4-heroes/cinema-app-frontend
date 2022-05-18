import {makeOptions} from "../../fetch-facade.js";
import {SERVER_URL} from "../../settings.js";

export function displayUserProfile() {
    let currentUser = sessionStorage.getItem("username")
    fetch(`${SERVER_URL}persons/${currentUser}`,makeOptions("GET"))
        .then(res=>res.json())
        .then(jsonParsed=> {
            console.log(jsonParsed)
            renderUserDetails(jsonParsed)
        })
}

function renderUserDetails(user) {
    console.log(user)
    const readableLabels = {
        "id": "User Id",
        "username": "Username",
        "firstName" : "First name",
        "lastName" : "Last name",
        "email" : "Email address",
        "phoneNumber" : "Phone number",
    }
    let profileContainer = document.getElementById("user-profile-container")
    let userDetailsHTML = "";

    for (let key in user) {
        if (user.hasOwnProperty(key) && readableLabels.hasOwnProperty(key)) {
            userDetailsHTML += renderItem(user[key], readableLabels[key])
        }
    }
    profileContainer.innerHTML=userDetailsHTML
}

function renderItem(item, label) {
    return `<div class="input-group mb-3 ">
        <span id="labelFor${label}" class="input-group-text col-3">${label}</span>
        <input type="text" readOnly class="form-control" id="${label}_id" value="${item}">
    </div>`
}




