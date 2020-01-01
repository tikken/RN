import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import { Navbar } from './components/Navbar';
import { Constants } from "./constants";
import { MainScreen } from './screens/MainScreen';
import { TodoScreen } from './screens/TodoScreen';
import { ScreenContext } from "./context/screen/ScreenContext";

export const MainLayout = () => {
    const { todoId } = useContext(ScreenContext)

    return (
        <View style={styles.wrapper}>
            <Navbar title='Tatoo TODO!' />
            <View style={styles.container}>
                {todoId ? <TodoScreen/> : <MainScreen/>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Constants.PADDING_HORIZONTAL,
        paddingVertical: 20,
        flex: 1
    },
    wrapper: {
        flex: 1
    }
})