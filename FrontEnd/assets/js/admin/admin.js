// Import
import { openModal, closeModal } from "./modal.js";

// Récuperation d'élément
const token = localStorage.getItem("token");
const header = document.getElementById("adminHeader");
const filter = document.getElementById("hideFilter");
const myModalOpenButton = document.getElementById("adminButton");
const myModalCloseButton = document.querySelector(".modal-cross-right");
const loginLink = document.querySelector("#loginButton");

// Listener de lancement des fonctions ADMIN
window.addEventListener("load", () => {
	checkAuth();
});

// Ouverture ou fermeture de la modal
myModalOpenButton.addEventListener("click", openModal);
myModalCloseButton.addEventListener("click", closeModal);

// Affichage des elements Admin
async function checkAuth() {
	// fonction de vérification de l'authentification
	if (token) {
		filter.style.display = "none";
		header.style.display = "flex";
		myModalOpenButton.style.display = "flex";
		loginLink.textContent = "logout";
		loginLink.href = "#";
		loginLink.addEventListener("click", () => {
			localStorage.clear("token");
			window.location.reload();
		});
	}
}
