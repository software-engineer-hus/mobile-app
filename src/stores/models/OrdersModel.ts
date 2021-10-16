import { Navigation } from 'react-native-navigation'
import { types } from 'mobx-state-tree'

const OrderType = types
	.model('OrderType', {
		id: types.number,
		description: types.optional(types.string, ""),
		price: types.model({
			text: types.string,
			unit: types.string,
			value: types.number
		}),
		is_active: types.boolean,
		photos: types.array(types.model({
			width: types.number,
			height: types.number,
			value: types.string
		})),
		display_total_order: types.string,
		discount_price: types.optional(types.model({
			text: types.optional(types.string, " "),
			unit: types.optional(types.string, " "),
			value: types.optional(types.number, 0)
		}), {
			text: "",
			unit: "",
			value: 0
		}),
		quantity: types.number,
		name: types.string,
		note: types.maybeNull(types.string)
	})
	.views(self => ({

	}))
	.actions(self => ({
		setNote(note: string) {
			self.note = note
		}
	}))
export default OrderType;

