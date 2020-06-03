const data = getSavedTodos();

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	add_item();
	location.assign('index.html');
});

titleValidat();
