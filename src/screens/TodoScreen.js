import React, {useState} from 'react'
import { StyleSheet, View, Text, Button, Dimensions } from 'react-native';
import {FontAwesome, AntDesign} from '@expo/vector-icons';
import {THEME} from '../theme';
import {AppCard} from '../components/ui/AppCard';
import {EditModal} from "../components/EditModal";
import {AppText} from "../components/ui/AppText";
import {AppButton} from "../components/ui/AppButton";

export const TodoScreen = ({ goBack, todo, onRemove, onSave }) => {
    const [modal, setModal] = useState(false);

    const saveHandler = title => {
        onSave(todo.id, title)
        setModal(false)
    }

    return (
        <View>
            <EditModal
                onSave={saveHandler}
                value={todo.title}
                visible={modal}
                onCancel={() => setModal(false)} />

            <AppCard style={styles.card}>
                <AppText style={styles.title}>{todo.title}</AppText>
                <AppButton onPress={() => setModal(true)}>
                    <FontAwesome name='edit' size={20} />
                </AppButton>
            </AppCard>
            <View style={styles.buttons}>
                <AppButton onPress={goBack} color={THEME.GREY_COLOR}>
                    <AntDesign name="back" size={20} color="#fff" />
                </AppButton>

                <AppButton color={THEME.DANGER_COLOR} onPress={() => onRemove(todo.id)}>
                   <FontAwesome name="remove" size={20} color="#fff" />
                </AppButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        //adaptivness
        width: Dimensions.get('window').width > 400 ? 150 : 100
    },
    card: {
        marginBottom: 20,
        padding: 15
    },
    title: {
        fontSize: 20
    }
})