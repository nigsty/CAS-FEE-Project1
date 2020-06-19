//toggling current note checkbox
export const onChangeTask = (id) => {
	const data = getSavedTodos();
	const finishedDate = new Date();
	const objIndex = data.findIndex((obj) => obj.id === id);
	if (!data[objIndex].completed) {
		data[objIndex].completed = true;
		data[objIndex].finishedOn = finishedDate;
	} else {
		data[objIndex].completed = false;
		data[objIndex].finishedOn = '';
	}
	updateNote(data);
};
