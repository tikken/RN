import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import { Navbar } from './components/Navbar';
import {THEME} from "./theme";
import { MainScreen } from './screens/MainScreen';
import { TodoScreen } from './screens/TodoScreen';
import { TodoContext } from "./context/todo/todoContext";

export const MainLayout = () => {
    const {todos, addTodo, removeTodo, updateTodo} = useContext(TodoContext)
    const [todoId, setTodoId] = useState(null)

    let content = (
        <MainScreen
            todos={todos}
            addTodo={addTodo}
            removeTodo={removeTodo}
            openTodo={setTodoId}
        />
    )

    if (todoId) {
        const selectedTodo = todos.find(todo => todo.id === todoId)
        content = <TodoScreen
            onRemove={removeTodo}
            onSave={updateTodo}
            goBack={() => setTodoId(null)} todo={selectedTodo} />
    }

    return (
        <View>
            <Navbar title='Tatoo TODO!' />
            <View style={styles.container}>{content}</View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: THEME.PADDING_HORIZONTAL,
        paddingVertical: 20
    }
})