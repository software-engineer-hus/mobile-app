import React from 'react'

import Toast, { BaseToast } from 'react-native-toast-message';

const toastConfig = {
	success: ({ text1, ...rest } : any) => (
		<BaseToast
			{...rest}
			style={{ borderLeftColor: 'pink' }}
			contentContainerStyle={{ paddingHorizontal: 15 }}
			text1Style={{
				fontSize: 15,
				fontWeight: 'semibold'
			}}
			text1={text1}
			text2={null}
		/>
	)
};
export const ToastService = () => {
	return (
		<Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
	)
}