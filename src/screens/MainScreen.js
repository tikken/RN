import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, FlatList, Image, Dimensions } from 'react-native';
import { AddTodo } from '../components/AddTodo';
import { Todo } from '../components/Todo';
import { THEME } from "../theme";
import { TodoContext } from "../context/todo/todoContext";
import {ScreenContext} from "../context/screen/ScreenContext";

export const MainScreen = ({ openTodo }) => {
    const { addTodo, todos, removeTodo } = useContext(TodoContext);
    const { changeScreen } = useContext(ScreenContext);
    const [ deviceWidth, setDeviceWidth ] = useState(Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2);

    useEffect(() => {
        const update = () => {
            const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
            setDeviceWidth(width)
        }

        Dimensions.addEventListener('change', update)

        return () => {
            Dimensions.removeEventListener('change', update)
        }
    })

    let content = (
        //adaptivness
        <View style={{ width: deviceWidth }}>
            <FlatList
                keyExtractor={item => item.id.toString()}
                data={todos}
                renderItem={({item}) => <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen} />}
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
    )
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