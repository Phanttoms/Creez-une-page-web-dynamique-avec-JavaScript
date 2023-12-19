// Imports
import { projectCollect } from "./projets.js";
import { categorieCollect } from "./filter.js";

// Appel des projets et filtre au loading de la page
window.addEventListener("load", (event) => {
	try {
		projectCollect();
		categorieCollect();
		console.log("La page est complètement chargée.");
	} catch (error) {
		console.log(error);
		console.log("Le serveur n'a pas pu être joint.");
	}
});

// Smooth scroll //
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
