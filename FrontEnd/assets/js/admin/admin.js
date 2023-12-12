const token = localStorage.getItem("token");

// Mise a jour du boutton de Login en fonction du token de connection
const isLogged = () => (token ? true : false);

const logOut = () => {
	localStorage.clear("token");
	console.log("disconnected");
	window.location.reload();
};

const loginButtonUpdate = () => {
	const loginButton = document.querySelector("#loginButton");
	if (isLogged()) {
		loginButton.href = "#";
		loginButton.innerText = "logout";
		loginButton.addEventListener("click", () => {
			logOut();
			loginButton.innerText = "login";
		});
	}
};

window.addEventListener("load", () => {
	loginButtonUpdate();
	// updateUI();
});
