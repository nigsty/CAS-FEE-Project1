const data = getSavedTodos();
const emptyMessage = 'There are no To-dos yet to list here.';

let placeholder = data.completed ? completed : todo;

//disply saved notes, if none --no data message-- will display
if (data && data.length) {
	sortRender(data, filters);
} else {
	document.getElementById('todo').dataset.content = emptyMessage;
}

//filtered and sorted notes will display
const getNotesBy = document.getElementById('get-notes-by');

getNotesBy.addEventListener('click', (event) => {
	let elementClicked = event.target;
	const todoList = getSavedTodos();
	const elements = document.getElementsByClassName('filter-button');
	for (let i = 0; i < elements.length; i++) {
		elements[i].classList.remove('active');
	}

	elementClicked.classList.add('active');
	//Get todos filter finished date
	if (elementClicked.id === 'finished') {
		const filteredItems = todoList.filter((item) => item.completed);
		placeholder.innerHTML = '';
		filteredItems.forEach((filteredItem) => attachToDOM(filteredItem));
	} else {
		//Get notes sorted by finishing date
		if (elementClicked.id === 'finish-date') {
			filters.sortBy = 'doneUntilValue';
			sortRender(todoList, filters);
		}
		//Get notes sorted by created date
		if (elementClicked.id === 'created-date') {
			filters.sortBy = 'createdOn';
			sortRender(todoList, filters);
		}
		//Get notes sorted by todos importancy
		if (elementClicked.id === 'importance') {
			filters.sortBy = 'importancyValue';
			sortRender(todoList, filters);
		}

		document.getElementById('todo').dataset.content = emptyMessage;
	}
});
