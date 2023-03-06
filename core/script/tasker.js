"use strict";

function renderTask(task) {
	const el = document.querySelector("#task");

	const h = document.createElement("h1");
	const p = document.createElement("p");

	h.classList.add("card-title");
	p.classList.add("card-text");

	h.innerHTML = task.title;
	p.innerHTML = task.description;

	el.innerHTML = "";
	el.appendChild(h);
	el.appendChild(p);

	//TODO: finish this.
}

async function fetchTodoTask() {
	const response = await fetch(`/api/crud/task/${uuid}`, { method: "GET" });
	const body = await response.json();
	if (response.ok) {
		renderTask(body.data);
	} else {
		console.error("Failed to retrieve Task data, error:")
	}
}

window.addEventListener(
	"load",
	await fetchTodoTask(event)
);
