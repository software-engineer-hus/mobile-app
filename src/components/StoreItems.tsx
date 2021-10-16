import React from 'react'
import { View, Text, Image } from 'react-native'

interface StoreProps {
	image: {
		value: string,
		height: number,
		width: number,
	}
}
export const StoreItems = (props: StoreProps) => {
	return (
		<Image
			source={{ uri: props.value }}
			// index={index}
			style={{
				width: props.width,
				height: props.height,
				flex: 1
			}}
		/>
	)
}