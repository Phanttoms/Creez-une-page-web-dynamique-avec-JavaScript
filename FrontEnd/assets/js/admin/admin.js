// Import
import { openModal, closeModal } from "./modal.js";
import { openModalAdd } from "./modalupload.js";

// Récuperation d'élément
const token = sessionStorage.getItem("token");
const header = document.getElementById("adminHeader");
const filter = document.getElementById("hideFilter");
const myModalOpenButton = document.getElementById("adminButton");
const myModalCloseButton = document.querySelector(".modal-cross-right");
const myModalReturnButton = document.querySelector(".modal-arrow-left");
const myModalSwitchButton = document.querySelector(".modal-footer-gallery");
const loginLink = document.querySelector("#loginButton");
const closeBody = document.querySelector(".modal-overlay");

// Listener de lancement des fonctions ADMIN
window.addEventListener("load", () => {
	checkAuth();
});

// Ouverture ou fermeture de la modal
myModalOpenButton.addEventListener("click", openModal);
myModalCloseButton.addEventListener("click", closeModal);
myModalReturnButton.addEventListener("click", openModal);
myModalSwitchButton.addEventListener("click", openModalAdd);
closeBody.addEventListener("click", closeModal);

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
			sessionStorage.clear("token");
			window.location.reload();
		});
	}
}
