// Import
import { openModal, closeModal } from "./modal.js";

// Récuperation d'élément
const token = localStorage.getItem("token");
const header = document.getElementById("adminHeader");
const filter = document.getElementById("hideFilter");
const myModalOpenButton = document.getElementById("adminButton");
const myModalCloseButton = document.getElementById("crossRight");

// Mise a jour du boutton de Login en fonction du token de connection
const isLogged = () => (token ? true : false);

function logOut() {
	localStorage.clear("token");
	console.log("disconnected");
	window.location.reload();
}

async function loginButtonUpdate() {
	const loginButton = document.querySelector("#loginButton");
	if (isLogged()) {
		loginButton.href = "#";
		loginButton.innerText = "logout";
		loginButton.addEventListener("click", () => {
			logOut();
			loginButton.innerText = "login";
		});
	}
}

async function updateUI() {
	if (isLogged()) {
		header.style.display = "flex";
		myModalOpenButton.style.display = "flex";
		filter.style.display = "none";
	}
}

// Listener de lancement des fonctions ADMIN
window.addEventListener("load", () => {
	loginButtonUpdate();
	updateUI();
});

// Ouverture ou fermeture de la modal
myModalOpenButton.addEventListener("click", openModal);
myModalCloseButton.addEventListener("click", closeModal);

// // test
// const imgCollectModal = fetch("http://localhost:5678/api/works")
// 	.then((reponse) => reponse.json())
// 	.then((data) => {
// 		data.forEach((element) => {
// 			// créer balises pour accueillir les images du portfolio
// 			const modalGallery = document.querySelector(".modal-gallery");
// 			const maDiv = document.createElement("div");
// 			const myImg = document.createElement("img");

// 			myImg.src = element.imageUrl;
// 			maDiv.dataset.categorie = element.categoryId;

// 			maDiv.classList.add("work-modal");

// 			modalGallery.appendChild(maDiv);
// 			maDiv.appendChild(myImg);
// 		});
// 	});
