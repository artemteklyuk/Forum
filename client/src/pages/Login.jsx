import React, {useContext, useState} from 'react';
import MyInput from "../components/UI/Input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {Context} from "../App";
import UserService from "../API/UserService";
import {observer} from "mobx-react-lite";
import {NavLink, useLocation, useNavigate} from "react-router-dom";

const Login = observer(() => {
    const {user} = useContext(Context)
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const location = useLocation()
    const isLogin = location.pathname === "/login"
    const navigate = useNavigate()

    const auth = async () => {
        try {
            let data;
            if (isLogin) {
                data = await UserService.login(mail, password)
            } else {
                data = await UserService.registration(mail, password)
            }
            user.setUser(data)
            user.setIsAuth(true)
            navigate("/posts")
        } catch (e) {
            alert(e.response.data.message)
        }

    }
    return (
        <div>
            {isLogin ?
                <h1>
                    Страница для логина
                </h1> :
                <h1>
                    Страница для региситрации
                </h1>
            }
            <form onSubmit={auth}>
                <MyInput
                    type="text"
                    label="Введите логин"
                    onChange={(e) => setMail(e.target.value)}
                />
                <MyInput
                    type="password"
                    label="Введите пароль"
                    onChange={(e) => setPassword(e.target.value)}
                />
                {isLogin ?
                    <div>
                        Нет аккаунта?
                        <NavLink
                            style={{textDecoration: "none"}}
                            className="ms-1"
                            to="/registration">
                            Зарегестрируйся!
                        </NavLink>
                    </div>
                    :
                    <div>
                        Есть аккаунт?
                        <NavLink
                            style={{textDecoration: "none"}}
                            className="ms-1"
                            to="/login">
                            Войди!
                        </NavLink>
                    </div>
                }
                <MyButton onClick={auth}>{isLogin ? "Войти" : "Зарегистрироваться"}</MyButton>
            </form>
        </div>
    );
});
export default Login;