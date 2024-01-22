import React, {useContext, useEffect, useState} from "react";
import "./styles/App.css"
import {observer} from "mobx-react-lite";
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/UI/Navbar/Navbar";
import AppRouter from "./components/AppRouter";
import {createContext} from "react";

export const Context = createContext(null);

const App = observer(() => {

    return (
        <BrowserRouter>
            <Navbar/>
            <AppRouter/>
        </BrowserRouter>
    )
})

export default App;
