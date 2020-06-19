//validat note title input value if it is shorter than 5
export const titleValidate = () => {
	const titleValueValidate = document.getElementById('title');
	if (titleValueValidate) {
		titleValueValidate.addEventListener('input', function (event) {
			if (titleValueValidate.validity.tooShort) {
				titleValueValidate.setCustomValidity('Viel zu kurz! min. 5 char. bitte');
			} else {
				titleValueValidate.setCustomValidity('');
			}
		});
	}
};
