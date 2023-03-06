"use strict";

document
	.querySelector("#task-form")
	.addEventListener("submit", async (event) => {
		event.preventDefault();
		const taskName = document.querySelector("#task-name").value;
		const descText = document.querySelector("#desc-text").value;
		const dueDate = document.querySelector("#due-date").value;
		const response = await fetch(
			"/api/crud/task", {
				method: "POST",
				headers: { "Content-Type": "application/json", },
				body: JSON.stringify({
					name: taskName,
					desc: descText,
					date: dueDate,
				}),
			},
		);
		if (response.ok) {
			window.location.replace("/lister");
		}
	}
);
