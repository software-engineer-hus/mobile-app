import { Navigation } from 'react-native-navigation'
import CategoryModel from './models/CategoryModel'
import Services from '../services/Services'
import { types, unprotect } from 'mobx-state-tree'
import { flow } from 'mobx'
const CategoryType = types
	.model('Category', {
		categories: types.optional(types.array(CategoryModel), []),
		isLoading: types.optional(types.boolean, false),
		isSelect: types.optional(types.number, 0)
	})
	.views(self => ({
		get categoryFetch() {
			return self.categories
		}
	}))
	.actions(self => ({
		fetchData: flow(function* () {
			self.isLoading = true;
			try {
				Services.getCategories().then(res => {
					// console.log({ res: res })
					self.categories = res
				})
			}
			catch (e) {
				console.log(e)
			}
			self.isLoading = false
		}),
		clearSelect() {
			self.isSelect = 0
		},
		setSelectCategory(id: any) {
			self.isSelect = id
		},
		addSingleCategory(data: any) {
			self.categories.push(data)
		},

	}))
const Categories = CategoryType.create()
unprotect(Categories)
export default Categories;
