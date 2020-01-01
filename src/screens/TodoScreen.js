import React, { useState, useContext } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native';
import {FontAwesome, AntDesign} from '@expo/vector-icons';
import {THEME} from '../theme';
import {AppCard} from '../components/ui/AppCard';
import {EditModal} from "../components/EditModal";
import {AppText} from "../components/ui/AppText";
import {AppButton} from "../components/ui/AppButton";
import {TodoContext} from "../context/todo/todoContext";
import {ScreenContext} from "../context/screen/ScreenContext";

export const TodoScreen = ({ goBack, onRemove, onSave }) => {
    const { todos, updateTodo, removeTodo } = useContext(TodoContext);
    const { todoId, changeScreen  } = useContext(ScreenContext);
    const [modal, setModal] = useState(false);

    const todo = todos.find((t) => t.id === todoId);

    const saveHandler = title => {
        updateTodo(todo.id, title)
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
                <AppButton onPress={() => changeScreen(null)} color={THEME.GREY_COLOR}>
                    <AntDesign name="back" size={20} color="#fff" />
                </AppButton>

                <AppButton color={THEME.DANGER_COLOR} onPress={() => removeTodo(todo.id)}>
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