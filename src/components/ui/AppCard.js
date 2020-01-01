import React from 'react';
import {StyleSheet, View} from 'react-native';

export const AppCard = props => (
    //destructuring styles from props
    <View style={ {...styles.default, ...props.style} }>{props.children}</View>
)

const styles = StyleSheet.create({
    default: {
        padding: 20,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        //ios
        shadowColor: '#000',
        shadowRadius: 2,
        shadowOpacity: .3,
        shadowOffset: { width: 2, height: 2},
        //android
        elevation: 8,
        backgroundColor: "#fff",
        borderRadius: 10
    }
})