import React from 'react'
import { Text, TouchableOpacity, View, StyleSheet, FlatList, TextInput } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { OrderScreen } from '../../screens'
import { colorStyles } from '../../styles/ColorStyles'
import Orders from '../../stores/Orders'
import { Icon } from '../../components'
import { observer } from 'mobx-react'
import Image from 'react-native-image-progress';

interface Props {
	componentId?: string;
	testID?: string;
	refRBSheet?: Function,
	payment?: boolean,
	handleBack?: Function,
	favorite?: boolean,
	screens?: string
}
interface HandleBackProps {
	handleBack?: Function
}
@observer
export default class ShowOrderDetailModal extends React.Component<Props> {

	constructor(props: any) {
		super(props)
	}
	addNote(x: any, item: any) {
		Orders.setNoteForSameDishes(item[0].id, x)
	}
	render() {
		const { payment } = this.props
		// console.log(JSON.parse(JSON.stringify(Orders.getGroupOrderByTypeID())))
		const restaurant = JSON.parse(JSON.stringify(Orders.restaurant))
		const data = JSON.parse(JSON.stringify(Orders.getGroupOrderByTypeID()))
		return (
			<View style={{ flex: 1 }}>
				{/* <Header /> */}
				{payment && <View style={styles.header}>
					<TouchableOpacity onPress={() => {
						this.props.refRBSheet()
					}}>
						<Icon AntDesign name="close" size={30} color={colorStyles.black} />
					</TouchableOpacity>
					<View >
						<Text style={{ fontWeight: '600', fontSize: 18 }}>Giỏ hàng</Text>
					</View>
					<TouchableOpacity onPress={() => Orders.clear()}>
						<Text style={{ fontWeight: '400', fontSize: 15, color: 'red' }}>Xoá hết</Text>
					</TouchableOpacity>
				</View>}
				<FlatList
					data={data}
					showsHorizontalScrollIndicator={false}
					renderItem={({ item, index }) => {
						return (
							<View style={styles.container}>
								<View style={styles.wrapFood}>
									<Image
										source={{ uri: item[0].photos[3].value }}
										style={{
											width: 80,
											height: 80,
										}}
									/>
									<View style={{ marginLeft: 10, width: payment ? 210 : 270 }}>
										<Text >{item[0].name}</Text>
										<View style={{ marginTop: 5}}>
											<View style={{ flexDirection: 'row' }}>
												<Icon Foundation name="clipboard-notes" color={colorStyles.black} />
												<TextInput
													placeholder='Ghi chú...'
													style={{ paddingLeft: 5, color: colorStyles.scarpaFlow }}
													onChangeText={(x) => {
														this.addNote(x, item)
													}}
													editable={payment ? true : false}
													defaultValue={item[0].note}
												/>
											</View>
											<Text style={{marginTop:7, fontWeight:'600'}}>Giá: {Intl.NumberFormat().format(item[0].discount_price.value ? item[0].discount_price.value : item[0].price.value)}đ</Text>
										</View>
									</View>
									{payment ? <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
										<TouchableOpacity onPress={() => {
											Orders.removeSingleDishes(item[0].id)
										}}>
											<Icon AntDesign name="minuscircleo" color={colorStyles.thunderbird} size={27} />
										</TouchableOpacity>
										<Text style={{ paddingHorizontal: 18, fontSize: 16, paddingBottom: 3 }}>{item.length}</Text>
										<TouchableOpacity onPress={() => {
											Orders.addSingleDishes(restaurant, item[0])
										}}>
											<Icon AntDesign name="pluscircle" color={colorStyles.thunderbird} size={27} />
										</TouchableOpacity>
									</View> :
										<View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
											<Text>x </Text><Text style={{ fontWeight: '600', fontSize: 20 }}>{item.length}</Text>
										</View>
									}
								</View>
							</View>
						)
					}}
					keyExtractor={(item, index) => index.toString()}
					ListFooterComponent={
						<>
							{payment && <View style={{ alignItems: 'flex-end', padding: 10, flexDirection: 'row', justifyContent: 'flex-end' }}>
								<Text>Tổng : </Text>
								<Text style={{ fontSize: 17, fontWeight: '700' }}>{Orders && Intl.NumberFormat().format(Orders.totalPrice)} {Orders.orders[0] && Orders.orders[0].price.unit}</Text>
								{Orders.orders[0] &&
									<TouchableOpacity style={styles.deliver} onPress={() => {
										this.props.refRBSheet()
										OrderScreen(this.props.handleBack as HandleBackProps, this.props.screens)
									}}>
										<Text style={{ fontWeight: '600', paddingRight: 5 }}>Giao hàng</Text>
										<Icon AntDesign name="arrowright" />
									</TouchableOpacity>}
							</View>}
						</>
					}
				/>
			</View>
		)
	}
}
const styles = StyleSheet.create({
	deliver: {
		alignItems: 'baseline',
		flexDirection: 'row',
		padding: 5,
		borderWidth: 0.5,
		borderRadius: 40,
		borderColor: colorStyles.boulder,
		marginLeft: 10,
		paddingHorizontal: 29,
		backgroundColor: 'white',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.30,
		shadowRadius: 4.65,

		elevation: 8,

	},
	wrapFood: {
		// justifyContent:'space-between',
		flexDirection: 'row'
	},
	header: {
		borderBottomWidth: 0.5,
		borderBottomColor: colorStyles.silver,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 8
	},
	container: {
		paddingHorizontal: 10,
		paddingTop: 10
	}
})