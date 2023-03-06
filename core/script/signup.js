"use strict";

async function peroformSignup(event) {
	event.preventDefault();

	const username = document.querySelector("#name").value;
	const email = document.querySelector("#email").value;
	const password = document.querySelector("#password").value;
	const passwordConfirm = document.querySelector("#confirm-password").value;

	const data = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			username,
			email,
			password,
		}),
	};

	const response = await fetch("/api/auth/signup", data);

	if (response.status >= 200 && response.status <= 226) {
		window.location.replace("/login");
	}
}

document
	.querySelector("#signup-form")
	.addEventListener(
		"submit",
		await peroformSignup(event),
	);
