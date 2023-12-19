// Adresse de l'API
const urlApi = "http://localhost:5678/api";

// Fonction de récuperation des traveaux
export async function getWorks() {
	try {
		const response = await fetch(`${urlApi}/works`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log("Impossible de joindre le serveur :(");
	}
}

// Fonction de récuperation des catégories
export async function getCategory() {
	try {
		const response = await fetch(`${urlApi}/categories`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log("Impossible de joindre le serveur (catégories) :(");
	}
}
