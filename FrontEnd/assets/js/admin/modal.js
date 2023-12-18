// Récuperation éléments modal
const myModal = document.getElementById("modalContainer");

// Fonction d'ouverture ou fermeture de la modal
export async function openModal() {
	myModal.style.display = "flex";
}

export async function closeModal() {
	myModal.style.display = "none";
}
