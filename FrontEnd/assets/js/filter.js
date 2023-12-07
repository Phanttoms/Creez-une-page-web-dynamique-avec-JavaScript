// Imports
import { getWorks, getCategory } from "./api.js";

// Récuperation des filtres
const filters = document.querySelector(".filtres");

// Fonction de création des 3 boutons
export async function createButton(title, categoryId) {
	const buttonCategory = document.createElement("button");
	buttonCategory.textContent = title;
	buttonCategory.classList.add("buttonFilter");
	filters.appendChild(buttonCategory);
}

// Fonction filtrage

// Fonction
