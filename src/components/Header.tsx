import React, { useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar } from 'react-native'
import { Navigation } from "react-native-navigation";
import { Icon } from '../components'
import { colorStyles } from '../styles/ColorStyles'
import { SafeAreaView } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import UI from '../stores/UI'
import { observer } from 'mobx-react'
import Orders from '../stores/Orders'
interface HeaderProps {
	componentId?: string,
	handleBack?: Function,
	type?: number,
	titleName?: string,
	screens?: string,
	customHeader?: React.ReactElement,
	customLeftHeader?: React.ReactElement,
	customTitleHeader?: React.ReactElement
}
const Header = observer((props: HeaderProps) => {
	// console.log(props.customLeftHeader)
	const renderLeftComponent = () => {
		if (props.type === 1) return;
		return props.customLeftHeader ?
			props.customLeftHeader
			: <TouchableOpacity onPress={() => { Navigation.popTo(props.screens as string) }} >
				<Icon Ionicons name='ios-arrow-back-sharp' color={colorStyles.curiousBlue} size={23} />
			</TouchableOpacity>
	}
	const renderTitle = () => {
		if (props.customTitleHeader) return props.customTitleHeader
		if (props.type == 2 || props.type === 1) {
			return <Text style={{
				fontSize: 18,
				fontWeight: '600',
				paddingLeft: 10,
			}}>{props.titleName}</Text>;
		} else {
		}
	}
	const renderRightComponent = () => {
		if (props.customTitleHeader || props.type === 2) return;
		if (props.type === 1) return;
		return <TouchableOpacity onPress={() => console.log("dat")}>
			<Icon Ionicons name='ios-cart-outline' color={colorStyles.curiousBlue} size={28} />
		</TouchableOpacity>
	}
	return (
		<SafeAreaView style={[styles.headerContainer]} >
			<StatusBar
				barStyle='light-content'
				backgroundColor="transparent"
				translucent={true}
			/>
			{
				props.customHeader ?
					props.customHeader
					:
					<View style={[styles.header, { justifyContent: props.type === 1 ? 'center' : props.type === 2 ? 'flex-start' : 'space-around', marginLeft: props.type === 2 ? 10 : 0 }]}>

						<>
							{renderLeftComponent()}
							{renderTitle()}
							{renderRightComponent()}
						</>

					</View>
			}
		</SafeAreaView>

	)
})
const styles = StyleSheet.create({
	textinput: {
		paddingVertical: 10,
		borderRadius: 27,
		backgroundColor: '#f5f5f6',
		width: 180,
		paddingLeft: 30,
	},
	headerContainer: {
		justifyContent: 'flex-end',
		backgroundColor: colorStyles.white,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.20,
		shadowRadius: 1.41,

		elevation: 2,
		paddingBottom: 5

	},
	header: {
		height: 35,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
	}
})

Header.propTypes = {
	title: PropTypes.string,
	onClose: PropTypes.func,
	leftComponent: PropTypes.element,
	rightComponent: PropTypes.element,
	testID: PropTypes.string,
	accessibilityLabel: PropTypes.string,
	leftOnPress: PropTypes.func,
	menuType: PropTypes.number,
	defaultHeader: PropTypes.string,
};
export default Header