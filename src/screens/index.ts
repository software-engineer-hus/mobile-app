import { Navigation } from 'react-native-navigation'
import Home from './home/Home'
import MarkRestaurant from './favorite/MarkRestaurant'
import CompleteOrder from './favorite/CompleteOrder'
import AccountScreen from './account/AccountScreen'
import RestaurantFood from './product/RestaurantFood'
import CategoryFood from './product/CategoryFood'
import Order from './order/Order'
import UI from '../stores/UI'
import ShowOrderDetailModal from './order/ShowOrderDetailModal'
import MapOrderView from './order/MapOrderView'
import MarkRestaurants from '../stores/MarkRestaurants'
import AddressEdit from './account/AddressEdit'
import Login from './account/Login'
import { colorStyles } from '../styles/ColorStyles'
export const HOME_SCREEN = 'internapp.HomeScreen'
export const MARK_FAVORITE_SCREEN = 'internapp.markFavoriteRestautant'
export const COMPLETE_ORDER_SCREEN = 'internapp.CompleteOrderScreen'
export const ACCOUNT_SCREEN = 'internapp.AccountScreen'
export const ADDRESS_EDIT_SCREEN = 'internapp.AddressEditScreen'
export const RESTAURANT_FOOD_SCREEN = 'internapp.RestaurantFood'
export const CATEGORY_FOOD_SCREEN = 'internapp.CategoryFood'
export const ORDER_SCREEN = 'internapp.OrderScreen'
export const HEADER = 'component.Header'
export const SHOW_ORDER_DETAIL_MODAL = 'internapp.ShowOrderDetailModal'
export const MAP_ORDER_VIEW = 'internapp.MapOrderView'
export const LOGIN = 'internapp.Login'
export const Screens = new Map()
// screen 
Screens.set(HOME_SCREEN, Home);
Screens.set(MARK_FAVORITE_SCREEN, MarkRestaurant);
Screens.set(COMPLETE_ORDER_SCREEN, CompleteOrder);
Screens.set(ACCOUNT_SCREEN, AccountScreen)
Screens.set(ADDRESS_EDIT_SCREEN, AddressEdit)
Screens.set(RESTAURANT_FOOD_SCREEN, RestaurantFood)
Screens.set(CATEGORY_FOOD_SCREEN, CategoryFood)
Screens.set(ORDER_SCREEN, Order)
Screens.set(SHOW_ORDER_DETAIL_MODAL, ShowOrderDetailModal)
Screens.set(MAP_ORDER_VIEW, MapOrderView)
Screens.set(LOGIN, Login)
export const detectFirstRun = () => {
	startApp()

	// if (UI.settings.isFirstRun) {
	// 	startAppNotLogin()
	// } else {
	// 	startApp()
	// 	// console.log("startapp")
	// }
}

export const startAppNotLogin = () => {
	return Navigation.setRoot({
		root: {
			stack: {
				children: [
					{
						component: {
							name: LOGIN,
							id: LOGIN
						}
					}
				]
			}
		}
	})
}
export const startApp = () => {
	return Navigation.setRoot({
		root: {
			bottomTabs: {
				id: 'ROOT',
				children: [
					{
						stack: {
							id: "HOME_SCREEN",
							children: [
								{
									component: {
										id: HOME_SCREEN,
										name: HOME_SCREEN,
									}
								}
							]
						}
					},
					{
						stack: {
							id: "MARK_FAVORITE_SCREEN",
							children: [
								{
									component: {
										id: MARK_FAVORITE_SCREEN,
										name: MARK_FAVORITE_SCREEN
									}
								}
							],
							options: {
								bottomTab: {
									text: 'Đã lưu',
									icon: require('../assets/heart.png'),
									selectedIconColor: 'black',
									selectedTextColor: 'black'
								}
							}
						}
					},
					{
						stack: {
							id: "COMPLETE_ORDER_SCREEN",
							children: [
								{
									component: {
										id: COMPLETE_ORDER_SCREEN,
										name: COMPLETE_ORDER_SCREEN
									}
								}
							],
							options: {
								bottomTab: {
									text: 'Đơn hàng',
									badge: MarkRestaurants.orderComplete.length.toString(),
									badgeColor: colorStyles.sushi,
									icon: require('../assets/Vector.png'),
									selectedIconColor: 'black',
									selectedTextColor: 'black',
									iconWidth: 20,
									iconHeight: 20
								}
							}
						}
					},
					{
						stack: {
							id: "ACCOUNT_SCREEN",
							children: [
								{
									component: {
										id: ACCOUNT_SCREEN,
										name: ACCOUNT_SCREEN
									}
								}
							],
							options: {
								bottomTab: {
									text: 'Tôi',
									icon: require('../assets/user.png'),
									selectedIconColor: 'black',
									selectedTextColor: 'black'
								}
							}
						}
					},
				]
			}
		}
	})
}

export const OrderScreen = (handleBack: any, screens: string = "false") => {
	console.log({ screens: screens })
	Navigation.push(<string>UI.componentId, {
		component: {
			id: ORDER_SCREEN,
			name: ORDER_SCREEN,
			passProps: {
				handleBack: handleBack,
				screens: screens
			}
		},
	})
}
export const DetailProductScreen = (id_restaurant: number, restaurantInfo: any, screen: string = "false") => {
	// console.log({ Ui: <string>UI.componentId })
	// console.log({ id: id })
	Navigation.push(<string>UI.componentId, {
		component: {
			name: RESTAURANT_FOOD_SCREEN,
			id: RESTAURANT_FOOD_SCREEN,
			passProps: {
				id_restaurant: id_restaurant,
				restaurantInfo: restaurantInfo,
				screen: screen,
			}
		}
	})
}
export const CategoryFoodScreen = (categoryId: number) => {
	Navigation.push(<string>UI.componentId, {
		component: {
			name: CATEGORY_FOOD_SCREEN,
			id: CATEGORY_FOOD_SCREEN,
			passProps: {
				categoryId: categoryId
			}
		}
	})
}
export const MapOrderViewScreen = (screens: string = "false") => {
	// console.log({ map: favorite })
	Navigation.push(<string>UI.componentId, {
		component: {
			name: MAP_ORDER_VIEW,
			id: MAP_ORDER_VIEW,
			passProps: {
				screens: screens
			}
		}
	})
}
export const CompleteOrderScreen = () => {
	Navigation.push(<string>UI.componentId, {
		component: {
			name: COMPLETE_ORDER_SCREEN,
			id: COMPLETE_ORDER_SCREEN,
			passProps: {
				// favorite: favorite
			}
		}
	})
}

export const AddressEditScreen = () => {
	Navigation.push(<string>UI.componentId, {
		component: {
			name: ADDRESS_EDIT_SCREEN,
			id: ADDRESS_EDIT_SCREEN,
			passProps: {}
		}
	})
}