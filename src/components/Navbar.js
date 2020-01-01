import React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import {Constants} from '../constants';

export const Navbar = ({ title }) => {
    return (
        //desctructuring platform from platform obj
        <View style={{
            ...styles.navbar,
            ...Platform.select({
                ios: styles.navbarIOS,
                android: styles.navbarAndroid
            })
        }}>

        <Text style={styles.text}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    navbar: {
        height: 70,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 10
    },
    navbarAndroid: {
        backgroundColor: Constants.MAIN_COLOR,
    },
    navbarIOS: {
        borderBottomColor: Constants.MAIN_COLOR,
        borderBottomWidth: 1
    },
    text: {
        color: Platform.OS == 'ios' ? Constants.MAIN_COLOR : 'black',
        fontSize: 20,
        fontFamily: 'tattoo'
    }
})
