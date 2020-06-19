'use strict';

import { titleValidate } from './modules/validate.js';

// get the note from input form, save and reassign to main page
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
	e.preventDefault();
	addNote();
	location.assign('./');
});

titleValidate();
