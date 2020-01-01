import React, { useState } from 'react';
import {MainLayout} from './src/MainLayout';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';
import {TodoState} from "./src/context/todo/todoState";

async function loadFont() {
   await Font.loadAsync({
       'tattoo': require('./assets/font/tattoo.ttf')
   });
}

export default function App() {
    const [isReady, setIsReady] = useState(false)

    if(!isReady) {
        return <AppLoading
                    startAsync={loadFont}
                    onError={err => console.log(err)}
                    onFinish={() => setIsReady(true)}
        />
    }

    return (
        <TodoState>
            <MainLayout/>
        </TodoState>
    )
}