'use strict';

const getSavedTodos = () => {
	const data = localStorage.getItem('todoList');
	return data ? JSON.parse(data) : [];
};

// Save the Todos to localStorage
const setSaveTodos = (data) => {
	localStorage.setItem('todoList', JSON.stringify(data));
};

//Title input value validation
const titleValidat = () => {
	const titleValueValidat = document.getElementById('title');
	titleValueValidat.addEventListener('input', function (event) {
		if (titleValueValidat.validity.tooShort) {
			titleValueValidat.setCustomValidity('Viel zu kurz! min. 5 char. bitte');
		} else {
			titleValueValidat.setCustomValidity('');
		}
	});
};

// getting form input values to local storage
const add_item = () => {
	const title = document.querySelector('#title');
	const description = document.querySelector('#description');
	const importancy = document.querySelector('#importancy');
	const doneUntil = document.querySelector('#done-until');

	const doneUntilMoment = moment(doneUntil.value).locale('de').calendar(null, {
		sameDay: '[Heute]',
		nextDay: '[Morgen]',
		nextWeek: '[Nächsten] dddd',
		lastDay: '[Gestern]',
		lastWeek: '[letzter] dddd',
		sameElse: '[Irgendwann]',
	});

	//const doneUntilMoment = moment(doneUntil.value).locale('de').fromNow();

	//const doneUntilMoment = moment(doneUntil.value).locale('de').calendar();
	//const now = moment();
	//const calcDoneUnitl = now.subtract(doneUntilMoment);

	if (!title.value) return;
	let current_item = {
		id: Math.floor(Math.random() * 100),
		titleValue: title.value,
		descriptionValue: description.value,
		importancyValue: importancy.value,
		doneUntilValue: doneUntilMoment,
		completed: false,
		createdOn: moment.valueOf(),
		finishedOn: '',
	};
	data.push(current_item);
	form.reset();
	setSaveTodos(data);
};

// rendering saved data to the DOM
const render = (data) => {
	let checked_item = data.completed ? 'checked="checked"' : '';
	return `
			<li data-id="${data.id}" class="list-item" id="list-item-${data.id}" >
				<div class="list-columen1">
					<div class="list-item-row-one">
						<div class="item-done-until">${data.doneUntilValue}</div>
						<div class="item-title">${data.titleValue}</div>
						<div class="item-importancy"><h2> ${data.importancyValue}</h2> 1=Niedrig bis 4=sehr Wichtig</div>
					</div>
				

				<div class="list-item-row-two">
					<div class="item-checkbox"><input class="checkbox" id="checkbox" type="checkbox" name="finished" ${checked_item} onchange="onChangeTask(${data.id})"> Finished</div>
					<div class="item-description" id="item-description-${data.id}" contenteditable="true" onkeyup="storeEditedDescription(${data.id});">${data.descriptionValue}</div>
				</div>

				</div>
				<div class="buttons">
						<button class="edit" onClick="editTask(${data.id})"></button>
					</div>
			</li>
				`;
};

const filters = {
	finished: false,
	sortCriteria: '',
};

//sorts row todoList
const renderFiltered = function (data, filters) {
	const sortedTodos = todoList.sort((a, b) => (a[filters.sortCriteria] > b[filters.sortCriteria] ? -1 : 1));
	placeholder.innerHTML = '';
	sortedTodos.forEach((sortedTodo) => attachToDom(sortedTodo));
};

//attaching each data to the DOM
const attachToDom = (data) => {
	placeholder.innerHTML += render(data);
};

//toggling current data checkbox
const onChangeTask = (id) => {
	const data = getSavedTodos();
	const finisheddate = moment().valueOf();
	const objIndex = data.findIndex((obj) => obj.id === id);

	if (!data[objIndex].completed) {
		data[objIndex].completed = true;
		data[objIndex].finishedOn = finisheddate;
	} else {
		data[objIndex].completed = false;
		data[objIndex].finishedOn = '';
	}
	updateLocalStorage(data);
};

// editing description input field
const storeEditedDescription = (id) => {
	const data = getSavedTodos();
	const objIndex = data.findIndex((obj) => obj.id === id);
	const itemDescription = document.getElementById('item-description-' + id);
	data[objIndex].descriptionValue = itemDescription.innerHTML;

	//data[objIndex].descriptionValue = data[objIndex].itemDescription.value;
	updateLocalStorage(data);
};

// Update local data Storage
const updateLocalStorage = (data) => {
	localStorage.setItem('todoList', JSON.stringify(data));
};
