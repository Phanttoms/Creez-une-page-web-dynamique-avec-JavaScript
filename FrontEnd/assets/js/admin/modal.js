// // Import
import { getWorks, deleteWork, addWork } from "../base/api.js";
import { projectCollect } from "../base/projets.js";

// Récuperation éléments modal
const myModal = document.querySelector(".modal-container");
const modalTitle = document.querySelector(".modal-title");
const modalContent = document.querySelector(".modal-content");
const modalFooterGallery = document.querySelector(".modal-footer-gallery");
const gallery = document.querySelector(".gallery");
const modalAdd = document.querySelector(".modal-add-content");
const myModalReturnButton = document.querySelector(".modal-arrow-left");
const breakModalContent = document.querySelector(".break-content");

// Fonction d'ouverture ou fermeture de la modal
export async function openModal() {
	myModal.style.display = "block";
	myModalReturnButton.style.display = "none";
	modalAdd.style.display = "none";
	createModalGalleryPage();
}

export async function closeModal() {
	myModal.style.display = "none";
}

// Creation Modal
function createModalGalleryPage() {
	modalContent.style.display = "flex";
	breakModalContent.style.display = "block";
	modalTitle.textContent = "Galerie photo";
	modalContent.innerHTML = "";
	modalFooterGallery.style.display = "flex";
	modalFooterGallery.textContent = "Ajouter une photo";
	getWorks().then((works) => {
		works.forEach((work) =>
			modalContent.appendChild(
				createModalArticle(work.imageUrl, work.title, work.id)
			)
		);
	});
}

const createModalArticle = (imageUrl, imageName, imageId) => {
	// Création des articles de la modale
	// Creation balise
	const article = document.createElement("article");
	const articleImage = document.createElement("img");
	const deleteBtn = document.createElement("img");

	// Ajout des class
	article.classList.add("modal-article");
	articleImage.classList.add("modal-article-image");
	deleteBtn.classList.add("modal-article-button");

	// Ajout attribu et liaison des balises
	articleImage.setAttribute("src", imageUrl);
	articleImage.setAttribute("alt", imageName);
	articleImage.setAttribute("id", imageId);
	deleteBtn.src = "./assets/icons/trash-can-solid.png";
	article.appendChild(articleImage);
	article.appendChild(deleteBtn);
	modalContent.appendChild(article);

	// Suppression objet
	deleteBtn.addEventListener("click", async () => {
		try {
			const response = await deleteWork(imageId);
			if (response.status === 204) {
				createModalGalleryPage();
				gallery.innerHTML = "";
				projectCollect();
				console.log("Objet supprimé.");
			} else if (response.status === 401) {
				console.log("Suppression non-autorisé.");
			} else {
				console.log("Comportement inattendu.");
			}
		} catch (error) {
			console.log(error);
		}
	});
	return article;
};

// Creation de la modal d'Add
export async function openModalAdd() {
	modalContent.style.display = "none";
	modalAdd.style.display = "flex";
	myModalReturnButton.style.display = "block";
	breakModalContent.style.display = "none";
	modalFooterGallery.style.display = "none";
	createModalAdd();

	// Element modal add
	const addImgButton = document.querySelector(".add-img-button");
	const addImgInput = document.querySelector(".add-img-input");

	// liason bouton et input img
	addImgButton.addEventListener("click", function (event) {
		event.preventDefault();
		addImgInput.click();
	});

	// Listener bouton Submit
	const submitBtn = document.querySelector(".submit-button");
	submitBtn.addEventListener("click", function (event) {
		event.preventDefault();
		console.log("click sur le bouton submit");
	});

	// Verification des inputs image et titre
	const photoInput = document.querySelector(".add-img-input");
	const titleInput = document.querySelector("#upload-title");
	const category = document.querySelector(".modal-add-select");
	photoInput.addEventListener("change", fileInput);
	titleInput.addEventListener("input", isUploadFormValid);
	category.addEventListener("change", isUploadFormValid);
}

// Modal Add construction
const form = document.querySelector(".modal-add-content");

