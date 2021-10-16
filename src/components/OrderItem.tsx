import React, { useEffect, useRef } from 'react'

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { colorStyles } from '../styles/ColorStyles'
import { OrderScreen } from '../screens/'
import Orders from '../stores/Orders'
import { observer } from 'mobx-react'
// import { showOrderDetail } from '../screens'
import RBSheet from "react-native-raw-bottom-sheet";
import ShowOrderDetailModal from '../screens/order/ShowOrderDetailModal'
interface Props {
	handleBack?: Function,
	favorite?: boolean,
	screens?: string
	// orderComplete?: boolean
}
export const OrderItem = observer((props: Props) => {
	const refRBSheet = useRef(700);
	// console.log({refRBSheet:refRBSheet})
	// console.log(refRBSheet.current.props.height)
	// useEffect(() => {
	// 	refRBSheet.current.open()
	// }, [])
	// console.log(JSON.parse(JSON.stringify(Orders.orders)), JSON.parse(JSON.stringify(Orders.restaurant)))
	// props.orderComplete && refRBSheet.current.open()
	const orders = JSON.parse(JSON.stringify(Orders.orders))
	const restaurant = JSON.parse(JSON.stringify(Orders.restaurant))
	return (
		<>
			{
				orders.length === 0 ? <Text style={{ position: 'absolute' }}></Text> : <TouchableOpacity
					style={{
						position: 'absolute',
						bottom: 20,
						marginHorizontal: 15,
						right: 0,
						left: 0,
						paddingHorizontal: 30,
						paddingVertical: 5,
						backgroundColor: colorStyles.apple,
						shadowColor: "#000",
						shadowOffset: {
							width: 0,
							height: 2,
						},
						shadowOpacity: 0.25,
						shadowRadius: 3.84,
						borderRadius: 30,
						elevation: 5,
					}}
					onPress={() => refRBSheet.current.open()}
				>
					<View>
						<RBSheet
							ref={refRBSheet}
							closeOnPressBack={true}
							dragFromTopOnly={true}
							height={700}
							// closeOnDragDown={true}
							// closeOnPressMask={false}
							customStyles={{
								wrapper: {
									backgroundColor: "transparent"
								},
								draggableIcon: {
									backgroundColor: "#000"
								}
							}}
						>
							<ShowOrderDetailModal
								payment={true}
								refRBSheet={() => refRBSheet.current.close()}
								handleBack={props.handleBack}
								favorite={props.favorite}
								screens={props.screens}
							/>
						</RBSheet>
					</View>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<View>
							<Text style={{ fontWeight: '800', color: colorStyles.white }}>{orders && orders.length} món</Text>
							<Text style={{ fontWeight: '400', color: colorStyles.white }}>{restaurant && restaurant.name.length >= 33 ? restaurant.name.slice(0, 33) + "..." : restaurant.name}</Text>
						</View>
						<View style={{ justifyContent: 'center', marginLeft: 10 }}>
							<Text style={{ fontWeight: '800', color: colorStyles.white }}>{Intl.NumberFormat().format(Orders.totalPrice)} {Orders.orders[0].price.unit}</Text>
						</View>
					</View>
				</TouchableOpacity>
			}
			{/* <View style={{
				position: 'absolute',
				bottom: 0,
				// marginHorizontal: 15,
				right: 0,
				left: 0,
				height: 700,
				backgroundColor: 'white',
				shadowColor: "#000",
				shadowOffset: {
					width: 0,
					height: 2,
				},
				shadowOpacity: 0.25,
				shadowRadius: 3.84,
				// borderRadius: 30,
				elevation: 5,
				// paddingHorizontal: 10,
				paddingVertical: 5,
			}}>
				<ShowOrderDetailModal
					payment={true}
					refRBSheet={() => refRBSheet.current.close()}
					handleBack={props.handleBack}
					favorite={props.favorite}
					screens={props.screens}
				/>
			</View> */}
		</>
	)
})

const styles = StyleSheet.create({

})