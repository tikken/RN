import React, {useReducer, useContext} from 'react';
import {TodoContext} from "./todoContext";
import {Alert} from 'react-native';
import {todoReducer} from "./todoReducer";
import {REMOVE_TODO, UPDATE_TODO, ADD_TODO} from "../types";
import {ScreenContext} from "../screen/ScreenContext";

export const TodoState = ({ children }) => {
    const initialState = {
        todos: [ { id: '1', title: 'Выучить React Native' } ]
    }

    const {changeScreen} = useContext(ScreenContext);
    const [state, dispatch] = useReducer(todoReducer, initialState);

    const addTodo = title => dispatch({ type: ADD_TODO, title: title })

    const removeTodo = id => {
        const todo = state.todos.find(t => t.id === id);

        Alert.alert(
            'Deleting todo',
            `Sure you want to delete ${todo.title}?`,
            [
                {
                    text: 'Cancel',
                    style: 'Cancel'
                },
                {
                    text: 'Deleting',
                    style: 'Destructive',
                    onPress: () => {
                        changeScreen(null)
                        dispatch({ type: REMOVE_TODO, id })
                    }
                }
            ]
        )
    }

    const updateTodo = (id, title) => dispatch({ type: UPDATE_TODO, id, title })

    return <TodoContext.Provider
            value={{
                todos: state.todos,
                addTodo,
                removeTodo,
                updateTodo
            }}>

            {children}
            </TodoContext.Provider>
}