async function createModalAdd() {
	modalTitle.textContent = "Ajout photo";
	form.innerHTML = "";

	// Div Image
	createDivImg();

	// Input Title
	createDivTitle();

	// Input
	createDivCategory();

	// Ajout break
	const modalBreak = document.createElement("div");
	modalBreak.classList.add("break");
	modalBreak.style.width = "100%";

	form.appendChild(modalBreak);

	// Bouton de validation
	const formValidationButton = document.createElement("button");
	formValidationButton.classList.add("button-action");
	formValidationButton.classList.add("submit-button");
	formValidationButton.textContent = "Valider";

	form.appendChild(formValidationButton);
}

// fonction Creation div Image
async function createDivImg() {
	// Creation des elements
	// Div Image
	const modalImgBox = document.createElement("div");
	modalImgBox.classList.add("modal-add-image");

	// Preview
	const ModalNewImg = document.createElement("img");
	ModalNewImg.classList.add("add-img-preview");
	ModalNewImg.src = "";
	ModalNewImg.alt = "";
	modalImgBox.appendChild(ModalNewImg);

	// Holder
	const modalAddIcone = document.createElement("img");
	modalAddIcone.src = "./assets/icons/test-pic.png";
	modalAddIcone.classList.add("add-img-icone");
	modalImgBox.appendChild(modalAddIcone);

	// Bouton d'ouverture de l'input
	const modalButtonImg = document.createElement("button");
	modalButtonImg.classList.add("add-img-button");
	modalButtonImg.textContent = "+ Ajouter photo";
	modalImgBox.appendChild(modalButtonImg);

	// Input lié au button
	const modalInputImg = document.createElement("input");
	modalInputImg.type = "file";
	modalInputImg.id = "file-Input";
	modalInputImg.classList.add("add-img-input");
	modalInputImg.accept = "image/png, image/jpeg";
	modalImgBox.appendChild(modalInputImg);

	// Text sous le bouton
	const modalImgText = document.createElement("p");
	modalImgText.classList.add("add-img-text");
	modalImgText.textContent = "jpg, png: 4mo max";
	modalImgBox.appendChild(modalImgText);

	// Ajout de la Div Image dans le Form
	form.appendChild(modalImgBox);
}

// Fonction Title image
async function createDivTitle() {
	// Div titre
	const modalTitleBox = document.createElement("div");
	modalTitleBox.classList.add("modal-add-input-box");

	// Balise Label titre
	const modalTitleLabel = document.createElement("label");
	modalTitleLabel.htmlFor = "add-title";
	modalTitleLabel.classList.add("modal-input-title");
	modalTitleLabel.textContent = "Titre";
	modalTitleBox.appendChild(modalTitleLabel);

	// Champ de text pour le titre du projet
	const modalTitleInput = document.createElement("input");
	modalTitleInput.type = "text";
	modalTitleInput.id = "upload-title";
	modalTitleInput.classList.add("modal-input");
	modalTitleInput.classList.add("modal-add-input");
	modalTitleBox.appendChild(modalTitleInput);

	// ajout de Div Title Input dans le form
	form.appendChild(modalTitleBox);
}

// Fonction Categorie image
async function createDivCategory() {
	// Div Categorie
	const modalCategoryBox = document.createElement("div");
	modalCategoryBox.classList.add("modal-add-input-box");

	// Balise Label titre
	const modalCategoryLabel = document.createElement("label");
	modalCategoryLabel.htmlFor = "add-category";
	modalCategoryLabel.classList.add("modal-input-title");
	modalCategoryLabel.textContent = "Catégorie :";
	modalCategoryBox.appendChild(modalCategoryLabel);

	// Champ de selection pour la categorie du projet
	const modalCategorySelect = document.createElement("select");
	modalCategorySelect.id = "add-category";
	modalCategorySelect.classList.add("modal-input");
	modalCategorySelect.classList.add("modal-add-select");

	const option0 = document.createElement("option");
	option0.value = "0";
	option0.classList.add("optionId");
	option0.textContent = "";
	modalCategorySelect.appendChild(option0);

	const option1 = document.createElement("option");
	option1.value = "1";
	option1.classList.add("optionId");
	option1.textContent = "Objet";
	modalCategorySelect.appendChild(option1);

	const option2 = document.createElement("option");
	option2.value = "2";
	option2.classList.add("optionId");
	option2.textContent = "Appartements";
	modalCategorySelect.appendChild(option2);

	const option3 = document.createElement("option");
	option3.value = "3";
	option3.classList.add("optionId");
	option3.textContent = "Hôtels & Restaurants";
	modalCategorySelect.appendChild(option3);

	modalCategoryBox.appendChild(modalCategorySelect);

	form.appendChild(modalCategoryBox);
}

