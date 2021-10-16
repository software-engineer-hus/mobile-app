import { Navigation } from 'react-native-navigation'
import DishModel from './models/DishModel'
import Services from '../services/Services'
import { types, unprotect } from 'mobx-state-tree'
import { flow } from 'mobx'
const DishType = types
	.model('Category', {
		dishes: types.optional(types.array(DishModel), []),
		isLoading: types.optional(types.boolean, false),
	})
	.views(self => ({
		get getDishes() {
			return self.dishes
		}
	}))
	.actions(self => ({
		fetchData: flow(function* (id: number) {
			self.isLoading = true;
			try {
				Services.getDishesByIdRestaurant(id).then(res => {
					// console.log({ res: res })
					self.dishes = res
				})
			}
			catch (e) {
				console.log(e)
			}
			self.isLoading = false
		}),
		clear() {
			self.dishes.clear()
		},
		addSingleDishes(data: any) {
			self.dishes.push(data)
		},

	}))
const Dishes = DishType.create()
unprotect(Dishes)
export default Dishes;
