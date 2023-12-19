// Récuperation des elements du document de login
const loginForm = document.getElementById("formContent");
const errorMessage = document.getElementById("error");

// Variable Regex pour le Mail et le mot de passe
const regexMail =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const regexPassword = /^[a-zA-Z]\w{5,14}/;

// Fonction d'envoie des information de connection et verification de la réponse
async function login(email, password) {
	if (!regexMail.test(email)) {
		errorMessage.textContent = "E-mail invalide";
	} else if (!regexPassword.test(password)) {
		errorMessage.textContent =
			"Le mot de passe doit contenir au moins 6 caractere, dont un chiffre";
	} else {
		try {
			const response = await fetch("http://localhost:5678/api/users/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({
					email: email,
					password: password,
				}),
			});

			if (response.status === 200) {
				const data = await response.json();
				const token = data.token;
				localStorage.setItem("token", token);
				window.location.href = "./index.html";
			} else {
				errorMessage.textContent =
					"Erreur dans l’identifiant ou le mot de passe";
				console.log(`Erreur: ${response.status} !`);
			}
		} catch (error) {
			console.log("Erreur lors de la requête.");
			console.log(error);
		}
	}
}

// Listener du bouton submit et appel de la fonction d'envoie
loginForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const email = loginForm.querySelector("#email").value;
	const password = loginForm.querySelector("#password").value;

	login(email, password);
});
