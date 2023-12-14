// Récuperation d'élément
const token = localStorage.getItem("token");

// Mise a jour du boutton de Login en fonction du token de connection
const isLogged = () => (token ? true : false);

function logOut() {
	localStorage.clear("token");
	console.log("disconnected");
	window.location.reload();
}

async function loginButtonUpdate() {
	const loginButton = document.querySelector("#loginButton");
	if (isLogged()) {
		loginButton.href = "#";
		loginButton.innerText = "logout";
		loginButton.addEventListener("click", () => {
			logOut();
			loginButton.innerText = "login";
		});
	}
}

// Listener de lancement des fonctions ADMIN
window.addEventListener("load", () => {
	loginButtonUpdate();
	// updateUI() Fonction pour mettre a jour l'interface par rapport au token utilisateur
});
