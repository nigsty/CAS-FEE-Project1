'use strict';
import { onChangeTask } from './modules/task-status.js';
import { editTask } from './modules/edit-task.js';

const data = getSavedTodos();

let todo = document.getElementById('todo');
let placeholder = todo;

const emptyMessage = 'There are no To-dos yet to list here.';

//display saved notes, if none --no data message-- will display
if (data && data.length) {
	sortRender(data, filters);
} else {
	todo.dataset.content = emptyMessage;
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

//description field editing
document.addEventListener('click', (e) => {
	if (e.target.classList.contains('edit')) {
		var dataId = e.target.parentElement.parentElement.getAttribute('data-id');
		editTask(parseInt(dataId));
	}
});

//checkbox task status change
document.addEventListener('change', (e) => {
	if (e.target.classList.contains('task-status')) {
		var dataId = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute(
			'data-id'
		);
		onChangeTask(parseInt(dataId));
	}
});
