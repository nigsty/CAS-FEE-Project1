const data = getSavedTodos();

// get the note from input form, save and reassign to main page
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	addNote();
	location.assign('index.html');
});

titleValidat();
