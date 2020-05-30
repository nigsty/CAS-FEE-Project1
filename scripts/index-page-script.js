const data = getSavedTodos();

let placeholder = data.completed ? completed : todo;

const searchDisplay = document.getElementById('search-display');

searchDisplay.addEventListener('click', (event) => {
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
		filteredItems.forEach((filteredItem) => attachToDom(filteredItem));
	} else {
		//Get todos sorted by finishing date
		if (elementClicked.id === 'finish-date') {
			filters.sortCriteria = 'doneUntilValue';
			renderFiltered(todoList, filters);
		}
		//Get todos sorted by created date
		if (elementClicked.id === 'created-date') {
			filters.sortCriteria = 'createdOn';
			renderFiltered(todoList, filters);
		}
		//Get todos sorted by todos importancy
		if (elementClicked.id === 'importance') {
			filters.sortCriteria = 'importancyValue';
			renderFiltered(todoList, filters);
		}

		document.getElementById('todo').dataset.content = 'There are no To-do items yet to list here.';
	}
});

renderFiltered(data, filters);
