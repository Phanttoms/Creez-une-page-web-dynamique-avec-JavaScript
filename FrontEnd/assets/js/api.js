// Adresse de l'API
const urlApi = "http://localhost:5678/api";

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

// Fonction de récuperation des catégories
export async function getCategory() {
	try {
		const response = await fetch(`${urlApi}/categories`);
		const data = await response.json();
		console.log("Catégories chargé, c'est bon :)");
		return data;
	} catch (error) {
		console.log("Impossible de joindre le serveur (catégories) :(");
	}
}

// Fonction Login
// export async function getLogin(email, password) {
// 	try {
// 		const response = await fetch(`${urlApi}/users/login`, {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify({
// 				email,
// 				password,
// 			}),
// 		});
// 		console.log("Serveur (Users/Login) fonctionnel");
// 		return response; // retourne la réponse de l'api
// 	} catch (error) {
// 		console.log("Impossible de joindre le serveur (Users/Login)");
// 	}
// }
