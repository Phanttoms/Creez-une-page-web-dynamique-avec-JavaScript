// Imports
import { getCategory } from "./api.js";

// Récuperation des filtres
const filters = document.querySelector(".filters");

// Fonction de création des 3 boutons
async function createButton(title, categoryId, active) {
	const buttonCategory = document.createElement("button");
	buttonCategory.textContent = title;
	buttonCategory.classList.add("buttonFilter");

	if (active) {
		buttonCategory.classList.add("buttonFilter-active");
	}

	buttonCategory.addEventListener("click", () => handleFilters(categoryId));

	filters.appendChild(buttonCategory);
}

// Fonction filtrage
async function handleFilters(categoryId) {
	let allWorks = document.querySelectorAll(".work");
	console.log("Voila l'ID des filtres: " + categoryId);
	let buttonColor = document.querySelectorAll(".buttonFilter");

	allWorks.forEach((oneWork) => {
		if (
			categoryId === 0 ||
			oneWork.dataset.categorie === categoryId.toString()
		) {
			oneWork.style.display = "block";
		} else {
			oneWork.style.display = "none";
		}
	});

	// Changement de couleur de fond des boutons cliqué
	buttonColor.forEach((button, index) => {
		if (index === categoryId) {
			button.className += " buttonFilter-active";
		} else {
			button.className = "buttonFilter";
		}
	});
}
// Fonction
export async function categorieCollect() {
	getCategory().then((categories) => {
		categories.forEach((category, index) => {
			if (index === 0) {
				createButton("Tous", 0, true);
			}
			createButton(category.name, category.id, false);
		});
	});
}
