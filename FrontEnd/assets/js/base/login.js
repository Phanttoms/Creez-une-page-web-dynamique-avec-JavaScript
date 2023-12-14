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
		} else {
			errorMessage.textContent = "Erreur dans l’identifiant ou le mot de passe";
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
