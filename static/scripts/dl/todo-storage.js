'use strict';
export class TodoStorage {
	constructor() {
		this.getTodos();
	}
	getTodos() {
		const todoData = localStorage.getItem('todoList');
		this.data = todoData ? JSON.parse(todoData) : [];
		return this.data;
	}
	taskAdd(todo) {
		this.data.push(todo);
		localStorage.setItem('todoList', JSON.stringify(this.data));
	}
	updateTodo(todo) {
		const index = this.getTodos().findIndex((item) => item.id === todo.id);
		if (index !== -1) {
			this.data.splice(index, 1, todo);
			localStorage.setItem('todoList', JSON.stringify(this.data));
		}
	}
	getTodoByID(id) {
		return this.getTodos().find((item) => (item.id === id ? item : null));
	}
}
