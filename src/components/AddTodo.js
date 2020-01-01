import React, {useState} from 'react'
import { View, StyleSheet, TextInput, Alert, Keyboard } from 'react-native'
import {Constants} from "../constants";
import { AntDesign } from '@expo/vector-icons';

export const AddTodo = ({ onSubmit }) => {
    const [value, setValue] = useState('');

    const pressHandler = () => {
        if(value == '') {
           Alert.alert('Введите название');
        } else {
            onSubmit(value)
            setValue('')
            Keyboard.dismiss()
        }
    }

    return (
        <View style={styles.block}>
            <TextInput
                style={styles.input}
                onChangeText={setValue}
                value={value}
                placeholder="Введите название картеля"
                //T9
                autoCorrect={false}
                autoCapitalize='none'
            />
            <AntDesign.Button onPress={pressHandler} name="pluscircleo">
                Добавить
            </AntDesign.Button>
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    input: {
        width: '60%',
        padding: 10,
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: Constants.MAIN_COLOR
    }
})
