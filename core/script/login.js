"use strict";

document
	.querySelector("#login-form")
	.addEventListener("submit", async (event) => {
		event.preventDefault();
		const email = document.querySelector("#email").value;
		const password = document.querySelector("#password").value;
		const headers = {
			"Content-Type": "application/json",
		};
		const body = JSON.stringify({
			email: email,
			password: password,
		});
		const response = await fetch(
			"/api/auth/login",
			{
				method: "POST",
				headers: headers,
				body: body,
			},
		);
		if (response.status >= 200 && response.status <= 226) {
			window.location.replace("/lister");
		}
	}
);
