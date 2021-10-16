import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { colorStyles } from '../../styles/ColorStyles'
import { CategoryFoodScreen } from '..'
import Categories from '../../stores/Category'
import { observer } from 'mobx-react'
import Image from 'react-native-image-progress';
import Restaurants from '../../stores/Restaurant'
export const CategoryItem = observer((props: any) => {
	const { item, index, fetchData } = props
	return (
		<TouchableOpacity
			onPress={() => {
				Categories.setSelectCategory(index)
				Restaurants.clear();
				fetchData(index)
			}}
			style={[styles.container, { backgroundColor: index === Categories.isSelect ? colorStyles.pomegranate : colorStyles.white }]}>
			<View style={[styles.radius, { backgroundColor: index === Categories.isSelect ? colorStyles.white : colorStyles.mercury }]}>
				<Image
					style={{
						width: 40,
						height: 40
					}}
					source={{ uri: item.icon[1].value }}
					resizeMode='contain'
				/>
			</View>
			<Text style={[styles.textUnderbox, { color: index === Categories.isSelect ? colorStyles.white : colorStyles.black }]}>
				{item.name}
			</Text>
		</TouchableOpacity>
	)
})
const styles = StyleSheet.create({
	container: {
		marginRight: 14,
		marginVertical: 10,
		padding: 3,
		// backgroundColor: colorStyles.pomegranate,
		height: 120,
		borderRadius: 60,
		width: 80,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,

		elevation: 3,
	},
	textUnderbox: {
		fontWeight: '700',
		fontSize: 13,
		marginBottom: 10
	},
	radius: {
		backgroundColor: colorStyles.white,
		borderRadius: 50,
		padding: 7,
		marginBottom: 10
	}
})