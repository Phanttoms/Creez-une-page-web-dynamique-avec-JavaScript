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
			const myDiv = document.createElement("div");
			const myImg = document.createElement("img");
			const trash = document.createElement("img");
			const trashBox = document.createElement("div");

			myImg.src = element.imageUrl;
			myDiv.dataset.categorie = element.categoryId;

			trash.src = "./assets/icons/trash-can-solid.png";
			myDiv.classList.add("work-modal");
			myImg.classList.add("modal-img");
			trash.classList.add("trash");
			trashBox.classList.add("trash-div");

			modalGallery.appendChild(myDiv);
			myDiv.appendChild(myImg);
			myDiv.appendChild(trashBox);
			trashBox.appendChild(trash);
		});
	});
