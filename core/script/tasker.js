async function fetchTodoTask() {
	const response = await fetch("/api/crud/task", { method: "GET" });
	const body = await response.json();
}

window.addEventListener(
	"load",
	await fetchTodoTask(event)
);
