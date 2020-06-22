// rendering saved notes to the DOM
export const render = (data) => {
	let checked_item = data.completed ? 'checked="checked"' : '';
	let doneUntilRender = data.doneUntilValue;
	const doneUntilMoment = moment(doneUntilRender).locale('de').calendar(null, {
		sameDay: '[Heute]',
		nextDay: '[Morgen]',
		nextWeek: '[Nächsten] dddd',
		lastDay: '[Gestern]',
		lastWeek: '[letzter] dddd',
		sameElse: '[Irgendwann]',
	});
	return `
			<li data-id="${data.id}" class="list-item" id="list-item-${data.id}" >
				<div class="list-columen-one">
					<div class="list-item-row-one">
						<div class="item-done-until">${doneUntilMoment}</div>
						<div class="item-title">${data.titleValue}</div>
						<div class="item-importancy"><h2> ${data.importancyValue}</h2> 1=Niedrig bis 4=sehr Wichtig</div>
					</div>	
					<div class="list-item-row-two">
					<div class="item-checkbox"><label><input type="checkbox" class="checkbox task-status" id="status-${data.id}"  name="finished" ${checked_item} > Finished</label></div>
					<div class="item-description">${data.descriptionValue}</div>
				 </div> 

				</div>
				<div class="buttons">
						<button class="edit" id="edit-${data.id}"></button>
					</div>
			</li>
				`;
};
