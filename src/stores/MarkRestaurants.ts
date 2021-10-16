import { Navigation } from 'react-native-navigation'
import { flow, types, unprotect } from 'mobx-state-tree'
import RestaurantModel from './models/RestaurantModel'
// import DishModel from './models/Dish\bModel'
import OrderType from './models/OrdersModel'
import Services from '../services/Services'
const orderTypes = types.model({
	restaurant: RestaurantModel,
	dishesOrder: types.optional(types.array(OrderType), []),
	totalPrice: types.string,
	timeComplete: types.string
})
const MarkRestaurantTypes = types
	.model('MarkRestaurant', {
		orderComplete: types.optional(types.array(orderTypes), []),
		restaurantFavorite: types.optional(types.array(RestaurantModel), [])
	})
	.views(self => ({

	}))
	.actions(self => ({
		clear() {
			self.orderComplete.clear();
		},
		getRestaurantById: flow(function* (id: number) {
			try {
				Services.getRestaurantById(id).then(res => {
					console.log({ res: res })
					return res;
				})
			} catch (e) {
				console.log(e)
				return e;
			}
		}),
		add(orderComplete: any,) {
			self.orderComplete.push(orderComplete);
		},
		addFavorite(favorite: any) {
			const isExist = self.restaurantFavorite.findIndex((x, i) => {
				return favorite.id === x.id
			})
			// console.log(isExist)
			isExist < 0 ? self.restaurantFavorite.push(favorite) : self.restaurantFavorite.splice(isExist, 1)

		}
	}))

const MarkRestaurant = MarkRestaurantTypes.create()
unprotect(MarkRestaurant)
export default MarkRestaurant;