// Fonction de gestion des filtres
async function handleFileUpload() {
	// Récupération des données du formulaire
	const photoFile = document.querySelector(".add-img-input").files[0];
	const photoTitle = document.querySelector(".modal-add-input").value;
	const photoCategory = document.querySelector(".modal-add-select").value;

	// Création de l'objet FormData et ajout des données
	let formData = new FormData();
	formData.append("image", photoFile);
	formData.append("title", photoTitle);
	formData.append("category", photoCategory);

	try {
		// Appel de la fonction addWork pour envoyer les données
		const response = await addWork(formData);

		if (response.status === 201) {
			// Traitement de la réponse en cas de succès
			const work = await response.json();
			let category = { id: parseInt(work.categoryId) };

			// Détermination du nom de la catégorie en fonction de l'ID
			if (work.categoryId === "1") category.name = "Objets";
			if (work.categoryId === "2") category.name = "Appartements";
			if (work.categoryId === "3") category.name = "Hôtels & restaurants";

			work.category = category;

			// Ajout du travail dans le tableau "works"
			getWorks().then((works) => {
				works.push(work);

				// Mise à jour de la galerie et des pages modales
				openModalAdd();
				gallery.innerHTML = "";
				projectCollect();
			});

			// Affichage de la notification de succès
			alert("Travail ajouté avec succès!!");
		} else if (response.status === 400) {
			// Cas d'echec
			alert("Mauvaise requete");
			console.log("Mauvaise requête.");
		} else if (response.status === 401) {
			// Cas d'echec
			alert("Vous n'êtes pas autorisé à ajouter une photo.");
			console.log("Non-autorisé");
		} else {
			// Cas d'echec
			alert("Erreur lors de l'ajout.");
			console.log("Erreur inatendu.");
		}
	} catch (error) {
		// Gestion des erreurs
		console.log("Impossible de joindre le serveur.");
	}
}

// Input image + preview
async function fileInput(event) {
	//fonction de gestion de l'input file//
	const photoPreview = document.querySelector(".add-img-preview");
	const icon = document.querySelector(".add-img-icone");
	const overlayBtn = document.querySelector(".add-img-button");
	const text = document.querySelector(".add-img-text");
	const file = event.target.files[0];
	const reader = new FileReader();
	const photoInput = document.querySelector(".add-img-input");

	reader.onload = () => {
		//fonction de gestion du chargement de l'image//
		photoPreview.src = reader.result;
		photoPreview.style.display = "block";
		icon.style.display = "none";
		overlayBtn.style.display = "none";
		text.style.display = "none";

		photoPreview.addEventListener("click", function (event) {
			event.preventDefault();
			photoInput.click();
		});
	};

	reader.readAsDataURL(file);
	isUploadFormValid();
}

async function isUploadFormValid() {
	//fonction de validation du formulaire//
	const modalUploadBtn = document.querySelector(".submit-button");
	const file = document.querySelector(".add-img-input").files[0];
	const title = document.querySelector(".modal-add-input").value;
	const category = document.querySelector(".modal-add-select").value;
	let categoryCheck = false;
	let fileCheck = false;
	let titleCheck = false;

	modalUploadBtn.classList.remove("btn-green");

	// Test Photo
	if (file) {
		fileCheck = true;
	}

	// Test Titre
	if (title.length > 0) {
		titleCheck = true;
	}

	// Test Categorie
	if (category * 1 > 0) {
		categoryCheck = true;
	}

	// Test des 3 champs
	if (fileCheck && titleCheck && categoryCheck) {
		modalUploadBtn.classList.add("btn-green");
		modalUploadBtn.addEventListener("click", handleFileUpload);
	} else {
		modalUploadBtn.removeEventListener("click", handleFileUpload);
		modalUploadBtn.classList.remove("btn-green");
	}
}
