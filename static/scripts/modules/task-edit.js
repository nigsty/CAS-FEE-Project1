'use strict';
import { TodoStorage } from '../dl/todo-storage.js';

// editing note description field
export const taskEdit = (id) => {
	const parentDOM = document.getElementById('list-item-' + id);
	const editStatus = parentDOM.getAttribute('data-edit');
	const storage = new TodoStorage();

	const todo = storage.getTodoByID(id);

	const itemDescription = parentDOM.getElementsByClassName('item-description')[0];

	if (editStatus == null) {
		parentDOM.setAttribute('data-edit', 'true');
		itemDescription.setAttribute('contenteditable', 'true');
		itemDescription.focus();

		const button = parentDOM.getElementsByClassName('edit');
		button[0].classList.add('save');
	} else {
		parentDOM.removeAttribute('data-edit');
		itemDescription.removeAttribute('focused');
		itemDescription.removeAttribute('contenteditable');
		// Description text
		todo.descriptionValue = itemDescription.innerText;

		const button = parentDOM.getElementsByClassName('edit');
		button[0].classList.remove('save');
	}

	// Update edited note
	storage.updateTodo(todo);
};
