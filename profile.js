const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");

const loginButton = document.getElementById("loginButton");
const registrButton = document.getElementById("registrButton");

const message = document.getElementById("message");


function showSection(id) {
    document.getElementById(id).classList.remove("hidden");
}

function noShowSection(id) {
    document.getElementById(id).classList.add("hidden");
}

registrButton.addEventListener("click", () => {
    noShowSection("profilePage");
    showSection("registration");
});

loginButton.addEventListener("click", (e) => {

    e.preventDefault();

    const hasNumber = /\d/.test(passwordInput.value);

    if (emailInput.value === "" || passwordInput.value === "") {
        message.textContent = "Bitte geben Sie alle Daten ein.";
        return;
    }

    if (passwordInput.length < 8 || !hasNumber) {
        message.textContent =
            "Das Passwort wurde falsch eingegeben!\n" +
            "(Mindestens 8 Zeichen &  eine Zahl)";
        return;
    }

    if (emailInput.value.trim() === "tata@web.de" && passwordInput.value === "12345tata") {

        noShowSection("profilePage");
        showSection("profile");

        message.textContent = "Login erfolgreich!";
    } else {
        message.textContent = "Falsche E-Mail oder Passwort!";
    }
});

const registrationForm = document.getElementById("registrationForm");
const message2 = document.getElementById("r-message");


registrationForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const formData = new FormData(registrationForm);

    const name = formData.get("nameInput");
    const email = formData.get("r-emailInput");
    const password = formData.get("r-passwordInput");
    const password2 = formData.get("r-passwordInput2");

    const hasNumber = /\d/.test(password);

    if (name === "" || email === "" || password === "" || password2 === "") {
        message2.textContent = "Bitte geben Sie alle Daten ein.";
        return;
    }

    if (password !== password2) {
        message2.textContent = "Die Passwörter stimmen nicht überein!";
        return;
    }

    if (password.length < 8 || !hasNumber) {
        message2.textContent =
            "Das Passwort wurde falsch eingegeben!\n" +
            "(Mindestens 8 Zeichen &  eine Zahl)";
        return;
    }

    message2.textContent = "Das Passwort wurde korrekt eingegeben!\n" +
        "Erfolgreiche Registrierung!";

    noShowSection("registration");
    showSection("profile");

});