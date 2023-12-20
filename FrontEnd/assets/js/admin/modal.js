// // Import
// import { getWorks, getCategory } from "../base/api.js";

// Récuperation éléments modal
const myModal = document.querySelector(".modal");
const allDocBackground = document.getElementById("allDoc");

// Fonction d'ouverture ou fermeture de la modal
export async function openModal() {
	myModal.style.display = "flex";
	allDocBackground.style.opacity = "0.5";
}

export async function closeModal() {
	myModal.style.display = "none";
	allDocBackground.style.opacity = "1";
}
