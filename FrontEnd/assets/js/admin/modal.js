// // Import
import { getWorks, deleteWork, addWork } from "../base/api.js";
import { projectCollect } from "../base/projets.js";

// Récuperation éléments modal
const myModal = document.querySelector(".modal-container");
const modalTitle = document.querySelector(".modal-title");
const modalContent = document.querySelector(".modal-content");
const modalFooterGallery = document.querySelector(".modal-footer-gallery");
const gallery = document.querySelector(".gallery");
const modalAdd = document.querySelector(".modal-add-content");
const myModalReturnButton = document.querySelector(".modal-arrow-left");
const breakModalContent = document.querySelector(".break-content");

// Fonction d'ouverture ou fermeture de la modal
export async function openModal() {
	myModal.style.display = "block";
	myModalReturnButton.style.display = "none";
	modalAdd.style.display = "none";
	createModalGalleryPage();
}

export async function closeModal() {
	myModal.style.display = "none";
}

// Creation Modal
function createModalGalleryPage() {
	modalContent.style.display = "flex";
	breakModalContent.style.display = "block";
	modalTitle.textContent = "Galerie photo";
	modalContent.innerHTML = "";
	modalFooterGallery.style.display = "flex";
	modalFooterGallery.textContent = "Ajouter une photo";
	getWorks().then((works) => {
		works.forEach((work) =>
			modalContent.appendChild(
				createModalArticle(work.imageUrl, work.title, work.id)
			)
		);
	});
}

const createModalArticle = (imageUrl, imageName, imageId) => {
	// Création des articles de la modale
	// Creation balise
	const article = document.createElement("article");
	const articleImage = document.createElement("img");
	const deleteBtn = document.createElement("img");

	// Ajout des class
	article.classList.add("modal-article");
	articleImage.classList.add("modal-article-image");
	deleteBtn.classList.add("modal-article-button");

	// Ajout attribu et liaison des balises
	articleImage.setAttribute("src", imageUrl);
	articleImage.setAttribute("alt", imageName);
	articleImage.setAttribute("id", imageId);
	deleteBtn.src = "./assets/icons/trash-can-solid.png";
	article.appendChild(articleImage);
	article.appendChild(deleteBtn);
	modalContent.appendChild(article);

	// Suppression objet
	deleteBtn.addEventListener("click", async () => {
		try {
			const response = await deleteWork(imageId);
			if (response.status === 204) {
				createModalGalleryPage();
				gallery.innerHTML = "";
				projectCollect();
				console.log("Objet supprimé.");
			} else if (response.status === 401) {
				console.log("Suppression non-autorisé.");
			} else {
				console.log("Comportement inattendu.");
			}
		} catch (error) {
			console.log(error);
		}
	});
	return article;
};
