// // Import
import { getWorks, getCategory, deleteWork } from "../base/api.js";
import { projectCollect } from "../base/projets.js";

// Récuperation éléments modal
const myModal = document.querySelector(".modal-container");
const allDocBackground = document.getElementById("allDoc");
const modalTitle = document.querySelector(".modal-title");
const modalContent = document.querySelector(".modal-content");
const modalFooterGallery = document.querySelector(".modal-footer-gallery");
const gallery = document.querySelector(".gallery");

// Fonction d'ouverture ou fermeture de la modal
export async function openModal() {
	myModal.style.display = "block";
	createModalGalleryPage();
}

export async function closeModal() {
	myModal.style.display = "none";
}

function createModalGalleryPage() {
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
		try {
			const response = await deleteWork(imageId);
			if (response.status === 204) {
				createModalGalleryPage();
				gallery.innerHTML = "";
				projectCollect();
			} else if (response.status === 401) {
				console.log("nope 1");
			} else {
				console.log("nope 2");
			}
		} catch (error) {
			console.log(error);
		}
	});
	return article;
};

// test
