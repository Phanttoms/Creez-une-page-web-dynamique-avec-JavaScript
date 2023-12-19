// Import
import { getWorks } from "../base/api.js";

// Récuperation éléments modal
const myModal = document.getElementById("modalContainer");
const allDocBackground = document.getElementById("allDoc");

// Fonction d'ouverture ou fermeture de la modal
export async function openModal() {
	myModal.style.display = "flex";
	allDocBackground.style.opacity = "0.5";
	imgCollectModal;
}

export async function closeModal() {
	myModal.style.display = "none";
	allDocBackground.style.opacity = "1";
}

// Creation de la gallerie dans la modal
const imgCollectModal = getWorks().then((data) => {
	data.forEach((element) => {
		// Créer balises pour accueillir les images du portfolio
		const modalGallery = document.getElementById("modalGallery");
		const myDiv = document.createElement("div");
		const myImg = document.createElement("img");
		const trash = document.createElement("img");

		myImg.src = element.imageUrl;
		myDiv.dataset.categorie = element.categoryId;

		// Listener pour suppression de projet
		trash.dataset.id = element.id;
		trash.addEventListener("click", deleteWork);

		// Ajout des class et src pour les balises crée
		trash.src = "./assets/icons/trash-can-solid.png";
		myDiv.classList.add("work-modal");
		myImg.classList.add("modal-img");
		trash.classList.add("trash");

		// Ajout au HTML des balises
		modalGallery.appendChild(myDiv);
		myDiv.appendChild(myImg);
		myDiv.appendChild(trash);
	});
});

// Fonction de suppression des projets de la gellerie
function deleteWork(e) {
	e.preventDefault();

	fetch(`http://localhost:5678/api/works/${e.target.dataset.id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Origin: "http://localhost:5500/",
			Authorization: `Bearer ${localStorage.token}`,
		},
	}).then((response) => {
		if (response.ok) {
			e.target.parentElement.remove();
		} else {
			console.error("La suppression a échoué.");
		}
	});
}
