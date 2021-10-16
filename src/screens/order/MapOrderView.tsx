import { autobind } from 'core-decorators';
import React from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Navigation } from 'react-native-navigation';
import UI from '../../stores/UI';
import MapView, { Marker } from 'react-native-maps';
import { colorStyles } from '../../styles/ColorStyles';
import { Icon } from '../../components/Icon';
import Orders from '../../stores/Orders'
import { HOME_SCREEN, MARK_FAVORITE_SCREEN, COMPLETE_ORDER_SCREEN } from '../../screens/'
import { CompleteOrderScreen } from '../../screens'
import Modal from 'react-native-modal';
import MarkRestaurant from '../../stores/MarkRestaurants';
import { startApp } from '../../screens'
import { ModalShowNotif } from './ModalShowNotif';
interface Props {
	componentId: string,
	screens?: string
}
export default class MapOrderView extends React.Component<Props> {
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
	state = {
		isModalOpen: false,
		isComplete: false
	}
	constructor(props: any) {
		super(props)
	}
	componentDidAppear() {
		this.updateOptions();
	}
	@autobind
	updateOptions() {
		const opts = MapOrderView.options;
		Navigation.mergeOptions(this.props.componentId, opts);
	}
	UNSAFE_componentWillMount() {
		UI.addScreen(this);
	}
	componentWillUnmount() {
		UI.removeScreen(this);
	}
	toggleModal(isComplete: boolean) {
		this.setState({
			isModalOpen: !this.state.isModalOpen,
			isComplete: isComplete
		})
	}
	render() {
		return (
			<>
				<View style={styles.container}>
					<MapView
						style={{ flex: 1 }}
						minZoomLevel={14}
						initialRegion={{
							latitude: 21.0163427,
							longitude: 105.7818576,
							latitudeDelta: 0.0922,
							longitudeDelta: 0.0421,
						}}
						zoomEnabled={true}
						// showsUserLocation={true}
						onPanDrag={(coordinate) => {

						}}
						onMarkerDragEnd={(x) => {
							console.log(x)
						}}
					// scrollEnabled={false}
					>
						<Marker
							title={Orders.restaurant?.name}
							coordinate={{
								"latitude": 21.0163427,
								"longitude": 105.7818576
							}}
							image={require('../../assets/map.png')}

						/>
						{/* <Geojson
						geojson={myPlace}
						strokeColor="red"
						Huỷ="green"
						strokeWidth={2}
					/> */}
					</MapView>


					<View style={{
						position: 'absolute',
						top: 50,
						right: 50,
						left: 20,
						shadowColor: "#000",
						shadowOffset: {
							width: 0,
							height: 2,
						},
						shadowOpacity: 0.25,
						shadowRadius: 3.84,
						elevation: 5,
					}}>
						<TouchableOpacity
							onPress={() => {
								Navigation.pop(UI.previousComponentIdScreen)
							}}
							style={{ backgroundColor: 'white', width: 40, height: 40, borderRadius: 50, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
							<Icon Ionicons name="ios-chevron-back-sharp" color="black" size={20} />
						</TouchableOpacity>
					</View>
					<View style={styles.wrapInfo}>
						<View style={{ flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'space-between', marginTop: 10 }}>
							<View style={{ flexDirection: 'row' }}>
								<Image
									source={require('../../assets/avt.jpeg')}
									style={{ width: 65, height: 65, borderRadius: 50 }}
								/>
								<View style={{ marginLeft: 15, marginTop: 10 }}>
									<Text style={{ color: 'white', fontWeight: '600', fontSize: 17 }}>Lê Thành Đạt</Text>
									<View style={{ flexDirection: 'row', paddingTop: 4 }}>
										<Icon AntDesign name="star" color={colorStyles.pizazz} />
										<Icon AntDesign name="star" color={colorStyles.pizazz} />
										<Icon AntDesign name="star" color={colorStyles.pizazz} />
										<Icon AntDesign name="star" color={colorStyles.pizazz} />
										<Icon AntDesign name="star" />
									</View>
								</View>
							</View>
							<View style={{ flexDirection: 'row', marginTop: 20 }}>
								<Icon AntDesign name="message1" size={28} style={{ paddingRight: 13 }} color={colorStyles.pizazz} />
								<Icon AntDesign name="phone" size={28} color={colorStyles.pizazz} />
							</View>
						</View>
						<View style={styles.info}>
							<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
								<View style={{ alignItems: 'center' }}>
									<Icon Entypo name="dot-single" size={30} />
								</View>
								<View style={{ width: 100, marginTop: 14 }}>
									<View style={{ borderWidth: 0.5, width: '100%', borderColor: colorStyles.silver }}></View>
								</View>
								<View style={{ alignItems: 'center' }}>
									<Icon Entypo name="dot-single" size={30} />
								</View>
								<View style={{ width: 100, marginTop: 14 }}>
									<View style={{ borderWidth: 0.5, width: '100%', borderColor: colorStyles.silver }}></View>
								</View>
								<View style={{ alignItems: 'center', paddingLeft: 10 }}>
									<Icon Ionicons name="checkmark-done-circle-outline" size={25} color={colorStyles.thunderbird} />
								</View>
							</View>
							<View style={{ flexDirection: 'row' }}>
								<View style={{ alignItems: 'center', paddingLeft: 4 }}>
									<Text style={{ fontSize: 12 }}>10:41</Text>
									<Text style={{ paddingTop: 7, fontSize: 12 }}>Đã đăt</Text>
								</View>
								<View style={{ alignItems: 'center', paddingLeft: 95, }}>
									<Text style={{ fontSize: 12 }}>10:50</Text>
									<Text style={{ paddingTop: 7, fontSize: 12 }}>Đã lấy</Text>
								</View>
								<View style={{ alignItems: 'center', paddingLeft: 80, }}>
									<Text style={{ fontSize: 12, fontWeight: '700' }}>11:10</Text>
									<Text style={{ paddingTop: 7, fontSize: 12, fontWeight: '700' }}>Hoàn thành </Text>
								</View>
							</View>
							<View style={{ paddingTop: 5, flexDirection: 'row', alignItems: 'center' }}>
								<View style={{
									backgroundColor: colorStyles.amber,
									padding: 10, borderRadius: 100,
									marginRight: 12
								}}>
									<Icon Feather name="map-pin" size={15} color={colorStyles.thunderbird} />
								</View>
								<Text>Toàn nhà 72 landmark</Text>
							</View>
							<View style={{ paddingTop: 5, flexDirection: 'row', alignItems: 'center' }}>
								<View style={{
									backgroundColor: colorStyles.amber,
									padding: 10, borderRadius: 100,
									marginRight: 12
								}}>
									<Icon FontAwesome5 name="store" size={15} color={colorStyles.thunderbird} />
								</View>
								<Text>{Orders.restaurant?.address}</Text>
							</View>
							<View style={{ paddingTop: 5, flexDirection: 'row', alignItems: 'center' }}>
								<View style={{
									backgroundColor: colorStyles.amber,
									padding: 10,
									borderRadius: 100,
									marginRight: 12
								}}>
									<Icon FontAwesome name="money" size={15} color={colorStyles.thunderbird} />
								</View>
								<Text>Tiền mặt: <Text style={{ fontWeight: '700', fontSize: 17 }}>{Intl.NumberFormat().format(Orders.totalPrice + 17000)}đ</Text></Text>
							</View>
							<View style={{
								position: 'absolute',
								bottom: 0,
								right: 0,
								left: 0,
								height: 60,
								flexDirection: 'row',
								justifyContent: 'space-between',
								shadowColor: "#000",
								shadowOffset: {
									width: 0,
									height: 4,
								},
								shadowOpacity: 0.30,
								shadowRadius: 4.65,
								elevation: 8,
								// padding: 10,

							}}>
								<TouchableOpacity style={[styles.button, {
									backgroundColor: colorStyles.thunderbird,
									borderBottomLeftRadius: 50,
									flexDirection: 'row'
								}]}
									onPress={() => {
										// Navigation.popToRoot(HOME_SCREEN);
										this.toggleModal(false)

									}}
								>
									<Icon EvilIcons name="close-o" size={25} color={colorStyles.white} />
									<Text style={styles.txt}>Huỷ</Text>
								</TouchableOpacity>

								<TouchableOpacity style={[styles.button, {
									borderRightWidth: 0,
									borderBottomRightRadius: 50,
									backgroundColor: colorStyles.apple,
									flexDirection: 'row'
								}]}
									onPress={() => {
										
										this.toggleModal(true)
									}}
								>
									<Icon Ionicons name="checkmark-done-circle-outline" size={25} color={colorStyles.white} />
									<Text style={styles.txt}>Hoàn thành</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
				<View style={{}}>
					<ModalShowNotif
						toggleModal={() => this.toggleModal(this.state.isComplete)}
						isComplete={this.state.isComplete}
						isModalOpen={this.state.isModalOpen}
						screens={this.props.screens}
					/>
				</View>
			</>
		)
	}
}

const styles = StyleSheet.create({

	txt: {
		fontWeight: '600',
		fontSize: 20,
		color: 'white'
	},
	button: {
		borderRightWidth: 0.5,
		borderColor: colorStyles.mercury,
		width: '50%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	container: {
		flex: 1,
	},
	wrapInfo: {
		height: 380,
		padding: 10,
		backgroundColor: colorStyles.scarpaFlow,
		position: 'absolute',
		bottom: 11,
		right: 11,
		left: 11,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		borderRadius: 50
	},
	info: {
		backgroundColor: 'white',
		position: 'absolute',
		bottom: 0,
		right: 0,
		left: 0,
		borderRadius: 50,
		paddingHorizontal: 50,
		paddingVertical: 15,
		paddingLeft: 33,
		height: 280,
	}
})