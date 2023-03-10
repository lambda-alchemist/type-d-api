"use strict";

document
	.querySelector("#login-form")
	.addEventListener("submit", async (event) => {
		event.preventDefault();
		
		const email = document.querySelector("#email").value;
		const password = document.querySelector("#password").value;

		const response = await fetch(
			"/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: email,
					password: password,
				}),
			},
		);
		if (response.status >= 200 && response.status <= 226) {
			window.location.replace("/lister");
		}
	}
);
