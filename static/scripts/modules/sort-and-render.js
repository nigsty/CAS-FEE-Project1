import {render} from './render.js';

//initialize filters criteria
export const filters = {
	finished: false,
	sortBy: '',
};

let todo = document.getElementById('todo');
let placeholder = todo;

//sorts notes by one of 3 criterias then call attach to the DOM function
export const sortAndRender = (data, filters) => {
	const sortedTodos = data.sort((a, b) => (a[filters.sortBy] > b[filters.sortBy] ? -1 : 1));
	placeholder.innerHTML = '';
	sortedTodos.forEach((sortedTodo) => attachToDOM(sortedTodo));
};

//attaching each note to the DOM
export const attachToDOM = (data) => {
	placeholder.innerHTML += render(data);
};