// Adresse de l'API
export const urlApi = "http://localhost:5678/api";

// Fonction de récuperation des traveaux
export async function getWorks() {
	try {
		const response = await fetch(`${urlApi}/works`);
		const data = await response.json();
		console.log("Tout va bien :)");
		return data;
	} catch (error) {
		console.log("Impossible de joindre le serveur :(");
	}
}
