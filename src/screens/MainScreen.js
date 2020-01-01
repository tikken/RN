import React, { useState, useEffect, useContext, useCallback } from 'react';
import { StyleSheet, View, FlatList, Image, Dimensions } from 'react-native';
import { AddTodo } from '../components/AddTodo';
import { Todo } from '../components/Todo';
import { Constants } from "../constants";
import { TodoContext } from "../context/todo/todoContext";
import { ScreenContext } from "../context/screen/ScreenContext";
import { AppLoader } from "../components/ui/AppLoader";
import {AppText} from "../components/ui/AppText";

export const MainScreen = ({ openTodo }) => {
    const { addTodo, todos, removeTodo, fetchTodos, loading, error } = useContext(TodoContext);
    const { changeScreen } = useContext(ScreenContext);
    const [ deviceWidth, setDeviceWidth ] = useState(Dimensions.get('window').width - Constants.PADDING_HORIZONTAL * 2);

    const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos]);

    useEffect(() => {
        loadTodos()
    }, []);

    useEffect(() => {
        const update = () => {
            const width = Dimensions.get('window').width - Constants.PADDING_HORIZONTAL * 2
            setDeviceWidth(width)
        }

        Dimensions.addEventListener('change', update)

        return () => {
            Dimensions.removeEventListener('change', update)
        }
    });

    if(loading) {
        return <AppLoader />
    }
    if(error) {
        return (<View><AppText>fuck off</AppText></View>)
    }

    let content = (
        //adaptivness
        <View style={{ width: deviceWidth }}>
            <FlatList
                keyExtractor={item => item.id.toString()}
                data={todos}
                renderItem={({item}) => <Todo todo={item}
                                              onRemove={removeTodo}
                                              onOpen={changeScreen} />}
            />
        </View>
    );

    if(todos.length === 0) {
        content =
            <View style={styles.imgWrap}>
                 {/*<Image*/}
                     {/*style={styles.image}*/}
                     {/*source={require('../../assets/404.png')} />*/}
                <Image
                    style={styles.image}
                    source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Pistol_used_by_%22Squeaky%22_Fromme.JPG'}} />
            </View>
    }

    return(
        <View>
            <AddTodo onSubmit={addTodo} />
            {content}
        </View>
    );
}

const styles = StyleSheet.create({
    imgWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 300
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    }
});