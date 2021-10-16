import { Navigation } from 'react-native-navigation';
import { Dimensions, Platform } from 'react-native'
import { types, flow, applySnapshot } from 'mobx-state-tree';
// import CodePush from 'react-native-code-push';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Settings from './models/Settings'
const { width, height } = Dimensions.get('window');

const Screens = new Set();

const UI = types
	.model('UI', {
		componentId: types.maybe(types.string),
		settings: types.optional(Settings, {}),
		location: types.optional(types.string, ""),
		layout: types.optional(
			types.model('UILayout', {
				width: types.optional(types.number, width),
				height: types.optional(types.number, height),
				bottomTabsHeight: types.optional(types.number, 0),
				topBarHeight: types.optional(types.number, 0),
				statusBarHeight: types.optional(types.number, 0),
				inset: types.optional(types.number, 0),
			}),
			{},
		),
		preview: types.optional(
			types.model('Preview', {
				componentName: types.maybe(types.string),
				active: types.optional(types.boolean, false),
			}),
			{},
		),
		previousComponentIdScreen: types.optional(types.string, "")
	})
	.views(self => ({
		font(size: number) {
			return {
				fontFamily: self.settings.appearance.fontFamilyBody,
				fontSize: self.settings.appearance.useSystemFontSize ? size : size + self.settings.appearance.fontSize - 3,
			}
		}
	}))
	.actions(self => ({
		addScreen(screen: any) {
			Screens.add(screen)
		},
		setPrevious(componentId: string) {
			self.previousComponentIdScreen = componentId
		},
		removeScreen(screen: any) {
			Screens.delete(screen);
		},
		updateScreens() {
			Screens.forEach((screen: any) => {
				if (screen.updateOptions) {
					screen.updateOptions();
				}
			});
		},
		updateLayout({ window = Dimensions.get('window') } = {}) {
			return flow(function* () {
				const { width, height } = window;
				const isX = Platform.OS === 'ios' && ((width === 375 && height === 812) || (width === 812 && height === 375));
				const isLandscape = width > height;
				self.layout.inset = (isX && isLandscape) ? 44 : 0;
				self.layout.width = width;
				self.layout.height = height;
				const constants = yield Navigation.constants();
				if (constants) {
					self.layout.bottomTabsHeight = constants.bottomTabsHeight;
					self.layout.topBarHeight = constants.topBarHeight;
					self.layout.statusBarHeight = constants.statusBarHeight;
				}
			})();
		},
		onDidAppear(componentId: string, componentName?: string) {
			if (componentName === self.preview.componentName) {
				return;
			}
			// console.log({ self: self.preview })
			self.componentId = componentId;
			(self as any).updateLayout();
		},
		onDidDisappear(componentId: string, componentName?: string) {
			this.setPrevious(componentId)
			if (componentName === self.preview.componentName) {
				self.preview.componentName = undefined;
				self.preview.active = false;
			}
		},
		setPreviewComponentName(componentName: string) {
			self.preview.componentName = componentName;
		},

		setPreviewActive(flag: boolean) {
			self.preview.active = flag;
		},
		restartApp() {
			// return CodePush.restartApp(false);
		},
		hydrate() {
			return flow(function* () {
				try {
					// let useFirstRun = false;
					const isFirstRun = yield AsyncStorage.getItem('firstStartApp');
					console.log({ isFirstRun: isFirstRun })
					if (isFirstRun) {
						UI.settings.isFirstRun = false
						console.log({ isFirstRun: false })
					} else {
						UI.settings.isFirstRun = true
						console.log({ isFirstRun: true })
					}
					(self as any).apply();
				} catch (err) { }
				return;
			})();
		},
	})).create()

export default UI;
