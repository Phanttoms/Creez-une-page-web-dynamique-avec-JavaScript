// Imports
import { getCategory } from "./api.js";

// Récuperation des filtres
const filters = document.querySelector(".filters");

// Fonction de création des 3 boutons
async function createButton(title, categoryId) {
	const buttonCategory = document.createElement("button");
	buttonCategory.textContent = title;
	buttonCategory.classList.add("buttonFilter");

	buttonCategory.addEventListener("click", () => handleFilters(categoryId));

	filters.appendChild(buttonCategory);
}

// Fonction filtrage
async function handleFilters(categoryId) {
	let allWorks = document.querySelectorAll(".work");
	console.log("Voila l'ID des filtres: " + categoryId);

	allWorks.forEach((oneWork) => {
		if (
			categoryId === "" ||
			oneWork.dataset.categorie === categoryId.toString()
		) {
			oneWork.style.display = "block";
		} else {
			oneWork.style.display = "none";
		}
	});
}

// Fonction
export async function categorieCollect() {
	getCategory().then((categories) => {
		categories.forEach((category, index) => {
			if (index === 0) {
				createButton("Tous", "");
			}
			createButton(category.name, category.id);
		});
	});
}
