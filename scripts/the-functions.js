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
			titleValueValidat.setCustomValidity('Viel zu kurz! min. 5 bitte');
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
	const doneUntil = document.querySelector('#doneUntil');
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

// rendering saved data to the DOM
const render = (data) => {
	let checked_item = data.completed ? 'checked="checked"' : '';
	return `
			<li data-id="${data.id}" class="listItem" id="listItem-${data.id}" >
				<div class="list-columen1">
					<div class="list-item-row-one">
						<div class="item-done-until">${data.doneUntilValue}</div>
						<div class="item-title">${data.titleValue}</div>
						<div class="item-importancy">1=Niedrig bis 4=sehr Wichtig: <h2 class="itemImportancy"> ${data.importancyValue}</h2></div>
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

const filters = {
	finished: false,
	sortCriteria: new Date(),
	importancyValue: 0,
};

//sorts row todoList
const renderFiltered = function (todoList, filters) {
	const sortedTodos = todoList.sort((a, b) => (a[filters.sortCriteria] > b[filters.sortCriteria] ? 1 : -1));
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

// editing description input field
const editTask = (id) => {
	const parentDOM = document.getElementById('listItem-' + id);
	const editStatus = parentDOM.getAttribute('data-edit');

	// Get local storage data
	const data = getSavedTodos();

	//Find index of specific object using findIndex method.
	const objIndex = data.findIndex((obj) => obj.id === id);

	if (editStatus == null) {
		parentDOM.setAttribute('data-edit', 'true');

		// Edit button
		const button = parentDOM.getElementsByClassName('edit');
		button[0].classList.add('save');

		// Description text
		const itemDescription = parentDOM.getElementsByClassName('item-description');
		itemDescription[0].innerHTML =
			'<input type="text" class="Description-editable" value="' + itemDescription[0].innerText + '" />';
		console.log('the edit key pressed');
	} else {
		parentDOM.removeAttribute('data-edit');

		// Description text
		const itemDescription = parentDOM.getElementsByClassName('item-description');
		const $txt = parentDOM.getElementsByClassName('description-editable')[0].value;
		data[objIndex].descriptionValue = $txt;
		itemDescription[0].innerHTML = $txt;
		console.log('the save key  pressed');

		// Edit button
		const button = parentDOM.getElementsByClassName('edit');
		button[0].classList.remove('save');
	}

	// Update local storage data
	updateLocalStorage(data);
};

// Update local data Storage
const updateLocalStorage = (data) => {
	localStorage.setItem('todoList', JSON.stringify(data));
};
