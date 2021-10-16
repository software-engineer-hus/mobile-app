import React, { useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { colorStyles } from '../../styles/ColorStyles';
interface Props {
	componentId: string,
}
const AddressEdit = (props: Props) => {
	useEffect(() => {
		Navigation.mergeOptions(props.componentId, {
			topBar: {
				title: {
					text: "Thay đổi địa chỉ"
				}
			}
		})
	}, [])
	return (
		<View style={styles.container}>
			<View>
				<Text style={{ backgroundColor: colorStyles.mercury, padding: 10 }}>Địa chỉ*</Text>
				<View>
					<TextInput placeholder="Địa chỉ" style={styles.input}></TextInput>
				</View>
				<View>
					<TextInput placeholder="Toà nhà, Số tầng (Không bắt buộc)" style={styles.input}></TextInput>
				</View>
				<View>
					<TextInput placeholder="Cổng / số nhà (Không bắt buộc)" style={styles.input}></TextInput>
				</View>
			</View>
			<View>
				<Text style={{ backgroundColor: colorStyles.mercury, padding: 10 }}>Địa chỉ*</Text>
				<View>
					<TextInput placeholder="Địa chỉ" style={styles.input}></TextInput>
				</View>
				<View>
					<TextInput placeholder="Toà nhà, Số tầng (Không bắt buộc)" style={styles.input}></TextInput>
				</View>
				<View>
					<TextInput placeholder="Cổng / số nhà (Không bắt buộc)" style={styles.input}></TextInput>
				</View>
			</View>
			<View>
				<Text style={{ backgroundColor: colorStyles.mercury, padding: 10 }}>Tên địa chỉ*</Text>
				<View style={styles.wrapName}>
					<TouchableOpacity style={styles.item}>
						<Text style={styles.name}>Nhà</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.item}>
						<Text style={styles.name}>Công ty</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.item}>
						<Text style={styles.name}>Khác</Text>
					</TouchableOpacity>
				</View>
			</View>
			<TouchableOpacity style={styles.save}>
				<Text style={{color:colorStyles.thunderbird, fontWeight: '800', fontSize: 16}}>Lưu</Text>
			</TouchableOpacity>
		</View>
	)
}
const styles = StyleSheet.create({
	save: { 
		backgroundColor: colorStyles.alto,
		justifyContent:'center',
		alignItems: 'center',
		paddingVertical: 10,
		marginHorizontal: 10,
		borderRadius: 25,
		position:'absolute',
		bottom: 10,
		right: 0,
		left: 0
	},
	container: {
		// padding: 10,
		// backgroundColor: colorStyles.mercury,
		flex: 1,
	},
	input: {
		borderBottomWidth: 1,
		borderBottomColor: colorStyles.mercury,
		paddingVertical: 15,
		paddingHorizontal: 10
	},
	wrapName: {
		padding: 10,
		flexDirection: 'row',
	},
	item: {
		backgroundColor: colorStyles.mercury,
		paddingHorizontal: 10,
		paddingVertical: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 18,
		marginRight: 10
	},
	name: {
		fontWeight: '600'
	}
})
export default AddressEdit;