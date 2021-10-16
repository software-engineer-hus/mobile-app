import * as React from 'react';
import { View, Platform, ActivityIndicator, StyleSheet } from 'react-native';
// import { getVar } from 'styles';
// const styles = require('./Loading.styl');

interface Props {
	previewing?: boolean;
	visible?: boolean;
	end?: boolean;
	delay?: number;
	testID?: string;
}

export default class Loading extends React.PureComponent<Props> {

	private delayTimer: any;

	state = {
		visible: this.props.visible,
	} as any;

	componentDidMount() {
		const { delay = 150 } = this.props;
		this.delayTimer = setTimeout(
			() => this.setState({
				visible: true,
			}),
			delay,
		);
	}

	componentWillReceiveProps(newProps: any) {
		this.setState({
			visible: newProps.visible,
		});
	}

	componentWillUnmount() {
		clearTimeout(this.delayTimer);
	}

	render() {
		const { visible } = this.state;
		const { previewing, end } = this.props;

		if (!visible) {
			return null;
		}

		const hostStyles = [
			styles.loading,
			end && styles.end,
			previewing && styles.preview,
		];

		return (
			<View style={hostStyles}>
				<ActivityIndicator
					color={Platform.OS === 'android' ? " " : undefined}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	loading: {
		paddingTop: 48,
	},

	preview: {
		paddingTop: 160,
	},

	end: {
		paddingBottom: 80,
	}

})