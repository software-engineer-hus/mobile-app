import { Navigation } from 'react-native-navigation'
import { types } from 'mobx-state-tree'
const CategoryModel = types
	.model('Category', {
		_id: types.string,
		id: types.number,
		code: types.string,
		name: types.string,
		display_order: types.number,
		tab_icon: types.optional(
			types.array(
				types.model({
					width: types.number,
					value: types.string,
					height: types.number,
				})
			)
			, []),
		icon: types.optional(types.array(types.model({
			width: types.number,
			value: types.string,
			height: types.number,
		})), [])
	})
export default CategoryModel;
