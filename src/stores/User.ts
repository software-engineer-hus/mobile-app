import { types, unprotect } from 'mobx-state-tree'
import RestaurantModel from './models/RestaurantModel'
import OrderType from './models/OrdersModel'
import Services from '../services/Services'
const userFirebase = types.model({
	displayName: types.maybeNull(types.string),
	email: types.optional(types.array(OrderType), []),
	metadata: types.model({
		creationTime: types.number,
		lastSignInTime: types.number
	}),
	refreshToken: types.string,
	uid: types.string,
})
const UserTypes = types
	.model('Users', {
		orderComplete: userFirebase,
		address: types.optional(types.array(RestaurantModel), [])
	})
	.views(self => ({

	}))
	.actions(self => ({
		clear() {

		},

	}))

const User = UserTypes.create()
unprotect(User)
export default User;
