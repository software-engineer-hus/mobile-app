import React, { useEffect } from 'react'
import { Navigation } from 'react-native-navigation'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'
import Header from '../../components/Header'
import { autobind } from 'core-decorators'
import UI from '../../stores/UI'
import { Icon } from '../../components'
import Empty from '../../components/Empty'
import { observer } from 'mobx-react'
import { colorStyles } from '../../styles/ColorStyles'
import MarkRestaurants from '../../stores/MarkRestaurants'
import { OrderItem } from '../../components/OrderItem'
// import numeral from 'numer'
interface Props {
	componentId: string,
}
import { DetailProductScreen } from '..'
import Orders from '../../stores/Orders'
import moment from 'moment'

@observer
export default class CompleteOrder extends React.Component<Props> {
	static get options() {
		return {
			topBar: {
				visible: false
			}
		}
	}
	constructor(props: any) {
		super(props)
	}
	componentDidAppear() {
		this.updateOptions();
	}
	@autobind
	updateOptions() {
		const opts = CompleteOrder.options;
		Navigation.mergeOptions(this.props.componentId, opts);
	}
	// componentDidMount() {
	// 	this.fetchData()
	// }
	// async fetchData() {
	// 	// let data = await MarkRestaurants.getRestaurantById(MarkRestaurants.orderComplete[0].restaurant.id)
	// 	console.log(JSON.parse(JSON.stringify(MarkRestaurants.orderComplete[0].restaurant)))
	// }
	UNSAFE_componentWillMount() {
		UI.addScreen(this);
	}
	componentWillUnmount() {
		UI.removeScreen(this);
	}
	render() {
		const completRes = JSON.parse(JSON.stringify(MarkRestaurants.orderComplete))

		return (
			<>
				<Header type={1} titleName="Đơn hàng" />
				<View style={[styles.container, completRes.length >= 1  && { backgroundColor:  colorStyles.mercury }]}>
					<FlatList
						data={completRes.reverse()}
						showsVerticalScrollIndicator={false}
						ListEmptyComponent={<Empty message={`Vào cửa hàng chọn đồ ăn nhé \n Mỗi đơn hàng thành công sẽ hiển thị ở đây`} screens={this.props.componentId} />}
						renderItem={({ item, index }) => {
							// console.log({item:item})
							const reverseLenth = completRes.length--;
							// const date = new Date(item.timeComplete);
							return (
								<TouchableOpacity style={[styles.wrapBox]} >
									<View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }} >
										<View style={{ flexDirection: 'row' }}>
											<Text style={{ fontWeight: '700' }}>{item.restaurant.categories[0]}</Text>
											<Text style={{ paddingHorizontal: 10, color: colorStyles.boulder }}>#{reverseLenth}</Text>
										</View>
										<Text>{moment.utc(item.timeComplete).local().format("MM/DD/YYYY HH:mm")}</Text>
									</View>
									<View style={{ marginTop: 10, flexDirection: 'row', borderBottomWidth: 0.4, paddingBottom: 10, borderColor: colorStyles.boulder }}>
										<Image
											source={{ uri: item.restaurant.photos[1].value }}
											style={{
												width: 100,
												height: 100
											}}
										/>
										<View style={{ paddingLeft: 13, flex: 1, }}>
											<Text>{item.restaurant.name} </Text>
											<Text style={{ paddingVertical: 7, color: colorStyles.boulder }} numberOfLines={2}>{item.restaurant.address}</Text>
											<View style={{ flexDirection: 'row' }}>
												<Text style={{ fontWeight: '700' }}>{Intl.NumberFormat().format(item.totalPrice)}đ</Text>
												<Text style={{ color: colorStyles.boulder }}> {item.dishesOrder.length} phần - Tiền mặt</Text>
											</View>
										</View>
									</View>
									<View style={{ paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
										<Text style={{ fontWeight: '700' }}>Hoàn thành</Text>
										<View style={{ flexDirection: 'row', alignItems: 'center' }}>
											<Text>Không có đánh giá</Text>
											<TouchableOpacity
												onPress={() => {
													Orders.clear();
													item.dishesOrder.forEach((x: any) => {
														Orders.addSingleDishes(item.restaurant, x);
													})
													DetailProductScreen(item.restaurant.id, item.restaurant, this.props.componentId)

												}}
												style={{ marginLeft: 10, borderColor: colorStyles.boulder, borderWidth: 0.5, paddingHorizontal: 13, borderRadius: 15, paddingVertical: 4 }}>
												<Text>Đặt lại</Text>
											</TouchableOpacity>
										</View>
									</View>
								</TouchableOpacity>
							)
						}}
					/>
				</View>
				<OrderItem screens={this.props.componentId} />
			</>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
		flex: 1,
	},
	wrapBox: {
		backgroundColor: colorStyles.white,
		padding: 10,
		borderRadius: 4,
		marginTop: 10
	}
})