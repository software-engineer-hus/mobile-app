import { Platform, StyleSheet, StatusBar } from 'react-native';
import set from 'lodash/set';
import UI from '../stores/UI';
import themes from './themes';

export const getVar = (name: string, fallback: string) => {
	return themes[UI.settings.appearance.theme][name] || fallback;
};
const getStatusBarStyle = (backgroundColor: any) => {
	const result = /^#?([a-f\d]{1,2})([a-f\d]{1,2})([a-f\d]{1,2})$/i.exec(backgroundColor);
	if (!result) return 'light-content';
	const [r, g, b] = result.slice(1, 4).map(n => parseInt(n.length === 1 ? `f${n}` : n, 16));
	const shade = (r + g + b) / 3;
	return shade > 128 ? 'dark-content' : 'light-content';
};
export const applyThemeOptions = (settings: any) => {
	if (Platform.OS === 'ios') {

		// NavBar
		const navBarStyle = getVar('--navbar-style', 'light');
		const navBarBg = getVar('--navbar-bg', 'transparent');

		if (navBarBg && navBarBg !== 'transparent') {
			StatusBar.setBarStyle(getStatusBarStyle(navBarBg));
		} else {
			StatusBar.setBarStyle(navBarStyle === 'dark' ? 'light-content' : 'dark-content');
		}

		// NavBar
		const tabBarStyle = getVar('--tabbar-style', 'light');
		const tabBarBg = getVar('--tabbar-bg', 'transparent');

		// Top Bar
		set(settings, 'topBar.background.color', navBarBg);
		set(settings, 'topBar.drawBehind', true);
		set(settings, 'topBar.translucent', navBarStyle === 'dark' || navBarStyle === 'light');
		set(settings, 'topBar.barStyle', navBarStyle === 'dark' ? 'black' : 'default');
		set(settings, 'topBar.title.color', '#ffffff');
		set(settings, 'topBar.buttonColor', '#ffffff');

		// Bottom Tabs
		set(settings, 'bottomTabs.backgroundColor', tabBarBg);
		set(settings, 'bottomTabs.translucent', tabBarStyle === 'dark' || tabBarStyle === 'light');
		set(settings, 'bottomTabs.barStyle', tabBarStyle === 'dark' ? 'black' : 'default');
		set(settings, 'bottomTabs.drawBehind', true);
		set(settings, 'bottomTabs.selectedTabColor', '#95cc5e');

		if (settings.bottomTab) {
			set(settings, 'bottomTab.iconColor', '#95cc5e');
			set(settings, 'bottomTab.textColor', '#95cc5e');
			set(settings, 'bottomTab.selectedTextColor', '#95cc5e');
			set(settings, 'bottomTab.selectedIconColor', '#95cc5e');
		}

		set(settings, 'layout.backgroundColor', '#191919');
	}

	if (Platform.OS === 'android') {
		set(settings, 'statusBar.backgroundColor', '#ff2d55');

		// NavBar    // NavBar
		const navBarStyle = getVar('--navbar-style', 'light');
		const navBarBg = getVar('--navbar-bg', 'transparent');

		const tabBarStyle = getVar('--tabbar-style', 'light');
		const tabBarBg = getVar('--tabbar-bg', 'transparent');

		// Top Bar
		set(settings, 'topBar.background.color', '#A1A1A1');
		set(settings, 'topBar.title.color', '#A1A1A1');
		set(settings, 'topBar.buttonColor', '#A1A1A1');
		set(settings, 'topBar.backButton.color', '#A1A1A1');

		// Bottom tabs
		if (!tabBarBg || tabBarBg === 'transparent') {
			set(settings, 'bottomTabs.backgroundColor', '#A1A1A1');
		} else {
			set(settings, 'bottomTabs.backgroundColor', '#A1A1A1');
		}

		set(settings, 'bottomTabs.selectedTabColor', '#95cc5e');
		set(settings, 'bottomTabs.titleDisplayMode', 'alwaysShow');

		if (settings.bottomTab) {
			set(settings, 'bottomTab.iconColor', '#A1A1A1');
			set(settings, 'bottomTab.textColor', '#A1A1A1');
			set(settings, 'bottomTab.selectedTextColor', '#95cc5e');
			set(settings, 'bottomTab.selectedIconColor', '#95cc5e');
		}

		if (!settings.layout || (settings.layout && !settings.layout.backgroundColor)) {
			set(settings, 'layout.backgroundColor', '#FFFFFF');
		}

		if (settings.topBar.rightButtons) {
			set(settings, 'topBar.rightButtons', settings.topBar.rightButtons.map(button => ({
				...button,
				color: '#A1A1A1',
			})));
		}
	}

	return settings;
};