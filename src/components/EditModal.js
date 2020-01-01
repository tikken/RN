import React, {useState} from 'react';
import {StyleSheet, View, TextInput, Button, Modal, Alert} from 'react-native';
import {Constants} from "../constants";
import {AppButton} from "./ui/AppButton";

export const EditModal = ({ visible, onCancel, value, onSave }) => {
    const [title, setTitle] = useState(value);

    const saveHandler = () => {
        if(title.trim().length < 3) {
            Alert.alert('Ошибка!', `Минимальная длинна названия 3 символа.`)
        } else {
            onSave(title);
        }
    }

    const cancelHandler = () => {
        setTitle(value)
        onCancel()
    }

    return (
        <Modal visible={visible} animationType="slide" transparent={false}>
            <View style={styles.wrapper}>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder='Введите название'
                    autoCapitalize="none"
                    autoCorrect={false}
                    maxLength={64}
                />
                <View style={styles.buttons}>
                    <AppButton
                            onPress={cancelHandler}
                            color={Constants.DANGER_COLOR}>
                        Отменить
                    </AppButton>
                    <AppButton onPress={saveHandler}>
                        Сохранить
                    </AppButton>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        padding: 10,
        borderBottomColor: Constants.MAIN_COLOR,
        borderBottomWidth: 2,
        width: '80%'
    },
    buttons: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})