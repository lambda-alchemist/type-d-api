"use strict";

document
	.querySelector("#signup-form")
	.addEventListener("submit", async(event) => {
		event.preventDefault();
		const username = document.querySelector("#name").value;
		const email = document.querySelector("#email").value;
		const password = document.querySelector("#password").value;
		const passwordConfirm = document.querySelector("#confirm-password").value;
		const response = await fetch("/api/auth/signup", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				username,
				email,
				password,
			}),
		});
		if (response.status >= 200 && response.status <= 226) {
			window.location.replace("/login");
		}
	}
)
