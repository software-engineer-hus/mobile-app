import { Navigation } from 'react-native-navigation'
import { types } from 'mobx-state-tree'
const photoArray = types.model({
	value: types.string,
	width: types.number,
	height: types.number
})

const RestaurantModel = types
	.model('Restaurant', {
		id: types.number,
		created: types.optional(types.number, 0),
		restaurant_id: types.number,
		// label: {
		// 	photos: types.optional(types.array(photoArray), [])
		// },
		photos: types.optional(types.array(photoArray), []),
		address: types.string,
		name: types.string,
		categories: types.array(types.string),
		phones: types.array(types.string),
		restaurant_status: types.number,
		rating: types.model({
			total_review: types.number,
			avg: types.number,
			display_total_review: types.string,
			app_link: types.string
		}),
		cuisines: types.array(types.string),
		operating: types.model({
			color: types.string,
			close_time: types.optional(types.string, ""),
			open_time: types.optional(types.string, ""),
			status: types.number,
			text: types.optional(types.model({
				resource_name: types.optional(types.string, " ")
			}), { resource_name: "" })
		}),
		promotion: types.array(types.model({
			group: types.number,
			text: types.string,
			icon: types.string,
		})),
		price_range: types.model({
			resource_args: types.array(types.string),
			resource_name: types.string
		}),
		min_order_value: types.model({
			resource_args: types.array(types.string),
			resource_name: types.string
		})
	})
	.views(self => ({

	}))
	.actions((self) => {
		const setRestaurant = (self: any) => {
			return self
		}
		return {
			setRestaurant
		}
	})
export default RestaurantModel;


// export const ItemResReference = types.reference(RestaurantModel, {
// 	get(identifier: string, parent: any) {
// 		return Items.items.get(identifier) || null;
// 	},
// 	set(value: any) {
// 		return value;
// 	},
// })