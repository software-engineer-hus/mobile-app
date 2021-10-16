import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from '../../components/Icon'
import { colorStyles } from '../../styles/ColorStyles'
import Orders from '../../stores/Orders'
import Image from 'react-native-image-progress';
interface Props {
	foodItem: any,
	foodIndex: any,
	restaurantInfo: any
}
export const FoodItem = (props: Props) => {
	const { foodItem, foodIndex, restaurantInfo } = props

	// console.log({ model: restaurantInfo })
	return (
		<>
			<View style={{
				borderBottomWidth: 0.6,
				borderBottomColor: colorStyles.mercury,
				marginBottom: 10,
				flexDirection: 'row',
				// backgroundColor: 'yellow'
			}}>
				<View style={{
					marginBottom: 12,
					flexDirection: 'row',
					width: '60%',
					// backgroundColor: 'blue'
				}}>
					<Image
						style={{
							width: foodItem.photos[0].width - 20,
							height: foodItem.photos[0].height - 20
						}}
						source={{ uri: foodItem.photos[0].value }}
					/>
					<View style={{ paddingLeft: 8 }}>
						<Text style={{ fontWeight: '600', fontSize: 15, marginBottom: 3 }}>{foodItem.name}</Text>
						{foodItem.discount_price.text ?
							<Text style={{ marginBottom: 3 }}>
								<Text style={{ textDecorationLine: 'line-through', fontSize: 16 }}>
									{foodItem.price.text}
								</Text>
								{foodItem.discount_price.text && <View style={{ paddingHorizontal: 5, alignItems: 'baseline' }}>
									<Icon AntDesign name="arrowright" />
								</View>}
								<Text style={{ fontSize: 16 }}>
									{Intl.NumberFormat().format( foodItem.discount_price.value)}đ
								</Text>
							</Text> :
							<Text style={{ fontSize: 16 }}>
								{foodItem.price.text}
							</Text>
						}
						{foodItem.description.length >= 1 &&
							<Text style={{ fontSize: 15, marginBottom: 8 }}>{foodItem.description}</Text>
						}
						<View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
							<Icon AntDesign name="shoppingcart" color={colorStyles.grayChateau} />
							<Text style={{ marginLeft: 6 }}>{foodItem.display_total_order}</Text>
						</View>
					</View>
				</View>
				<TouchableOpacity style={{ width: '40%', marginLeft: 110, justifyContent: 'center' }}
					onPress={() => {
						Orders.addSingleDishes(restaurantInfo, foodItem)
						// console.log({
						// 	foodItem: foodItem,
						// 	restaurant: restaurantInfo
						// })
						// console.log(JSON.parse(JSON.stringify(Orders.orders)) , JSON.parse(JSON.stringify(Orders.restaurantId)))
					}}
				>
					<Icon Ionicons name='md-add-circle' size={35} color={colorStyles.apple} />
				</TouchableOpacity>
			</View>
		</>
	)
}

const styles = StyleSheet.create({

})