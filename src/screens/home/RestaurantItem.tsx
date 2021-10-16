import React, { useRef } from 'react'

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { Icon } from '../../components'
import { colorStyles } from '../../styles/ColorStyles'
import { DetailProductScreen, OrderScreen } from '..'
import { observer } from 'mobx-react'
import Dishes from '../../stores/Dishes'
import Orders from '../../stores/Orders'
import RBSheet from "react-native-raw-bottom-sheet";
import Image from 'react-native-image-progress';
interface Props {
	props: any,
	item: any,
	index: any,
	favorite?: boolean,
	screen? :string,
}
export const RestaurantItem = observer((props: Props) => {
	const { props: propsItem, item, index, favorite,screen } = props
	const refRBSheet = useRef();
	// console.log({ item: item, index: index })
	const ordersRestaurant = JSON.parse(JSON.stringify(Orders.restaurant))
	const moveToRestaurantFood = () => {
		Dishes.clear()
		DetailProductScreen(item.id, item, screen)
		// console.log(
		// 	{ itemid: item.id, item: item, favorite: favorite }
		// )
	}
	return (
		<>
			<TouchableOpacity style={styles.container}
				onPress={() => {
					if (ordersRestaurant) {
						if (ordersRestaurant.id === item.id) {
							moveToRestaurantFood()
						} else {
							// window.alert("Bạn đã có món ở giỏ hàng, bạn chắc chắn muốn thay đổi cửa hàng chứ ?")
							refRBSheet.current.open()
						}
					} else {
						moveToRestaurantFood()
					}
				}}
			>
				<View style={styles.wrap}>
					<View style={{ flexDirection: 'row' }}>
						<Image source={{ uri: item.photos[1].value }} style={{
							width: item.photos[1].width,
							height: item.photos[1].height
						}} />
						<View style={styles.wrapInfo}>
							<Text style={styles.name}>{item.name}</Text>
							<Text style={styles.address}>{item.address.length >= 35 ? item.address.slice(0, 35) + "..." : item.address}</Text>
							<View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 3 }}>
								<Icon AntDesign name='star' color={colorStyles.saffron} size={21} />
								<Text style={styles.rating}>{item.rating.avg} -</Text>
								<Text style={styles.cuisines}>{item.cuisines.map((x: string, i: number) => `${x} ${item.cuisines.length >= 2 ? item.cuisines.length != i + 1 ? "," : "" : ""}`)}</Text>
							</View>
							<View style={{ flexDirection: 'row', marginTop: 2, alignItems: 'baseline' }}>
								<View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
									<Icon EvilIcons name="tag" size={25} color="black" />
									<Text style={styles.priceRange}>Tối thiểu: {item.min_order_value.resource_args[0]}</Text>
								</View>
								<View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
									<Icon MaterialIcons name="attach-money" size={18} color="black" />
									<Text style={styles.priceRange}>Giá: {item.price_range.resource_args[0]}</Text>
								</View>
							</View>
							<View>

							</View>
						</View>
					</View>
				</View>
			</TouchableOpacity>
			<RBSheet
				ref={refRBSheet}
				closeOnDragDown={true}
				closeOnPressMask={false}
				customStyles={{
					wrapper: {
						backgroundColor: "transparent"
					},
					draggableIcon: {
						backgroundColor: "#000"
					}
				}}
			>
				{/* <YourOwnComponent /> */}
				<View style={{
					padding: 20,
					justifyContent: 'center',
					alignItems: 'center'
				}}>
					<Text style={{
						fontWeight: '700',
						fontSize: 21
					}}>Bạn đã có món ở giỏ hàng, bạn chắc chắn muốn thay đổi cửa hàng chứ ?</Text>
					<View style={{ padding: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
						<TouchableOpacity style={styles.button} onPress={() => {
							Orders.clear();
							refRBSheet.current.close()
							moveToRestaurantFood()
						}}>
							<Text>OK</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.button} onPress={() => {
							refRBSheet.current.close()
						}}>
							<Text>Không</Text>
						</TouchableOpacity>
					</View>
				</View>
			</RBSheet>
		</>
	)
})

const styles = StyleSheet.create({
	button: {
		borderWidth: 1,
		paddingVertical: 10,
		paddingHorizontal: 30,
		marginLeft: 20,
		borderRadius: 30
	},
	wrap: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,

		elevation: 3,
	},
	container: {
		flex: 1,
		paddingBottom: 10,
	},
	wrapInfo: {
		marginLeft: 8
	},
	name: {
		fontWeight: '700',
		fontSize: 16
	},
	address: {
		marginTop: 6
	},
	rating: {
		marginLeft: 6
	},
	cuisines: {
		marginLeft: 6,
		fontWeight: '500'
	},
	priceRange: {
		marginRight: 7,
	}
	// wrapImage: {
	// 	width: '100%',
	// 	// height: 160,
	// 	aspectRatio: 2,
	// 	// marginTop: 10
	// },
	// imageThumbnail: {
	// 	flex: 1,
	// 	alignSelf: 'stretch',
	// 	width: undefined,
	// 	height: undefined,
	// 	borderRadius: 40
	// },
	// wrapInfo: {
	// 	marginTop: 15,
	// },
	// nameProduct: {
	// 	fontSize: 25,
	// 	paddingBottom: 5
	// },
	// timeEstimate: {
	// 	backgroundColor: colorStyles.white,
	// 	position: 'absolute',
	// 	bottom: 0,
	// 	borderBottomLeftRadius: 40,
	// 	padding: 17,
	// 	borderTopRightRadius: 30
	// },
	// textEstimate: {
	// 	fontWeight: '600',
	// 	fontSize: 18
	// },
	// childWrap: {
	// 	flexDirection: 'row',
	// 	alignItems: 'baseline',
	// 	marginTop: 7
	// },
	// starNumber: { fontSize: 21, paddingLeft: 9 },
	// category: {
	// 	fontSize: 21,
	// 	paddingLeft: 20
	// },
	// category2: {
	// 	fontSize: 21,
	// }
})