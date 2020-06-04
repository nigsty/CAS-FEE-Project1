'use strict';

const getSavedTodos = () => {
	const data = localStorage.getItem('todoList');
	return data ? JSON.parse(data) : [];
};

// Save the Todos to localStorage
const setSaveTodos = (data) => localStorage.setItem('todoList', JSON.stringify(data));

//validat note title input value if it is shorter than 5
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

// getting form input values to Local storage
const add_item = () => {
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
				<div class="list-columen1">
					<div class="list-item-row-one">
						<div class="item-done-until">${doneUntilMoment}</div>
						<div class="item-title">${data.titleValue}</div>
						<div class="item-importancy"><h2> ${data.importancyValue}</h2> 1=Niedrig bis 4=sehr Wichtig</div>
					</div>	
					<div class="list-item-row-two">
					<div class="item-checkbox"><input class="checkbox" id="checkbox" type="checkbox" name="finished" ${checked_item} onchange="onChangeTask(${data.id})"> Finished</div>
					<div class="item-description">${data.descriptionValue}</div>
				</div>

				</div>
				<div class="buttons">
						<button class="edit" onClick="editTask(${data.id})"></button>
					</div>
			</li>
				`;
};

//init
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
const attachToDOM = (data) => (placeholder.innerHTML += render(data));

//toggling current note checkbox
const onChangeTask = (id) => {
	const data = getSavedTodos();
	const finisheddate = new Date();
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

// editing note description field
const editTask = (id) => {
	const parentDOM = document.getElementById('list-item-' + id);
	const editStatus = parentDOM.getAttribute('data-edit');

	// Get saved notes
	const data = getSavedTodos();

	//Find index of specific object using findIndex method.
	const objIndex = data.findIndex((obj) => obj.id === id);
	const itemDescription = parentDOM.getElementsByClassName('item-description')[0];

	if (editStatus == null) {
		parentDOM.setAttribute('data-edit', 'true');
		itemDescription.setAttribute('contenteditable', 'true');
		itemDescription.focus();

		// Edit button
		const button = parentDOM.getElementsByClassName('edit');
		button[0].classList.add('save');
	} else {
		parentDOM.removeAttribute('data-edit');
		itemDescription.removeAttribute('focused');
		itemDescription.removeAttribute('contenteditable');

		// Description text
		data[objIndex]['descriptionValue'] = itemDescription.innerText;

		// Edit button
		const button = parentDOM.getElementsByClassName('edit');
		button[0].classList.remove('save');
	}

	// Update edited note
	updateLocalStorage(data);
};

// Updates local data Storage
const updateLocalStorage = (data) => localStorage.setItem('todoList', JSON.stringify(data));
