// Imports
import { projectCollect } from "./projets.js";
import { categorieCollect } from "./filter.js";

// Appel de la fonction de creation de "Mes Projets"
projectCollect();

// Appel de la fonction de creation des "Filtres"
categorieCollect();

// smooth scroll //
const linkPortfolio = document.querySelector("#navProject");
const linkContact = document.querySelector("#navContact");
const portfolioSection = document.querySelector("#portfolio");
const contactSection = document.querySelector("#contact");

linkPortfolio.addEventListener("click", (event) => {
	event.preventDefault();
	portfolioSection.scrollIntoView({
		behavior: "smooth",
	});
});

linkContact.addEventListener("click", (event) => {
	event.preventDefault();
	contactSection.scrollIntoView({
		behavior: "smooth",
	});
});
