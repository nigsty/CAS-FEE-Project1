'use strict';
import { ThemeStorage } from '../dl/theme-storage.js';

export class ThemeController {
	constructor() {
		this.storage = new ThemeStorage();
		this.currentTheme = this.storage.getTheme();
		this.themeSwitcher = document.getElementById('theme-switcher');
		this.themeSwitcherVal = '';
		this.initEventHandlers();
	}

	initEventHandlers() {
		if (this.currentTheme === 'dark') {
			document.documentElement.setAttribute('data-theme', 'dark');
			this.storage.update('dark');
			document.getElementById('theme-switcher').value = 'dark';
		} else if (this.currentTheme === 'light') {
			document.documentElement.setAttribute('data-theme', 'light');
			this.storage.update('light');
			if (this.themeSwitcher) {
				this.themeSwitcher.value = 'light';
			}
		}
		if (this.themeSwitcher) {
			this.themeSwitcher.addEventListener('change', (e) => {
				const changetheme = e.target.value;
				if (changetheme === 'light') {
					document.documentElement.setAttribute('data-theme', 'light');
					this.storage.update('light');
				} else {
					document.documentElement.setAttribute('data-theme', 'dark');
					this.storage.update('dark');
				}
			});
		}
	}
}

new ThemeController();
