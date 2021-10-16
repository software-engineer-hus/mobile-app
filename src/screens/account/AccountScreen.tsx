import React from 'react'
import { Navigation } from 'react-native-navigation'
import { Text, StyleSheet, View, ActivityIndicator, TouchableOpacity } from 'react-native'
import { autobind } from 'core-decorators';
import UI from '../../stores/UI'
import Header from '../../components/Header'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { OrderItem } from '../../components/OrderItem'
import { Icon } from '../../components/Icon'
import auth from '@react-native-firebase/auth';
import { colorStyles } from '../../styles/ColorStyles';
import { AddressEditScreen } from '..';

interface Props {
	componentId: string;
	testID?: string;
}
@observer
export default class AccountScreen extends React.Component<Props> {
	@observable
	static get options() {
		return {
			bottomTab: {
				text: 'Tôi',
				// icon: require('../../assets/user.png'),
				selectedIconColor: 'black',
				selectedTextColor: 'black'
			},
			layout: {
				backgroundColor: 'black'
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
		// console.log({ dat: auth().currentUser?.toJSON() })
		// this.fetchData()
		// AsyncStorage.removeItem('firstStartApp');
	}
	async fetchData() {
	}
	componentDidAppear() {
		this.updateOptions();
	}
	componentWillUnmount() {
		UI.removeScreen(this);
	}
	@autobind
	updateOptions() {
		const opts = AccountScreen.options;
		Navigation.mergeOptions(this.props.componentId, opts);
	}
	render() {
		// Toast.showWithGravity('This is a toast.');
		// Toast.show('This is a long toast.', Toast.LONG);
		// const userData = auth().currentUser?.toJSON()
		return (
			<>
				<Header
					type={1}
					titleName="Tôi"
				/>
				<View style={styles.container} >
					<TouchableOpacity style={styles.wrapElement}>
						<View style={styles.element}>
							<Icon AntDesign name="plus" color="black" />
							<Text style={{ paddingLeft: 5 }}>Thêm địa chỉ mới</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={styles.wrapElement} onPress={() => {
						AddressEditScreen()
					}}>
						<View style={styles.element}>
							<Icon AntDesign name="home" color="black" />
							<Text style={{ paddingLeft: 5 }}>Nhà</Text>
						</View>
						<Text style={{ color: colorStyles.grayChateau, paddingLeft: 10, paddingVertical: 5 }}>[Số nhà 11 ngõ 178] Quan Nhân Nhân Chính Thanh Xuân Hà Nội</Text>
						<Text style={{ paddingLeft: 10, paddingBottom: 5 }}>userData.email</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.logout}
						onPress={() => {

						}}
					>
						<Text style={{ color: colorStyles.Carnation }}>Đăng xuất</Text>
					</TouchableOpacity>
				</View>
			</>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colorStyles.mercury
	},
	logout: {
		borderRadius: 40,
		borderWidth: 1,
		borderColor: colorStyles.Carnation,
		padding: 7,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 14,

		marginVertical: 0,
		marginHorizontal: 13
		// backgroundColor: colorStyles.Carnation
	},
	element: {
		flexDirection: 'row',
		alignItems: 'baseline',
		paddingHorizontal: 10,
		paddingVertical: 10,
	},
	wrapElement: {
		marginVertical: 7,
		backgroundColor: colorStyles.white,
		paddingHorizontal: 10,

	}
})