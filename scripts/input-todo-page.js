//why is declared as data again why not just call the function?
const data = getSavedTodos();

const form = document.querySelector('form');
const todo = document.querySelector('#todo');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	add_item();
	location.assign('index.html');
});

titleValidat();