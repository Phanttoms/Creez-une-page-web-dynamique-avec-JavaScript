const modal = document.querySelector(".modal");

const modalBackwardBtn = document.querySelector(".modalBackward");

const modalCloseBtn = document.querySelector(".modal__button--close");

const modalTitle = document.querySelector(".modal__title");

const modalContent = document.querySelector(".modal__content");

const modalAddBtn = document.querySelector(".modal__footer__button--add");

const modalFooterUpload = document.querySelector(".modal__footer__upload");

const modalFooterGallery = document.querySelector(".modal__footer__gallery");

modal.addEventListener("click", (event) => {
	const modalContainer = document.querySelector(".modal__container");
	if (!modalContainer.contains(event.target)) {
		closeModal();
	}
});

modalCloseBtn.addEventListener("click", closeModal);
modalBackwardBtn.addEventListener("click", createModalGalleryPage);

function openModal() {
	modal.style.display = "flex";
	createModalGalleryPage();
}

function closeModal() {
	modal.style.display = "none";
}

//gallerie modale//
function createModalGalleryPage() {
	modalTitle.textContent = "Galerie photo";
	modalContent.innerHTML = "";
	modalBackwardBtn.style.display = "none";
	modalFooterUpload.style.display = "none";
	modalFooterGallery.style.display = "flex";
	works.forEach((work) =>
		modalContent.appendChild(
			createModalArticle(work.imageUrl, work.title, work.id)
		)
	);
	modalAddBtn.addEventListener("click", createModalUploadPage);
}
//uplaod des travaux
function createModalUploadPage() {
	const modalUploadBtn = document.querySelector(
		".modal__footer__button--upload"
	);
	modalAddBtn.removeEventListener("click", createModalUploadPage);
	modalUploadBtn.classList.remove("bg-green");
	modalUploadBtn.removeEventListener("click", handleFileUpload);
	modalTitle.textContent = "Ajout photo";
	modalContent.innerHTML = "";
	modalBackwardBtn.style.display = "block";
	modalFooterGallery.style.display = "none";
	modalFooterUpload.style.display = "block";
	modalContent.appendChild(createModalForm());
	const titleInput = document.querySelector("#upload-title");
	const photoInput = document.querySelector(".upload-form__file-input");
	titleInput.addEventListener("input", isUploadFormValid);
	photoInput.addEventListener("change", fileDInput);
}

//gestion des travaux//
async function handleFileUpload() {
	// Récupération des données du formulaire
	const photoFile = document.querySelector(".upload-form__file-input").files[0];
	const photoTitle = document.querySelector(".upload-form__input").value;
	const photoCategory = document.querySelector(".upload-form__select").value;

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
			works.push(work);

			// Mise à jour de la galerie et des pages modales
			createGallery(works);
			createModalGalleryPage();
			createModalUploadPage();

			// Affichage de la notification de succès
			notificationTypo("Travail ajouté avec succès!!", "positive");
		} else if (response.status === 400) {
			notificationTypo(`Error`, "negative");
		} else if (response.status === 401) {
			notificationTypo(
				`Vous n'êtes pas autorisé à ajouter une photo`,
				"negative"
			);
		} else {
			notificationTypo(`Erreur lors de l'ajout`, "negative");
		}
	} catch (error) {
		// Gestion des erreurs
		notificationTypo(error, "negative");
	}
}
//
function fileDInput(event) {
	//fonction de gestion de l'input file//
	const photoPreview = document.querySelector(".upload-form__image");
	const icon = document.querySelector(".upload-form__icon");
	const overlayBtn = document.querySelector(".upload-form__overlay-button");
	const text = document.querySelector(".upload-form__text");
	const file = event.target.files[0];
	const reader = new FileReader();

	reader.onload = () => {
		//fonction de gestion du chargement de l'image//
		photoPreview.src = reader.result;
		photoPreview.style.display = "block";
		icon.style.display = "none";
		overlayBtn.style.display = "none";
		text.style.display = "none";
		photoPreview.removeEventListener("click", imageClick);
		photoPreview.addEventListener("click", imageClick);
	};

	reader.readAsDataURL(file);
	isUploadFormValid();
}

function imageClick() {
	//fonction de gestion du click sur l'image//
	const photoInput = document.querySelector(".upload-form__file-input");
	photoInput.click();
}

