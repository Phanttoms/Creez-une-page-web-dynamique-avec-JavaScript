// Récuperation d'élément
const token = localStorage.getItem("token");
const header = document.getElementById("adminHeader");
const modalButton = document.getElementById("adminButton");
const filter = document.getElementById("hideFilter");

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

async function updateUI() {
	if (isLogged()) {
		header.style.display = "flex";
		modalButton.style.display = "flex";
		filter.style.display = "none";
	}
}

// Listener de lancement des fonctions ADMIN
window.addEventListener("load", () => {
	loginButtonUpdate();
	updateUI();
});
