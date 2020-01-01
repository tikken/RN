import React, {useReducer, useContext} from 'react';
import {TodoContext} from "./todoContext";
import {Alert} from 'react-native';
import {todoReducer} from "./todoReducer";
import {ScreenContext} from "../screen/ScreenContext";
import {URLS} from "../../constants";
import {
    ADD_TODO,
    REMOVE_TODO,
    UPDATE_TODO,
    SHOW_LOADER,
    HIDE_LOADER,
    SHOW_ERROR, FETCH_TODOS
} from "../types";

export const TodoState = ({ children }) => {
    const initialState = {
        todos: [],
        loading: false,
        error: null
    }

    const {changeScreen} = useContext(ScreenContext);
    const [state, dispatch] = useReducer(todoReducer, initialState);

    const addTodo = async title => {
        const response = await fetch(URLS.FIREBASE, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({ title })
        })

        const data = await response.json();

        dispatch({ type: ADD_TODO, title, id: data.name });
    };

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

    const fetchTodos = async () => {
        showLoader()

        const response = await fetch(URLS.FIREBASE, {
            method: 'GET',
            headers: { 'Content-type': 'application/json' }
        })

        const data = await response.json()

        console.log('Fetch data', data)

        const todos = Object.keys(data).map(key => ({ ...data[key], id: key }))

        dispatch({ type: FETCH_TODOS, todos })

        hideLoader()
    }

    const updateTodo = (id, title) => dispatch({ type: UPDATE_TODO, id, title });
    const showLoader = () => dispatch({ type: SHOW_LOADER });
    const hideLoader = () => dispatch({ type: HIDE_LOADER });
    const showError = () => dispatch({ type: SHOW_ERROR, error });
    const clearError = () => dispatch({ type: CLEAR_ERROR });

    return <TodoContext.Provider
            value={{
                todos: state.todos,
                loading: state.loading,
                error: state.error,
                addTodo,
                removeTodo,
                updateTodo,
                fetchTodos
            }}>
            {children}
            </TodoContext.Provider>
}