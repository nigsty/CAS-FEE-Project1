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
	let checked_item = data.completed ? true : false;
	let doneUntilRender = data.doneUntilValue;
	const doneUntilMoment = moment(doneUntilRender).locale('de').calendar(null, {
		sameDay: '[Heute]',
		nextDay: '[Morgen]',
		nextWeek: '[Nächsten] dddd',
		lastDay: '[Gestern]',
		lastWeek: '[letzter] dddd',
		sameElse: '[Irgendwann]',
	});

	const containerEl = document.createElement('li');

	containerEl.classList.add('list-item');
	containerEl.setAttribute('data-id', data.id);
	containerEl.setAttribute('id', `list-item-${data.id}`);

	//setup first columen which contain all inputs except edit button
	const columenOneDiv = document.createElement('div');
	columenOneDiv.classList.add('list-columen-one');
	containerEl.appendChild(columenOneDiv);

	//setup the first row with in columen one
	const itemRowOneDiv = document.createElement('div');
	itemRowOneDiv.classList.add('list-item-row-one');

	const doneUntilDiv = document.createElement('div');
	doneUntilDiv.classList.add('item-done-until');
	doneUntilDiv.innerHTML = doneUntilMoment;
	itemRowOneDiv.appendChild(doneUntilDiv);

	const itemTitleDiv = document.createElement('div');
	itemTitleDiv.classList.add('item-title');
	itemTitleDiv.innerHTML = data.titleValue;
	itemRowOneDiv.appendChild(itemTitleDiv);

	const importancyDiv = document.createElement('div');
	importancyDiv.classList.add('item-importancy');
	importancyDiv.innerHTML = `<h2>${data.importancyValue}</h2> 1=Niedrig bis 4=sehr Wichtig`;
	itemRowOneDiv.appendChild(importancyDiv);

	columenOneDiv.appendChild(itemRowOneDiv);
	const itemRowTwoDiv = document.createElement('div');
	itemRowTwoDiv.classList.add('list-item-row-two');

	// setup todo checkbox
	const itemCheckboxDiv = document.createElement('div');
	itemCheckboxDiv.classList.add('item-checkbox');
	const checkboxInput = document.createElement('input');
	checkboxInput.setAttribute('id', 'checkbox');
	checkboxInput.setAttribute('type', 'checkbox');
	checkboxInput.setAttribute('name', 'finished');
	checkboxInput.checked = data.completed;
	if (data.completed) {
		checkboxInput.setAttribute('checked', true);
	}
	checkboxInput.classList.add('checkbox');
	checkboxInput.classList.add(`checkbox-${data.id}`);
	itemCheckboxDiv.appendChild(checkboxInput);
	itemCheckboxDiv.appendChild(document.createTextNode('Finished'));
	itemRowTwoDiv.appendChild(itemCheckboxDiv);

	// setup description div
	const descDiv = document.createElement('div');
	descDiv.classList.add('item-description');
	descDiv.innerHTML = data.descriptionValue;
	itemRowTwoDiv.appendChild(descDiv);
	columenOneDiv.appendChild(itemRowTwoDiv);

	//setup edit button
	const buttonsDiv = document.createElement('div');
	buttonsDiv.classList.add('buttons');
	const editButton = document.createElement('button');
	editButton.classList.add('edit');
	editButton.classList.add(`edit-${data.id}`);
	buttonsDiv.appendChild(editButton);

	containerEl.appendChild(buttonsDiv);

	return containerEl.outerHTML;
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
	sortedTodos.forEach((dat) => {
		document.querySelector(`.edit-${dat.id}`).addEventListener('click', (e) => {
			editNote(dat.id);
		});
		document.querySelector(`.checkbox-${dat.id}`).addEventListener('change', (e) => {
			onChangeTask(dat.id);
		});
	});
};

//attaching each note to the DOM
const attachToDOM = (data) => {
	placeholder.innerHTML += render(data);
};

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
	updateNote(data);
};

// editing note description field
const editNote = (id) => {
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
	updateNote(data);
};

// Updates local data Storage
const updateNote = (data) => localStorage.setItem('todoList', JSON.stringify(data));
