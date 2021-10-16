import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { HOME_SCREEN, MARK_FAVORITE_SCREEN, startApp } from '..'
import Modal from 'react-native-modal'
import Orders from '../../stores/Orders'
import { Icon } from '../../components'
import MarkRestaurant from '../../stores/MarkRestaurants'
export const ModalShowNotif = ({ toggleModal, isModalOpen, screens, isComplete }: any) => {
	return (
		<Modal
			isVisible={isModalOpen}
			onBackdropPress={() => {
				!isComplete && toggleModal()
			}}
			style={{
				shadowColor: "#000",
				shadowOffset: {
					width: 0,
					height: 2,
				},
				shadowOpacity: 0.25,
				shadowRadius: 3.84,
				elevation: 5,
			}}>
			<View style={{
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'white',
				padding: 18,
				borderRadius: 4,
				borderColor: 'rgba(0, 0, 0, 0.1)',
			}}>
				<View style={{
					justifyContent: 'center',
					alignItems: 'center'
				}}>
					<Image
						source={isComplete ? require('../../assets/success.png') : require('../../assets/fail.png')}
						style={{
							width: 100,
							height: 100,
						}}
					/>
					<Text style={{ fontWeight: '500', fontSize: 17, paddingVertical: 10, paddingTop: 18 }}>{isComplete ? "Đơn hàng của bạn đã được đặt thành công" : `Bạn có chắc muốn huỷ đơn hàng ? `}</Text>
				</View>
				{isComplete ?
					<TouchableOpacity
						onPress={() => {
							// startApp()
							
							const orderTypes = {
								restaurant: JSON.parse(JSON.stringify(Orders.restaurant)),
								dishesOrder: JSON.parse(JSON.stringify(Orders.orders)),
								totalPrice: Orders.totalPrice.toString(),
								timeComplete: Date.now().toString()
							}
							MarkRestaurant.add(orderTypes)
							Navigation.mergeOptions("COMPLETE_ORDER_SCREEN", {
								bottomTab: {
									badge: MarkRestaurant.orderComplete.length.toString()
								}
							})
							Orders.clear();
							toggleModal()
							// favorite ? Navigation.popToRoot(MARK_FAVORITE_SCREEN) : Navigation.popToRoot(HOME_SCREEN)
							Navigation.popToRoot(screens);
						}}
						style={{
							padding: 10,
							borderRadius: 4,
							borderWidth: 0.5,
							marginTop: 10,
							flexDirection: 'row',
							alignItems: 'center'
						}}>
						<Text style={{ paddingRight: 7 }}>TIẾP TỤC MUA</Text>
						<Icon AntDesign name="arrowright" color="black" />
					</TouchableOpacity>
					: <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 10 }}>
						<TouchableOpacity style={styles.buttonCancel}
							onPress={() => {
								toggleModal()
							}}
						>
							<Text>Huỷ</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.buttonCancel}
							onPress={() => {
								Orders.clear();
								toggleModal()
								// favorite ? Navigation.popToRoot(MARK_FAVORITE_SCREEN) : Navigation.popToRoot(HOME_SCREEN)
								Navigation.popToRoot(screens)
								// console.log(this.props.favorite)
							}}
						>
							<Text>OK</Text>
						</TouchableOpacity>
					</View>}
			</View>
		</Modal>
	)
}
const styles = StyleSheet.create({
	buttonCancel: {
		paddingHorizontal: 13,
		paddingVertical: 6,
		borderRadius: 20,
		borderWidth: 1,
		marginRight: 20
	},
})