function createModalForm() {
	//fonction de création du formulaire//
	const form = document.createElement("form");

	const uploadWrapper = document.createElement("div"); //création du wrapper//
	uploadWrapper.classList.add("upload-form__wrapper");

	const uploadImage = document.createElement("img"); //création de l'image//
	uploadImage.classList.add("upload-form__image");
	uploadImage.src = "";
	uploadImage.alt = "";
	uploadWrapper.appendChild(uploadImage); //ajout de l'image dans le wrapper//

	const uploadIcon = document.createElement("img"); //création de l'icone//
	uploadIcon.src = "./assets/icons/upload-icon.svg";
	uploadIcon.classList.add("upload-form__icon"); //ajout de la classe//
	uploadWrapper.appendChild(uploadIcon);

	const uploadLabel = document.createElement("label"); //création du label//
	uploadLabel.htmlFor = "file-input"; //ajout de l'id//
	uploadLabel.classList.add("upload-form__overlay-button");
	uploadLabel.textContent = "+Ajouter photo";
	uploadWrapper.appendChild(uploadLabel); //ajout du label dans le wrapper//

	const uploadInput = document.createElement("input"); //création de l'input//
	uploadInput.type = "file";
	uploadInput.id = "file-input";
	uploadInput.classList.add("upload-form__file-input");
	uploadInput.accept = "image/png, image/jpeg";
	uploadWrapper.appendChild(uploadInput);

	const uploadText = document.createElement("p"); //création du texte//
	uploadText.classList.add("upload-form__text");
	uploadText.textContent = "jpg, png: 4mo max";
	uploadWrapper.appendChild(uploadText);

	form.appendChild(uploadWrapper); //ajout du wrapper dans le formulaire//

	const titleGroup = document.createElement("div"); //création du groupe//
	titleGroup.classList.add("upload-form__input-group");

	const titleLabel = document.createElement("label");
	titleLabel.htmlFor = "upload-title";
	titleLabel.classList.add("upload-form__label");
	titleLabel.textContent = "Titre";
	titleGroup.appendChild(titleLabel);

	const titleInput = document.createElement("input");
	titleInput.type = "text";
	titleInput.id = "upload-title";
	titleInput.classList.add("upload-form__input");
	titleGroup.appendChild(titleInput);

	form.appendChild(titleGroup);

	const categoryGroup = document.createElement("div");
	categoryGroup.classList.add("upload-form__input-group");

	const categoryLabel = document.createElement("label");
	categoryLabel.htmlFor = "upload-category"; //ajout de l'id//
	categoryLabel.classList.add("upload-form__label");
	categoryLabel.textContent = "Catégorie :";
	categoryGroup.appendChild(categoryLabel);

	const categorySelect = document.createElement("select");
	categorySelect.id = "upload-category";
	categorySelect.classList.add("upload-form__select");

	const option1 = document.createElement("option");
	option1.value = "1";
	option1.textContent = "Objet";
	categorySelect.appendChild(option1);

	const option2 = document.createElement("option");
	option2.value = "2";
	option2.textContent = "Appartements";
	categorySelect.appendChild(option2);

	const option3 = document.createElement("option");
	option3.value = "3";
	option3.textContent = "Hôtels & Restaurants"; //ajout du texte//
	categorySelect.appendChild(option3);

	categoryGroup.appendChild(categorySelect);

	form.appendChild(categoryGroup);

	return form;
}

function isUploadFormValid() {
	//fonction de validation du formulaire//
	const modalUploadBtn = document.querySelector(
		".modal__footer__button--upload"
	);
	const sizeMsg = document.querySelector(".upload-form__text");
	const file = document.querySelector(".upload-form__file-input").files[0]; //récupération du fichier//
	const title = document.querySelector(".upload-form__input").value;
	let fileCheck = false;
	let titleCheck = false;

	modalUploadBtn.classList.remove("bg-green");
	sizeMsg.classList.remove("txt-red");

	if (file && file.size < 4194304) {
		//vérification de la taille du fichier//
		fileCheck = true;
	} else if (file && file.size > 4194304) {
		sizeMsg.classList.add("txt-red");
	}

	if (title.length > 0) {
		//vérification de la longueur du titre//
		titleCheck = true;
	}

	if (titleCheck && fileCheck) {
		modalUploadBtn.classList.add("bg-green");
		modalUploadBtn.addEventListener("click", handleFileUpload);
	} else {
		modalUploadBtn.removeEventListener("click", handleFileUpload);
		modalUploadBtn.classList.remove("bg-green");
	}
}
