import { TodoStorage } from '../dl/todo-storage.js';
import { taskEdit } from '../modules/task-edit.js';
import { onChangeTask } from '../modules/task-status.js';
import { sortAndRender, attachToDOM, filters } from '../modules/sort-and-render.js';

export class IndexController {
	constructor() {
		this.storage = new TodoStorage();
		this.data = this.storage.getTodos();

		const todo = document.getElementById('todo');
		this.placeholder = todo;

		this.emptyMessage = 'There are no To-dos yet to list here.';
		this.emptyMessagefinished = 'There are no finished Todos yet to list here.';

		//display saved notes, if none --no data message-- will display
		if (this.data && this.data.length) {
			sortAndRender(this.data, filters);
		} else {
			todo.dataset.content = this.emptyMessage;
		}

		//filtered and sorted notes will display
		this.getNotesBy = document.getElementById('get-notes-by');
		this.initEventHandlers();
	}

	initEventHandlers() {
		this.filterSortHandler();
		this.updateTaskHandler();
	}

	filterSortHandler() {
		this.getNotesBy.addEventListener('click', (event) => {
			let elementClicked = event.target;
			const todoList = this.storage.getTodos();
			const elements = document.getElementsByClassName('filter-button');
			for (let i = 0; i < elements.length; i++) {
				elements[i].classList.remove('active');
			}

			elementClicked.classList.add('active');

			//Get todos filter finished date
			if (elementClicked.id === 'finished') {
				const filteredItems = todoList.filter((item) => item.completed);
				if (filteredItems.length === 0) {
					this.placeholder.innerHTML = this.emptyMessagefinished;
				} else {
					this.placeholder.innerHTML = '';
					filteredItems.forEach((filteredItem) => attachToDOM(filteredItem));
				}
			} else {
				//Get notes sorted by finishing date
				if (elementClicked.id === 'finish-date') {
					filters.sortBy = 'doneUntilValue';
					sortAndRender(todoList, filters);
				}
				//Get notes sorted by created date
				if (elementClicked.id === 'created-date') {
					filters.sortBy = 'createdOn';
					sortAndRender(todoList, filters);
				}
				//Get notes sorted by todos importancy
				if (elementClicked.id === 'importance') {
					filters.sortBy = 'importancyValue';
					sortAndRender(todoList, filters);
				}
				document.getElementById('todo').dataset.content = this.emptyMessage;
			}
		});
	}

	updateTaskHandler() {
		//description field editing
		document.addEventListener('click', (e) => {
			if (e.target.classList.contains('edit')) {
				const dataId = e.target.id.split('-')[1];
				taskEdit(parseInt(dataId));
			}
		});

		//checkbox task status change
		document.addEventListener('change', (e) => {
			if (e.target.classList.contains('task-status')) {
				const dataId = e.target.id.split('-')[1];
				onChangeTask(parseInt(dataId));
			}
		});
	}
}

new IndexController();
