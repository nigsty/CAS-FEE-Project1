'use strict';

import { TodoStorage } from '../dl/todo-storage.js';

const storage = new TodoStorage();
//toggling current note checkbox
export const onChangeTask = (id) => {
	const data = storage.getTodoByID(id);
	const finishedDate = new Date();
	if (!data.completed) {
		data.completed = true;
		data.finishedOn = finishedDate;
	} else {
		data.completed = false;
		data.finishedOn = '';
	}
	storage.updateTodo(data);
};
