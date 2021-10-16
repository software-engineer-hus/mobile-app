import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import UI from '../../stores/UI'
import Header from '../../components/Header'
import { Navigation } from 'react-native-navigation'
import { autobind } from 'core-decorators';
import Dishes from '../../stores/Dishes'
import { GroupFood } from './GroupFood'
import Empty from '../../components/Empty'
import { observer, Observer } from 'mobx-react'
import { BlurView } from '@react-native-community/blur';
import { colorStyles } from '../../styles/ColorStyles'
import { Icon } from '../../components/Icon'
import { OrderItem } from '../../components/OrderItem'
import { HOME_SCREEN, MARK_FAVORITE_SCREEN } from '../'
import MarkRestaurant from '../../stores/MarkRestaurants'
import Image from 'react-native-image-progress';
interface Props {
	componentId: string;
	testID?: string;
	id_restaurant: number,
	restaurantInfo: any,
	favorite: boolean,
	screen?: string,
}
import Loading from '../../components/Loading'

@observer
export default class RestaurantFood extends React.Component<Props> {
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
	// MarkFavorite = observer(() => {
	// 	const isFavorite = MarkRestaurant.restaurantFavorite.findIndex((x, i) => {
	// 		x.id === this.props.restaurantInfo.id
	// 	})
	// 	return <View></View>
	// })
	constructor(props: any) {
		super(props)
	}
	componentDidMount() {
		this.fetchData()
	}
	async fetchData() {
		await Dishes.fetchData(this.props.id_restaurant)
	}
	componentDidAppear() {
		this.updateOptions();
	}
	@autobind
	updateOptions() {
		const opts = RestaurantFood.options;
		Navigation.mergeOptions(this.props.componentId, opts);
	}
	UNSAFE_componentWillMount() {
		UI.addScreen(this);
	}
	componentWillUnmount() {
		UI.removeScreen(this);
	}
	render() {
		const restaurantInfo = this.props.restaurantInfo
		const markRestaurant = JSON.parse(JSON.stringify(MarkRestaurant.restaurantFavorite))
		return (
			<>
				<View style={styles.wrapBackimage}>

					<Image
						source={{ uri: restaurantInfo && restaurantInfo.photos[8].value }}
						style={[styles.backdrop, {
							width: '100%',
							height: 230
						}]}
						resizeMode='cover'
						blurRadius={0.5}
					/>
					<TouchableOpacity
						onPress={() => {
							Navigation.popTo(this.props.screen as string);
							// this.props.favorite ? Navigation.popTo(MARK_FAVORITE_SCREEN) : Navigation.popTo(HOME_SCREEN)
						}}
						style={{
							position: 'absolute',
							top: 40,
							left: 20,
							right: 0,
							bottom: 0
						}}>
						<Icon Ionicons name='ios-chevron-back-sharp' color={colorStyles.white} size={40} />
					</TouchableOpacity>
				</View>

				<FlatList
					data={JSON.parse(JSON.stringify(Dishes.dishes))}
					ListHeaderComponent={() => <View style={styles.wrapName}>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 10 }}>
							<Text style={styles.name}>{restaurantInfo && restaurantInfo.name}</Text>
							<View style={{ justifyContent: 'center' }}>
								<TouchableOpacity onPress={() => {
									MarkRestaurant.addFavorite(restaurantInfo);
									// console.log(JSON.parse(JSON.stringify(MarkRestaurant.restaurantFavorite)))
								}}>
									{
										markRestaurant.findIndex((x: any) => { return x.id === restaurantInfo.id }) < 0 ?
											< Icon AntDesign name="heart" size={31} />
											:
											<Icon AntDesign name="heart" size={31} color={colorStyles.thunderbird} />

									}
									{/* <Icon AntDesign name="heart" size={21} color={isFavorite < 0 ? colorStyles.black : colorStyles.thunderbird} /> */}
								</TouchableOpacity>
								<TouchableOpacity style={{ position: 'absolute', borderWidth: 1, borderColor: 'white', paddingHorizontal: 4, top: 0, right: -10, backgroundColor: colorStyles.thunderbird, borderRadius: 50, }}>
									<Text style={{ fontSize: 10, color: colorStyles.white, fontWeight: '700' }}>{markRestaurant.length}</Text>
								</TouchableOpacity>
							</View>
						</View>
						<View style={{ marginTop: 3, flexDirection: 'row', }}>
							<View style={{ flexDirection: 'row', alignItems: 'baseline', }}>
								<Icon AntDesign name='star' color={colorStyles.saffron} size={21} />
								<Text style={{ paddingLeft: 5 }}>{restaurantInfo && restaurantInfo.rating.avg} - 1.5km</Text>
							</View>
						</View>
					</View>}
					renderItem={({ item, index }) => {
						return (
							<GroupFood
								groupItem={item}
								groupIndex={index}
								restaurantInfo={restaurantInfo && restaurantInfo}
							// favorite={this.props.favorite}
							/>
						)
					}}
					ListFooterComponent={
						<View style={{
							justifyContent: 'center',
							alignItems: 'center',
							flex: 1
						}}>
							<Loading />
						</View>}
					ListEmptyComponent={<Empty message="No Food Provide" />}
					keyExtractor={(item, index) => index.toString()}
					showsVerticalScrollIndicator={false}
				/>
				<OrderItem favorite={this.props.favorite} screens={this.props.componentId} />
			</>
		)
	}
}
const styles = StyleSheet.create({
	wrapName: {
		paddingHorizontal: 13,
		paddingVertical: 10
	},
	name: {
		fontWeight: '700',
		fontSize: 20,
		width: '80%'
	},
	wrapBackimage: {
		// width: '100%',
		// flex: 1,
		backgroundColor: 'white'
	},
	backdrop: {
		position: 'relative',
		top: 0,
		left: 0,
		right: 0
	},
})