// Récuperation éléments modal
const myModal = document.getElementById("modalContainer");
const allDocBackground = document.getElementById("allDoc");

// Fonction d'ouverture ou fermeture de la modal
export async function openModal() {
	myModal.style.display = "flex";
	allDocBackground.style.opacity = "0.5";
	imgCollectModal;
}

export async function closeModal() {
	myModal.style.display = "none";
	allDocBackground.style.opacity = "1";
}

// test
const imgCollectModal = fetch("http://localhost:5678/api/works")
	.then((reponse) => reponse.json())
	.then((data) => {
		data.forEach((element) => {
			// créer balises pour accueillir les images du portfolio
			const modalGallery = document.getElementById("modalGallery");
			const maDiv = document.createElement("div");
			const myImg = document.createElement("img");

			myImg.src = element.imageUrl;
			maDiv.dataset.categorie = element.categoryId;

			maDiv.classList.add("work-modal");

			modalGallery.appendChild(maDiv);
			maDiv.appendChild(myImg);
		});
	});
