import React from 'react'
import { Navigation } from "react-native-navigation";
import { Login, Register } from '../screens/favorite'
import { Detail_Product } from '../components'

import Header from '../components/Header'

Navigation.registerComponent('LOGIN_SCREEN', () => Login);
Navigation.registerComponent('REGISTER_SCREEN', () => Register);
Navigation.registerComponent('HeaderComponent', () => Header)
Navigation.registerComponent('DETAIL_PRODUCT', () => Detail_Product)
export const rootStack = (root: any) => {
	return Navigation.setRoot({
		root: {
			bottomTabs: {
				children: [
					{
						stack: {
							children: [
								{
									component: {
										name: root,
										options: {
											topBar: {
												animate: true,
												title: {
													component: {
														name: "HeaderComponent",
														alignment: 'center',
														passProps: {
															isTitle: true,
														}
													}
												},
												rightButtons: [
													{
														id: "HeaderComponent",
														component: {
															name: "HeaderComponent",
															passProps: {
																isRightButton: true
															}
														}
													}
												],
												leftButtons: [
													{
														id: "HeaderComponent",
														component: {
															name: "HeaderComponent",
															passProps: {
																isLeft: true
															}
														}
													}
												]
											}
										}
									}
								},
								
							],
							options: {
								bottomTab: {
									text: 'Home',
									icon: require('../assets/HomeSelect.png'),
									selectedIconColor: 'black',
									selectedTextColor: 'black'
								},
								layout: {
									backgroundColor: 'black'
								}
							}
						}
					},
					{
						stack: {
							children: [
								{
									component: {
										name: 'LOGIN_SCREEN',
										options: {
											topBar: {
												animate: true,
												title: {
													text: "Login"
												},
												rightButtons: [
													{
														text: 'next',
														id: 'saveMembers'
													},
													{
														id: 'search'
													}
												],
												leftButtons: [
													{
														id: 'cancel',
														text: 'back'
													}
												]
											}
										}
									}
								}
							],
							options: {
								bottomTab: {
									text: 'Đã lưu',
									icon: require('../assets/heart.png'),
									selectedIconColor: 'black',
									selectedTextColor: 'black'
								}
							}
						}
					},
					{
						stack: {
							children: [
								{
									component: {
										name: 'REGISTER_SCREEN',
										options: {
											topBar: {
												animate: true,
												title: {
													text: "Login"
												},
												rightButtons: [
													{
														text: 'next',
														id: 'saveMembers'
													},
													{
														id: 'search'
													}
												],
												leftButtons: [
													{
														id: 'cancel',
														text: 'back'
													}
												]
											}
										}
									}
								}
							],
							options: {
								bottomTab: {
									text: 'Đơn hàng',
									icon: require('../assets/Vector.png'),
									selectedIconColor: 'black',
									selectedTextColor: 'black',
									iconWidth: 20,
									iconHeight: 20
								}
							}
						}
					},
					{
						stack: {
							children: [
								{
									component: {
										name: 'REGISTER_SCREEN',
										options: {
											topBar: {
												animate: true,
												title: {
													text: "Login"
												},
												rightButtons: [
													{
														text: 'next',
														id: 'saveMembers'
													},
													{
														id: 'search'
													}
												],
												leftButtons: [
													{
														id: 'cancel',
														text: 'back'
													}
												]
											}
										}
									}
								}
							],
							options: {
								bottomTab: {
									text: 'Tôi',
									icon: require('../assets/user.png'),
									selectedIconColor: 'black',
									selectedTextColor: 'black'
								}
							}
						}
					},
				]
			}
		}
	});
}
