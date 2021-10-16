
import { types, unprotect } from 'mobx-state-tree'
import { flow } from 'mobx'
import OrderType from './models/OrdersModel'
import RestaurantModel from './models/RestaurantModel'
import _ from 'lodash'
const OrderModel = types
	.model('Order', {
		orders: types.optional(types.array(OrderType), []),
		restaurant: types.maybeNull(RestaurantModel),
		// note: types.optional(types.string, ""),
		totalPrice: types.optional(types.number, 0)
	})
	.views(self => ({
		get getOrders() {
			return self.orders
		}
	}))
	.actions(self => ({
		fetchData: flow(function* (id: number) {
			// self.isLoading = true;

			// self.isLoading = false
		}),
		clear() {
			self.orders.clear()
			self.restaurant = null
			self.totalPrice = 0
		},
		setNoteForSameDishes(id: number, note: string) {
			self.orders.map((x, i) => {
				if (x.id === id) {
					x.setNote(note)
				}
			})
		},
		addSingleDishes(restaurantOrderType: any, data: any) {
			self.restaurant = restaurantOrderType
			let price = 0;
			self.orders.push(data)
			// if(x.discount_price){}
			self.orders.map(x =>
				price += x.discount_price.value ? x.discount_price.value : x.price.value
			)
			this.setTotalPrice(price)
		},
		setTotalPrice(price: any) {
			self.totalPrice = price
		},
		getGroupOrderByTypeID() {
			let grouped = _.groupBy(self.orders, (x) => {
				return x.id
			})
			return Object.values(grouped)
		},
		removeSingleDishes(id: number) {
			// console.log({ FIRST: JSON.parse(JSON.stringify(self.orders)) })
			let idRemove = self.orders.findIndex((x, i) => x.id === id)
			// console.log({ idRemove: idRemove })
			// console.log({ id: id })
			let spliceOrder = JSON.parse(JSON.stringify(self.orders))
			spliceOrder.splice(idRemove, 1)
			let price = 0;
			spliceOrder.map((x: any) =>
				price += (x.price.value - x.discount_price.value)
			)
			this.setTotalPrice(price)
			self.orders = spliceOrder
			this.getGroupOrderByTypeID()
			// console.log({ spliceOrder: JSON.parse(JSON.stringify(self.orders)) })
		}
	}))
const Orders = OrderModel.create()
unprotect(Orders)
export default Orders;
