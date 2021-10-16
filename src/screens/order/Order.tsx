import { autobind } from 'core-decorators'
import React from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { Navigation } from 'react-native-navigation'
import Header from '../../components/Header'
import UI from '../../stores/UI'
import { colorStyles } from '../../styles/ColorStyles'
import { OrderItem } from '../../components/OrderItem'
import { Icon } from '../../components'
import ShowOrderDetailModal from '../../screens/order/ShowOrderDetailModal'
import Orders from '../../stores/Orders'
import { MapOrderViewScreen } from '../'
import { RESTAURANT_FOOD_SCREEN } from '../'
interface Props {
	componentId: string;
	testID?: string;
	handleBack?: Function,
	screens?: string
}
export default class Order extends React.Component<Props> {
	static get options() {
		return {
			topBar: {
				visible: false
			},
			bottomTabs: {
				visible: false
			}
		}
	}
	constructor(props: any) {
		super(props)
	}
	componentDidMount() {
		this.fetchData()
	}
	async fetchData() {
		// Dishes.clear()
		// await Dishes.fetchData(this.props.id_restaurant)
	}
	componentDidAppear() {
		this.updateOptions();
	}
	@autobind
	updateOptions() {
		const opts = Order.options;
		Navigation.mergeOptions(this.props.componentId, opts);
	}
	UNSAFE_componentWillMount() {
		UI.addScreen(this);
	}
	componentWillUnmount() {
		UI.removeScreen(this);
	}
	render() {

		return (
			<View style={{ backgroundColor: colorStyles.mercury, flex: 1 }}>
				<Header
					componentId={RESTAURANT_FOOD_SCREEN}
					type={2}
					titleName={Orders.restaurant?.name}
					screens={this.props.screens}
				/>
				<View style={[styles.container, { marginTop: 10 }]}>
					<Text style={{ fontWeight: '200' }}>Địa điểm giao hàng </Text>
					<Text style={{ fontWeight: '700', paddingVertical: 3, fontSize: 20 }}>LandMarrk 72 </Text>
				</View>
				<View style={[styles.container, { marginTop: 10 }]}>
					<View style={{ flexDirection: 'row' }}>
						<View style={{
							borderWidth: 0.3,
							borderColor: colorStyles.mercury,
							padding: 8,
							borderRadius: 30,
							backgroundColor: colorStyles.alto
						}}>
							<Icon MaterialCommunityIcons name="motorbike" size={30} color={colorStyles.apple} />
						</View>
						<View style={{ marginLeft: 20 }}>
							<Text style={{ fontWeight: '700', fontSize: 17 }}>Giao hàng</Text>
							<Text style={{ paddingTop: 5 }}>Giao hàng trong 26 phút</Text>
						</View>
					</View>
				</View>
				<ShowOrderDetailModal />
				<View style={styles.wrapBill}>
					<Text style={{ fontSize: 16, fontWeight: '700', paddingBottom: 15 }}>Tóm tắt thanh toán</Text>
					<View style={{ borderBottomWidth: 0.5, paddingBottom: 10, marginBottom: 10 }}>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
							<Text style={{}}>Phí giao hàng</Text>
							<Text style={{ fontWeight: '300', fontSize: 17 }}>15,000 đ</Text>
						</View>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
							<Text style={{ paddingVertical: 12 }}>Phí dịch vụ</Text>
							<Text style={{ paddingVertical: 12, fontWeight: '300', fontSize: 17 }}>2,000 đ</Text>
						</View>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
							<Text>Phí đơn hàng</Text>
							<Text style={{ fontWeight: '300', fontSize: 17 }}>{Orders && Intl.NumberFormat().format(Orders.totalPrice)} {Orders.orders[0] && Orders.orders[0].price.unit}</Text>
						</View>
					</View>
					<TouchableOpacity style={styles.order} onPress={() => {
						// console.log({ mapFave: this.props.favorite })
						MapOrderViewScreen(this.props.screens)
					}}>
						<Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, paddingLeft: 10 }}>Đặt hàng</Text>
						<View style={{ flexDirection: 'row', alignItems: 'baseline', paddingRight: 10 }}>
							<Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}> {Orders && Intl.NumberFormat().format(Orders.totalPrice + 15000 + 2000)} {Orders.orders[0] && Orders.orders[0].price.unit}</Text>
							<View style={{ backgroundColor: 'white', marginLeft: 10, borderRadius: 20, padding: 4 }}>
								<Icon AntDesign name="arrowright" color={colorStyles.grayChateau} />
							</View>
						</View>
					</TouchableOpacity>
				</View>
				{/* <OrderItem screens={this.props.componentId} /> */}
			</View>
		)
	}
}
const styles = StyleSheet.create({
	order: {
		backgroundColor: colorStyles.apple,
		justifyContent: 'space-between',
		flexDirection: 'row',
		padding: 8,
		borderRadius: 20,
		alignItems: 'baseline'
	},
	wrapBill: {
		backgroundColor: colorStyles.white,
		borderWidth: 0.5,
		borderColor: colorStyles.grayChateau,
		paddingHorizontal: 15,
		paddingVertical: 30,
		margin: 10,
		borderRadius: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},
	container: {
		padding: 13,
		backgroundColor: colorStyles.white,
		// backgroundColor: colorStyles.mercury,
		// marginTop: 10
	},
	wrapButton: {
		backgroundColor: colorStyles.white,
		padding: 5,
		paddingHorizontal: 18,
		borderWidth: 0.5,
		borderRadius: 20,
		marginRight: 7,
		borderColor: colorStyles.doveGray,
		flexDirection: 'row',
		alignItems: 'baseline'
	},
	note: {
		fontWeight: '600',
		marginLeft: 10
	}
})