import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react';
import { Icon } from './Icon';
import { Navigation } from 'react-native-navigation';
// const styles = require('./Empty.styl');
// import Image from 'react-native-image-progress'
interface Props {
	key?: string;
	message: string;
	screens?: string
}

@observer
export default class Empty extends React.Component<Props> {
	render() {
		const { message, screens } = this.props;
		return (
			<View style={{
				justifyContent: 'center', alignItems: 'center', flex: 1,
				paddingTop: 32,
			}}>
				<Image
					source={require('../assets/Shipper.png')}
					style={{
						width: 200,
						height: 200,
					}}
				/>
				<View style={styles.host}>
					<Text style={styles.message}>{message}</Text>
					{/* <Text style={styles.message}>Đi vào cửa hàng để chọn cửa hàng yêu thích nhé</Text> */}
					<TouchableOpacity style={{ paddingTop: 20, flexDirection: 'row', justifyContent: 'center' }} onPress={() => {
						Navigation.mergeOptions(screens as string, {
							bottomTabs: {
								currentTabIndex:0
							}
						})
					}}>
						<Text style={{ fontSize: 17, fontWeight: '700', paddingRight: 5 }}>Cửa hàng</Text>
						<Icon AntDesign name="arrowright" color="black" />
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	host: {
		width: '100%',
		paddingBottom: 32,
	},

	message: {
		fontFamily: 'System',
		fontSize: 17,
		fontStyle: 'italic',
		textAlign: 'center',
		color: '#969798',
	}

})