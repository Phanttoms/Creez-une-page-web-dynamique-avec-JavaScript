// Import
import { openModal, closeModal, openAddModal } from "./modal.js";

// Récuperation d'élément
const token = localStorage.getItem("token");
const header = document.getElementById("adminHeader");
const filter = document.getElementById("hideFilter");
const myModalOpenButton = document.getElementById("adminButton");
const myModalDeleteCloseButton = document.getElementById("crossRightDelete");
const myModalAddCloseButton = document.getElementById("crossRightAdd");
const modalNavbutton = document.getElementById("modalAddButton");
const modalArrow = document.getElementById("arrowLeft");

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
		myModalOpenButton.style.display = "flex";
		filter.style.display = "none";
	}
}

// Listener de lancement des fonctions ADMIN
window.addEventListener("load", () => {
	loginButtonUpdate();
	updateUI();
});

// Ouverture ou fermeture de la modal
myModalOpenButton.addEventListener("click", openModal);
myModalDeleteCloseButton.addEventListener("click", closeModal);
myModalAddCloseButton.addEventListener("click", closeModal);

// Nav Modal
modalNavbutton.addEventListener("click", openAddModal);
modalArrow.addEventListener("click", openModal);

// test
