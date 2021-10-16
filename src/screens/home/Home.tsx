import React from 'react'
import { Navigation } from 'react-native-navigation'
import { Text, StyleSheet, View, ActivityIndicator, TouchableOpacity } from 'react-native'
import { CategoryGroupHeader } from './CategoryGroupHeader'
import Restaurants from '../../stores/Restaurant'
import Categories from '../../stores/Category'
import { autobind } from 'core-decorators';
import UI from '../../stores/UI'
import Header from '../../components/Header'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { OrderItem } from '../../components/OrderItem'
import { Icon } from '../../components/Icon'
import { colorStyles } from '../../styles/ColorStyles'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import Toast from 'react-native-simple-toast';
interface Props {
	componentId: string;
	testID?: string;
}
@observer
export default class Home extends React.Component<Props> {
	@observable
	static get options() {
		return {
			bottomTab: {
				text: 'Home',
				icon: require('../../assets/HomeSelect.png'),
				selectedIconColor: 'black',
				selectedTextColor: 'black'
			},
			layout: {
				// backgroundColor: 'black'
			},
			topBar: {
				visible: false
			}
		}
	}
	constructor(props: any) {
		super(props);
		Navigation.events().bindComponent(this);
	}

	UNSAFE_componentWillMount() {
		UI.addScreen(this);
	}
	componentDidMount() {
		this.fetchData()
		// AsyncStorage.removeItem('firstStartApp');
	}
	async fetchData(index = 0, increase: boolean = false) {
		const dataCategory = JSON.parse(JSON.stringify(Categories.categories))
		if (dataCategory[index]) {
			increase && Restaurants.pageIncrease()
			Restaurants.fetchDataByCategoryId(dataCategory[Categories.isSelect].id, Restaurants.page)
		}
		else {
			await Categories.fetchData()
			Restaurants.fetchDataByCategoryId(1000000, Restaurants.page);
			Categories.clearSelect()
			// console.log(Categories.isSelect)
		}
	}
	componentDidAppear() {
		this.updateOptions();
	}
	componentWillUnmount() {
		UI.removeScreen(this);
	}
	@autobind
	updateOptions() {
		const opts = Home.options;
		Navigation.mergeOptions(this.props.componentId, opts);
	}
	render() {
		// Toast.showWithGravity('This is a toast.');
		// Toast.show('This is a long toast.', Toast.LONG);
		return (
			<>
				<Header
					customHeader={
						<TouchableOpacity
							style={{ height: 45, paddingHorizontal: 10, marginBottom: 2, paddingRight: 30 }}
							onPress={() => { Navigation.popTo(this.props.componentId as string) }} >
							<Text style={{ color: colorStyles.boulder, paddingBottom: 4, paddingLeft: 4, fontSize: 13 }}>Giao hàng đến: </Text>
							<View style={{ flexDirection: 'row', flex: 1, alignItems: 'baseline' }}>
								<Icon Ionicons name="ios-location-sharp" color={colorStyles.thunderbird} />
								<Text
									numberOfLines={1}
									style={{
										fontWeight: '600',
										paddingRight: 5
									}}>[Số nhà 11 ngõ 178] Ngõ 178 Quan Nhân Nhân Chính Thanh Xuân Hà Nội</Text>
								<Icon MaterialIcons name="arrow-forward-ios" color={colorStyles.thunderbird} size={13} />
							</View>
						</TouchableOpacity>
					}
				/>
				{/* {this.isLoading ?
					<View style={{
						justifyContent: 'center',
						alignItems: 'center',
						flex: 1
					}}>
						<ActivityIndicator size="large" color="#00ff00" />
					</View>
					:  */}
					<View style={styles.container} >
						<CategoryGroupHeader
							props={this.props}
							fetchData={this.fetchData}
						/>
					</View>
					{/* // } */}
				<OrderItem screens={this.props.componentId} />
			</>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 0,
		paddingHorizontal: 13
	},
})