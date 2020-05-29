const toggleTheme = document.querySelector('#theme-switcher');
const currentTheme = localStorage.getItem('themeType');
const themeSwitcher = document.getElementById('theme-switcher');
const themeSwitcherVal = '';

if (currentTheme === 'dark') {
	document.documentElement.setAttribute('data-theme', 'dark');
	localStorage.setItem('themeType', 'dark');
	document.getElementById('theme-switcher').value = 'dark';
} else if (currentTheme === 'light') {
	document.documentElement.setAttribute('data-theme', 'light');
	localStorage.setItem('themeType', 'light');
	document.getElementById('theme-switcher').value = 'light';
}

toggleTheme.addEventListener('change', (e) => {
	const changetheme = e.target.value;
	if (changetheme === 'light') {
		document.documentElement.setAttribute('data-theme', 'light');
		localStorage.setItem('themeType', 'light');
	} else {
		document.documentElement.setAttribute('data-theme', 'dark');
		localStorage.setItem('themeType', 'dark');
	}
});




