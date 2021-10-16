import { Navigation } from 'react-native-navigation'
import { protect, unprotect, types } from 'mobx-state-tree'
import { flow } from 'mobx'
import RestaurantModel from './models/RestaurantModel'
import Services from '../services/Services'
const RestaurantsType = types
	.model('Restaurant', {
		isLoading: types.optional(types.boolean, false),
		restaurants: types.optional(types.array(RestaurantModel), []),
		page: types.optional(types.number, 1),
		totalPage: types.optional(types.number, 0)
	})
	.views(self => ({
		get pageRestaurant() {
			return self.restaurants
		}
	}))
	.actions(self => ({
		fetchData: flow(function* (page: number) {
			self.isLoading = true;
			try {
				Services.getRestaurant(page).then(res => {
					// console.log({ res: res })
					self.restaurants = res
				})
			}
			catch (e) {
				console.log(e)
			}
			self.isLoading = false
		}),
		fetchDataByCategoryId: flow(function* (id: number, page: number) {
			// console.log(self.totalPage, self.page)
			self.isLoading = true;
			try {
				Services.getRestaurantByCategoryId(page, id).then(res => {
					const add = self.restaurants.concat(res.data)
					self.restaurants = JSON.parse(JSON.stringify(add))
					self.totalPage = res.pages
					console.log({ restaurants: JSON.parse(JSON.stringify(self.restaurants)) })
				})
			} catch (e) {
				console.log(e)
			}
			self.isLoading = false
		}),
		clear() {
			self.restaurants.clear()
			self.isLoading = false
			self.page = 1
		},
		addSingleRestaurant(data: any) {
			self.restaurants.push(data)
		},
		pageIncrease() {
			!this.isEnd() && self.page++
		},
		isEnd(): boolean {
			return self.page === self.totalPage
		}
	}))
const Restaurants = RestaurantsType.create()
unprotect(Restaurants)
export default Restaurants;
