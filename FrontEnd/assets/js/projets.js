// Import
import { getWorks } from "./api.js";

// Création du HTML "Mes Projets"
export async function projectCollect() {
	getWorks().then((data) => {
		data.forEach((element) => {
			createGallery(element);
		});
	});
}

async function createGallery(element) {
	// Creation des balises
	const gallery = document.querySelector(".gallery");
	const contentDiv = document.createElement("div");
	const contentImg = document.createElement("img");
	const contentTitle = document.createElement("figcaption");

	// Ajout de la classe "work" à "contentDiv" et ajout de l'URL à "contentImg"
	contentDiv.classList.add("work");
	contentImg.src = element.imageUrl;
	contentTitle.innerHTML = element.title;

	// Ajout ID contentDiv
	contentDiv.dataset.categorie = element.categoryId;

	// Assignation des balises
	gallery.appendChild(contentDiv);
	contentDiv.appendChild(contentImg);
	contentDiv.appendChild(contentTitle);
}
