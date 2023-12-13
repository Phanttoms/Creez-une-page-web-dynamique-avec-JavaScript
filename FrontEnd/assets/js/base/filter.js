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
	let buttonColor = document.querySelectorAll(".buttonFilter");

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

	buttonColor.forEach((button, index) => {
		const tous = buttonColor[0];
		if (index === categoryId) {
			console.log("yeah");
			button.className += " buttonFilter-active";
		} else if (categoryId === "") {
			tous.className += " buttonFilter-active";
			button.className = "buttonFilter";
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
				createButton("Tous", "");
			}
			createButton(category.name, category.id);
		});
	});
}
