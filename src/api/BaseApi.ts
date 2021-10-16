import { Navigation } from "react-native-navigation";
import AsyncStorage from '@react-native-async-storage/async-storage';
import urljoin from "url-join";
const ENABLE_LOG = false;
const writeLog = ({ url, model, response, responseJson }: any) => {
	// console.group(url);
	// console.log("model", model);
	// console.log("response", response);
	// console.log("responseJson", responseJson);
	// console.groupEnd();
}

const getAccessToken = async (anonymus: boolean) => {
	try {
		let strToken = await AsyncStorage.getItem("token");
		if (!strToken && !anonymus) {
			// window.location.href = "#/login";
			Navigation.popTo('LOGIN_SCREEN')
			return ''
		}

		let token = strToken && JSON.parse(strToken);
		if (token) return token.access_token;
		return '';
	} catch (e) {
		console.log(e);
		// window.location.href = "#/login";
		Navigation.popTo('LOGIN_SCREEN')
		return '';
	}

}
interface callProps {
	url: string,
	method: string,
	model?: Object,
	contentType?: string,
	anonymus?: boolean
}
const call = async ({ url, method, model = {}, contentType = "application/json", anonymus = false }: callProps) => {
	try {
		interface headerProps {
			Authorization?: string,
			Accept: string,
			"Content-Type": string
		}
		let headers: headerProps = {
			Authorization: "Bearer " + getAccessToken(anonymus),
			Accept: contentType,
			"Content-Type": contentType,
			// "Accept-Language": await langService.getLangLocale()
		};

		if (anonymus) {
			if (headers.Authorization) delete headers.Authorization
		}
		interface requestProps {
			method: string,
			headers?: any,
			body?: any
		}
		let request: requestProps = {
			method: method,
			headers: headers,
		};

		if (method === "POST" || method === "PUT") {
			if (contentType === "application/json")
				request.body = JSON.stringify(model);

			if (contentType === "multipart/form-data") {
				delete request.headers["Content-Type"]
				request.body = model;
			}

		}
		// globalService.startLoadingBar()
		let response = await fetch(url, request);
		// globalService.startLoadingBar()
		ENABLE_LOG && console.group(url);
		ENABLE_LOG && console.log("model", model);
		ENABLE_LOG && console.log("response", response);
		if (!response.ok) {
			if (response.status === 401) {
				// window.location.href = "#/login"
				// toastService.confirm({
				//     content: "Permission required! Please login again!", onConfirm: () => {
				//         window.location.href = "/#/login"
				//     }
				// })
				Navigation.popTo('LOGIN_SCREEN')

			} else console.error({ content: response.status })
			return { success: false };
		}

		try {
			let responseJson = await response.json();
			ENABLE_LOG && console.log("responseJson", responseJson);
			ENABLE_LOG && console.groupEnd();
			if (responseJson.message) console.error({ content: responseJson.message })
			if (responseJson.error || responseJson.success === false) {
				return { success: false, data: responseJson };
			}
			if (Array.isArray(responseJson)) {
				return { success: true, records: responseJson };
			}
			return { success: true, ...responseJson };
		} catch (e) {
			console.log("error", e);
			return { success: true };
		}


	} catch (e) {
		console.log("error", e);
		return { success: false };
	}
}
interface ParamsTypes {
	url: string,
	model: string
}
const baseUrl = "https://asia-east2-crafty-haiku-278603.cloudfunctions.net/reactshopping";

export const baseApi = {
	makeUrl: (...parts: any[]) => urljoin(baseUrl, ...parts),
	get: async (url: string) => await call({ url, method: "GET" }),
	getWithoutToken: async (url: string) => call({ url, method: "GET", anonymus: true }),
	post: async ({ url, model }: ParamsTypes) => await call({ url, method: "POST", model }),
	postWithoutToken: async ({ url, model }: ParamsTypes) => await call({ url, method: "POST", model, anonymus: true }),
	postMultipartFormdata: async ({ url, model }: ParamsTypes) => await call({ url, method: "POST", model, contentType: "multipart/form-data" }),
	put: async ({ url, model }: ParamsTypes) => await call({ url, method: "PUT", model }),
	delete: async ({ url, model }: ParamsTypes) => await call({ url, method: "DELETE", model })
}
