import React, { useState, useEffect } from 'react'

import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import auth, { FirebaseAuthTypes, firebase } from '@react-native-firebase/auth';
import { Navigation } from 'react-native-navigation';
import { Icon } from '../../components';
import { colorStyles } from '../../styles/ColorStyles';
import Loading from '../../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UI from '../../stores/UI';
import Modal from 'react-native-modal'
import { detectFirstRun, startApp } from '..';
let model = {
	email: "",
	password: "",
}
let modelRegister = {
	email: "",
	password: "",
	confirm: "",
}
const Login = (props: any) => {
	const [error, setError] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(false)
	const [islogin, setIsLogin] = useState<boolean>(true)
	const [errorString, setErrorString] = useState<string | undefined>(undefined)
	useEffect(() => {
		// firebase.auth().onAuthStateChanged(login)
		Navigation.mergeOptions(props.componentId, {
			topBar: {
				visible: false
			}
		})
	}, [])
	const login = async () => {
		setLoading(true)
		try {
			const authForDefaultApp = await firebase.auth().signInWithEmailAndPassword(model.email, model.password)
			AsyncStorage.setItem('firstStartApp', "true");
			startApp()
		} catch (e) {
			setError(true)
			setErrorString(e.message)
			console.log({ e: e.message })
		}
		setLoading(false)
	}
	const register = async () => {
		setLoading(true)
		console.log(model)
		console.log(modelRegister)
		if (modelRegister.password === modelRegister.confirm) {
			try {
				const register = await firebase.auth().createUserWithEmailAndPassword(modelRegister.email, modelRegister.password)
				AsyncStorage.setItem('firstStartApp', "true");
				startApp()
			} catch (e) {
				setError(true)
				setErrorString(e.message)
			}
		} else {
			setError(true)
			setErrorString("Xác thực lại mật khẩu chưa đúng")
		}
		setLoading(false)
	}
	return loading ?
		<View style={{
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center'
		}}>
			<Loading />
		</View>
		:
		<>
			<View style={styles.container}>
				<TouchableOpacity style={{ position: 'absolute', top: 60, right: 40, flexDirection: 'row' }}
					onPress={() => setIsLogin(!islogin)}
				>
					{!islogin && <Icon AntDesign name="arrowleft" color={colorStyles.sushi} style={{ paddingRight: 5 }} />}
					<Text style={{ fontSize: 17, fontWeight: '700', marginRight: 5, color: colorStyles.sushi }}>{islogin ? "Đăng ký" : "Đăng nhập"} </Text>
					{islogin && <Icon AntDesign name="arrowright" color={colorStyles.sushi} />}
				</TouchableOpacity>
				<Image
					source={require('../../assets/Shipper.png')}
					style={{ width: 200, height: 200 }}
					resizeMode="contain" />
				<View >
					<Text style={{ fontWeight: 'bold', fontSize: 20 }}>Welcome to Raw Shipp.</Text>
				</View>
				<View style={styles.wrapButton}>
					<View style={{ width: '100%', }}>
						<TextInput
							style={styles.button}
							placeholder="Email"
							onChangeText={(x) => {
								model.email = x
								modelRegister.email = x

							}}
						/>
					</View>
					<View style={{ width: '100%', }}>
						<TextInput
							onChangeText={(x) => {
								model.password = x
								modelRegister.password = x
							}}
							secureTextEntry={true}
							style={styles.button}
							placeholder="Password" />
					</View>
					{!islogin &&
						<View style={{ width: '100%', }}>
							<TextInput
								onChangeText={(x) => {
									modelRegister.confirm = x
								}}
								secureTextEntry={true}
								style={styles.button}
								placeholder="Password Confirm" />
						</View>
					}
				</View>
				<TouchableOpacity style={styles.exec} onPress={() => {
					islogin ? login() : register();
				}} >
					<Text style={{ fontSize: 18, fontWeight: '600', color: colorStyles.white, paddingRight: 5 }}>{islogin ? "Đăng nhập" : "Đăng ký"}</Text>
					<Icon AntDesign name="arrowright" color={colorStyles.white} size={21} />
				</TouchableOpacity>

			</View>
			<Modal
				isVisible={error}
				onBackdropPress={() => {
					setError(false)
					setErrorString(undefined)
				}}
				style={{
					shadowColor: "#000",
					shadowOffset: {
						width: 0,
						height: 2,
					},
					shadowOpacity: 0.25,
					shadowRadius: 3.84,
					elevation: 5,
				}}>
				<View style={{
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: 'white',
					padding: 18,
					borderRadius: 4,
					borderColor: 'rgba(0, 0, 0, 0.1)',
				}}>
					<View style={{
						justifyContent: 'center',
						alignItems: 'center'
					}}>
						<Image
							source={require('../../assets/Shipper.png')}
							style={{
								width: 100,
								height: 100,
							}}
						/>
						<Text style={{ fontWeight: '500', fontSize: 17, paddingVertical: 10, paddingTop: 18 }}>{error && errorString}</Text>
					</View>
				</View>
			</Modal>
		</>
}
const styles = StyleSheet.create({
	wrapButton: {
		marginTop: 10,
		width: 350,
	},
	button: {
		marginTop: 10,
		backgroundColor: colorStyles.mercury,
		// borderWidth: 0.5,
		// paddingHorizontal: 140,
		width: '83%',
		alignSelf: 'center',
		paddingVertical: 18,
		borderRadius: 6,
		paddingHorizontal: 10,
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	exec: {
		marginTop: 20,
		width: '70%',
		paddingHorizontal: 10,
		// borderWidth: 0.5,
		flexDirection: 'row',
		borderRadius: 6,
		backgroundColor: colorStyles.sushi,
		padding: 10,
		justifyContent: 'center',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	}

})

export default Login;