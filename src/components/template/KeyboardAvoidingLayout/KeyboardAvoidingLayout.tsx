import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const KeyboardAvoidingLayout = ({
	children,
	scrollViewContainerStyle,
}: {
	children: React.ReactNode;
	scrollViewContainerStyle?: StyleProp<ViewStyle>;
}) => {
	return (
		<KeyboardAwareScrollView
			showsVerticalScrollIndicator={false}
			contentContainerStyle={[{ flexGrow: 1 }, scrollViewContainerStyle]}
			keyboardShouldPersistTaps='handled'
		>
			{children}
		</KeyboardAwareScrollView>
	);
};

export default KeyboardAvoidingLayout;
