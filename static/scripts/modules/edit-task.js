// editing note description field
export const editTask = (id) => {
	const parentDOM = document.getElementById('list-item-' + id);
	const editStatus = parentDOM.getAttribute('data-edit');

	// Get saved notes
	const data = getSavedTodos();

	//Find index of specific object using findIndex method.
	const objIndex = data.findIndex((obj) => obj.id === id);
	const itemDescription = parentDOM.getElementsByClassName('item-description')[0];

	if (editStatus == null) {
		parentDOM.setAttribute('data-edit', 'true');
		itemDescription.setAttribute('contenteditable', 'true');
		itemDescription.focus();

		// Edit button
		const button = parentDOM.getElementsByClassName('edit');
		button[0].classList.add('save');
	} else {
		parentDOM.removeAttribute('data-edit');
		itemDescription.removeAttribute('focused');
		itemDescription.removeAttribute('contenteditable');
		// Description text
		data[objIndex]['descriptionValue'] = itemDescription.innerText;

		// Edit button
		const button = parentDOM.getElementsByClassName('edit');
		button[0].classList.remove('save');
	}

	// Update edited note
	updateNote(data);
};