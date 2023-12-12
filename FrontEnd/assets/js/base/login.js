// Récuperation des elements du document de login
const loginForm = document.getElementById("formContent");
const errorMessage = document.getElementById("error");

// Fonction d'envoie des information de connection et verification de la réponse
async function login(email, password) {
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
			console.log(token);
		} else if (response.status === 401) {
			errorMessage.textContent = "Mot de passe incorrect.";
			console.log(`Erreur: ${response.status} !`);
		} else if (response.status === 404) {
			errorMessage.textContent = "Identifiant incorrect.";
			console.log(`Erreur: ${response.status} !`);
		} else {
			console.log(`Erreur: ${response.status} !`);
		}
	} catch (error) {
		console.log("Erreur lors de la requête.");
		console.log(error);
	}
}

// Listener du bouton submit et appel de la fonction d'envoie
loginForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const email = loginForm.querySelector("#email").value;
	const password = loginForm.querySelector("#password").value;

	login(email, password);
});
