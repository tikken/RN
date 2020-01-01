import * as Font from 'expo-font';
import React, { useState } from 'react';

import { MainLayout } from './src/MainLayout';
import { AppLoading } from 'expo';
import { TodoState } from "./src/context/todo/todoState";
import { ScreenState } from "./src/context/screen/ScreenState";

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
        <ScreenState>
            <TodoState>
                <MainLayout/>
            </TodoState>
        </ScreenState>
    )
}