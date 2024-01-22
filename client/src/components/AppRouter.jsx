import React, {useContext, useEffect, useState} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Error from "../pages/Error";
import {PrivateRoutes, PublicRoutes} from "../router/routes";
import {Context} from "../App";
import Loader from "./UI/loader/Loader";
import {observer} from "mobx-react-lite";
import UserService from "../API/UserService";
import {Spinner} from "react-bootstrap";


const AppRouter = observer(() => {
    const {user} = useContext(Context)
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        UserService.check().then(data => {
            if (typeof data === "object") {
                user.setUser(data)
                user.setIsAuth(true)
            }
        }).finally(() => setLoading(false))
    }, [])

    // if (isLoading) {
    //     return <Loader/>
    // }
    if (isLoading) {
        return <Spinner animation={"grow"}/>
    }
    return (
        user.isAuth
            ?
            <Routes>
                {PrivateRoutes.map(route =>
                    <Route
                        path={route.path}
                        element={<route.element/>}
                        key={route.path}

                    />
                )}
                <Route path="*" element={<Navigate to="/posts"/>}/>

            </Routes>
            :
            <Routes>
                {PublicRoutes.map(route =>
                    <Route
                        path={route.path}
                        element={<route.element/>}
                        key={route.path}
                    />
                )}
                <Route path="*" element={<Navigate to="/login"/>}/>
            </Routes>
    );
})

export default AppRouter;