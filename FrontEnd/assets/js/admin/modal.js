// // Import
import { getWorks, getCategory, deleteWork } from "../base/api.js";
import { projectCollect } from "../base/projets.js";
import { categorieCollect } from "../base/filter.js";

// Récuperation éléments modal
const myModal = document.querySelector(".modal");
const allDocBackground = document.getElementById("allDoc");
const modalTitle = document.querySelector(".modal-title");
const modalContent = document.querySelector(".modal-content");
const modalFooterGallery = document.querySelector(".modal-footer-gallery");

// Fonction d'ouverture ou fermeture de la modal
export async function openModal() {
	myModal.style.display = "flex";
	allDocBackground.style.opacity = "0.5";
	createModalGalleryPage();
}

export async function closeModal() {
	myModal.style.display = "none";
	allDocBackground.style.opacity = "1";
}

function createModalGalleryPage() {
	modalTitle.textContent = "Galerie photo";
	modalContent.innerHTML = "";
	modalFooterGallery.style.display = "flex";
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
	const article = document.createElement("article");
	const articleImage = document.createElement("img");
	const deleteBtn = document.createElement("img");

	article.classList.add("modal-article");
	articleImage.classList.add("modal-article-image");
	deleteBtn.classList.add("modal-article-button");

	articleImage.setAttribute("src", imageUrl);
	articleImage.setAttribute("alt", imageName);
	articleImage.setAttribute("id", imageId);
	deleteBtn.src = "./assets/icons/trash-can-solid.png";
	article.appendChild(articleImage);
	article.appendChild(deleteBtn);
	modalContent.appendChild(article);

	deleteBtn.addEventListener("click", async () => {
		console.log("salut");
		try {
			const response = await deleteWork(imageId);
			if (response.status === 204) {
				createModalGalleryPage();
			} else if (response.status === 401) {
				console.log("nope 1");
			} else {
				console.log("nope 2");
			}
		} catch (error) {
			// notificationTypo(error, "negative");
			console.log(error);
		}
	});
	return article;
};
