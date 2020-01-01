import React from 'react';
import {StyleSheet, View, TouchableOpacity, TouchableNativeFeedback, Platform} from 'react-native';
import {AppText} from "./AppText";
import {Constants} from "../../constants";

export const AppButton = ({ children, onPress, color = Constants.MAIN_COLOR }) => {
    //funny
    const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

    return (
        <Wrapper onPress={onPress} activeOpacity={.7}>
            <View style={{ ...styles.button, backgroundColor: color }}>
                <AppText>{children}</AppText>
            </View>
        </Wrapper>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})