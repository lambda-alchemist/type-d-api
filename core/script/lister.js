"use strict";

function renderTodoTasks(task) {
	const todoTasksList = document.querySelector(".list-group");
	todoTasksList.innerHTML = "";
	task.forEach(
		(todo) => {
			const listItem = document.createElement("li");
			listItem.classList.add("list-group-item");
			const name = `<span>${todo.title}<span/>`;
			listItem.innerHTML = `${name}`;
			todoTasksList.appendChild(listItem);
		},
	);
}

async function fetchTodoTasks() {
	const response = await fetch("/api/crud/task", { method: "GET" });
	const body = await response.json();
	if (response.ok) {
		const tasks = body.data;
		renderTodoTasks(tasks);
	} else {
		console.error("Failed to fetch todo tasks:", data.message);
	}
}

window.addEventListener(
	"load",
	await fetchTodoTasks(),
);
