const express = require('express');
const path = require('path');
const createError = require('http-errors');

const routes = require('./routes');
const app = express();

app.use(express.urlencoded({ extended: false }));

//set up template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.locals.siteName = 'To-Do notes Management App';

//static files
app.use(express.static(path.join(__dirname, './static')));

app.use('/', routes());

app.use((request, response, next) => {
	return next(createError(404, 'Page not found'));
});

app.use((err, require, response, next) => {
	response.locals.message = err.message;
	const status = err.status || 500;
	response.locals.status = status;
	response.status(status);
	response.render('error');
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Express server listening on port ${port}`));
