const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const router = express.Router();

module.exports = () => {
	router.get('/', (request, response) => {
		response.render('layout/input-todo', { pageTitle: 'To-Do inputs', template: 'input-todo' });
	});

 router.post('/input-todo', urlencodedParser, (request, response) => {
			console.log(request.body);
		});  

	return router;
};
