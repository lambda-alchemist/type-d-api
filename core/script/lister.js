"use strict";

function renderTodoTasks(task) {
	const ul = document.querySelector(".list-group");
	ul.innerHTML = "";
	task.forEach(
		({ uuid, title, completed }) => {
			const li = document.createElement("li");
			li.setAttribute("href", `/tasker?uuid=${}`);
			li.classList.add("list-group-item");
			li.classList.add("list-group-item-action");
			if (completed) {
				li.classList.add("list-group-item-success");
			} else {
				li.classList.add("list-group-item-warning")
			}
			li.innerHTML = title;
			ul.appendChild(li);
		},
	);
}

async function fetchTodoTasks() {
	const response = await fetch("/api/crud/task", { method: "GET" });
	const body = await response.json();
	if (response.ok) {
		renderTodoTasks(body.data);
	} else {
		console.error("Failed to fetch todo tasks:", data.message);
	}
}

window.addEventListener(
	"load",
	await fetchTodoTasks(event)
);
