import React from 'react';
import {Text, StyleSheet} from 'react-native';

export const AppText = props => <Text style={{ ...styles.font, ...props.style }}>{props.children}</Text>

const styles = StyleSheet.create({
    font: {
        // fontFamily: 'tattoo'
    }
})