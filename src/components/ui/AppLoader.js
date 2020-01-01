import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {Constants} from "../../constants";

export const AppLoader = () => (
    <View style={styles.center}>
        <ActivityIndicator
            color={Constants.MAIN_COLOR}
            size="large" />
    </View>
);

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});