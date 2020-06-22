export class ThemeStorage {
	constructor() {
		const theme = localStorage.getItem('themeType');
		this.theme = theme;
		localStorage.setItem('themeType', theme);
	}

	getTheme() {
		return localStorage.getItem('themeType');
	}

	update(theme) {
		localStorage.setItem('themeType', theme);
	}
}
