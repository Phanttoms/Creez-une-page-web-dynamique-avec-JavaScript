// Import
import { getWorks, getCategory } from "../base/api.js";

// Récuperation éléments modal
const myDeleteModal = document.getElementById("modalDeleteContainer");
const myAddModal = document.getElementById("modalAddContainer");
const allDocBackground = document.getElementById("allDoc");

// Fonction d'ouverture ou fermeture de la modal
export async function openModal() {
	myDeleteModal.style.display = "flex";
	allDocBackground.style.opacity = "0.5";
	imgCollectModal;
	myAddModal.style.display = "none";
}

export async function openAddModal() {
	myAddModal.style.display = "flex";
	allDocBackground.style.opacity = "0.5";
	myDeleteModal.style.display = "none";
	categorieSelectorModal;
}

export async function closeModal() {
	myDeleteModal.style.display = "none";
	myAddModal.style.display = "none";
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
async function deleteWork(e) {
	e.preventDefault();

	await fetch(`http://localhost:5678/api/works/${e.target.dataset.id}`, {
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

// Creation des balises pour le formulaire
const formContainer = document.querySelector("#addPhotoForm");
const labelCategory = document.createElement("label");
const inputCategory = document.createElement("select");
const optionInputCategory = document.createElement("option");

labelCategory.textContent = "Categorie";

inputCategory.classList.add("input-form");
optionInputCategory.classList.add("option-input-category");
labelCategory.classList.add("label-input");

formContainer.appendChild(labelCategory);
inputCategory.appendChild(optionInputCategory);
formContainer.appendChild(inputCategory);

// Fonction de creation du selecteur de categorie dans la modal
const categorieSelectorModal = getCategory().then((categories) => {
	categories.forEach((category) => {
		const option = document.createElement("option");
		option.value = category.id;
		option.textContent = category.name;
		inputCategory.appendChild(option);
	});
});

// test
