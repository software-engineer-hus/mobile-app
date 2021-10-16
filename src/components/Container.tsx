import React from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
export const Container = (props : any) => {
	const { children } = props
	return (
		<View style={[styles.container, { ...props }]}>
			{children && children}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// padding: 20
	}
})