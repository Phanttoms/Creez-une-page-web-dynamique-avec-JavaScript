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

// Fonction de delete des traveaux
export async function deleteWork(workId) {
	// fonction de suppression de travaux via l'id en paramètre + appel api
	const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${sessionStorage.getItem("token")}`,
		},
	});
	return response;
}

// Fonction d'ajout de traveaux
export async function addWork(work) {
	// fonction d'ajout de travaux via le formulaire + appel api
	const response = await fetch(`${urlApi}/works`, {
		method: "POST",
		body: work,
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${sessionStorage.getItem("token")}`,
		},
	});
	return response;
}
