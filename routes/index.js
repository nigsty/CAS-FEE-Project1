const express = require('express');

const inputTodoRoute = require('./input-todo');

const router = express.Router();

module.exports = () => {
	router.get('/', (request, response) => {
		response.render('layout', { pageTitle: 'Welcome', template: 'index' });
	});
	router.use('/input-todo', inputTodoRoute());

	return router;
};
