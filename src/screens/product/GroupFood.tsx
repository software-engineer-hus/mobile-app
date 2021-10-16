import React from 'react'
import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import { colorStyles } from '../../styles/ColorStyles'
import { FoodItem } from './FoodItem'
import { observer } from 'mobx-react'
interface Props {
	groupItem: any,
	groupIndex: number,
	restaurantInfo: any,
	// favorite: boolean
}
export const GroupFood = observer((props: Props) => {
	const { groupItem, groupIndex, restaurantInfo } = props

	return (
		<View style={styles.container}>
			<View style={{ backgroundColor: colorStyles.mercury, padding: 7 }}>
				<Text style={styles.type}>{groupItem.dish_type_name}</Text>
			</View>
			{groupItem.dishes && <FlatList
				data={groupItem.dishes}
				renderItem={({ item, index }) => {
					// console.log({ x: item })
					return (
						<>
							<FoodItem
								foodItem={item}
								foodIndex={index}
								restaurantInfo={restaurantInfo}
								// favorite={favorite}
							/>
						</>
					)
				}}
				style={{ padding: 7 }}
				keyExtractor={(x, i) => i.toString()}
				showsVerticalScrollIndicator={false}
			/>}
		</View>
	)
})

const styles = StyleSheet.create({
	container: {
	},
	type: {
		fontSize: 17,
		fontWeight: '200',
	}
})