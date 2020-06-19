'use strict';

let todo = document.getElementById('todo');
let placeholder = todo;

const getSavedTodos = () => {
	const data = localStorage.getItem('todoList');
	return data ? JSON.parse(data) : [];
};

const data = getSavedTodos();
const form = document.querySelector('form');
// Save the Todos to localStorage
const setSaveTodos = (data) => localStorage.setItem('todoList', JSON.stringify(data));

// Adding form input values to the Localstorage
const addNote = () => {
	const title = document.querySelector('#title');
	const description = document.querySelector('#description');
	const importancy = document.querySelector('#importancy');
	const doneUntil = document.querySelector('#done-until');
	if (!title.value) return;
	let current_item = {
		id: Math.floor(Math.random() * 100),
		titleValue: title.value,
		descriptionValue: description.value,
		importancyValue: importancy.value,
		doneUntilValue: doneUntil.value,
		completed: false,
		createdOn: new Date(),
		finishedOn: '',
	};
	data.push(current_item);
	form.reset();
	setSaveTodos(data);
};

// rendering saved notes to the DOM
const render = (data) => {
	let checked_item = data.completed ? 'checked="checked"' : '';
	let doneUntilRender = data.doneUntilValue;
	const doneUntilMoment = moment(doneUntilRender).locale('de').calendar(null, {
		sameDay: '[Heute]',
		nextDay: '[Morgen]',
		nextWeek: '[Nächsten] dddd',
		lastDay: '[Gestern]',
		lastWeek: '[letzter] dddd',
		sameElse: '[Irgendwann]',
	});
	return `
			<li data-id="${data.id}" class="list-item" id="list-item-${data.id}" >
				<div class="list-columen-one">
					<div class="list-item-row-one">
						<div class="item-done-until">${doneUntilMoment}</div>
						<div class="item-title">${data.titleValue}</div>
						<div class="item-importancy"><h2> ${data.importancyValue}</h2> 1=Niedrig bis 4=sehr Wichtig</div>
					</div>	
					<div class="list-item-row-two">
					<div class="item-checkbox"><label><input type="checkbox" class="checkbox task-status"  name="finished" ${checked_item} > Finished</label></div>
					<div class="item-description">${data.descriptionValue}</div>
				 </div> 

				</div>
				<div class="buttons">
						<button class="edit"></button>
					</div>
			</li>
				`;
};

//initialize filters criteria
const filters = {
	finished: false,
	sortBy: '',
};

//sorts notes by one of 3 criterias then call attach to the DOM function
const sortRender = (data, filters) => {
	const sortedTodos = data.sort((a, b) => (a[filters.sortBy] > b[filters.sortBy] ? -1 : 1));
	placeholder.innerHTML = '';
	sortedTodos.forEach((sortedTodo) => attachToDOM(sortedTodo));
};

//attaching each note to the DOM
const attachToDOM = (data) => {
	placeholder.innerHTML += render(data);
};

// Updates local data Storage
const updateNote = (data) => localStorage.setItem('todoList', JSON.stringify(data));
