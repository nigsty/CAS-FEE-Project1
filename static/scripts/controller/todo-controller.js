import { titleValidate } from '../modules/validate.js';
import { TodoStorage } from '../dl/todo-storage.js';

export class TodoCotroller {
	constructor() {
		this.storage = new TodoStorage();
		this.form = document.querySelector('form');
		this.initEventHandlers();
	}

	initEventHandlers() {
		this.form.addEventListener('submit', (e) => {
			e.preventDefault();
			this.taskAdd();
			location.assign('./');
		});
		
		/* Validating the title field length, if it is less than 5,
		just for test of setCustomValidity to give it a try */
		titleValidate();
	}

	taskAdd() {
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
		this.storage.taskAdd(current_item);
		this.form.reset();
	}
}

new TodoCotroller();
