import React, {useContext} from 'react';
import {useNavigate} from "react-router-dom";
import MyButton from "../button/MyButton";
import {Context} from "../../../App";
import {observer} from "mobx-react-lite";

const Navbar =  observer(() => {
    const navigate = useNavigate()
    const {user} = useContext(Context)
    const logout = () => {
        user.setIsAuth(false)
        localStorage.removeItem("token")
        navigate("/login")
    }
    const about = () => navigate("/about")
    const posts = () => navigate("/posts")
    const admin = () => navigate("/admin")
    console.log(user.user.role)
    return (
        <div className="navbar">
            {
                user.isAuth ?
                    <MyButton onClick={logout}>
                    Выйти
                </MyButton>
                : ""
            }
            <div className="navbar__links">
                {user.user.role === "ADMIN" ?
                    <MyButton onClick={admin}>Админ панель</MyButton> :
                    <div/>
                }
                <MyButton onClick={about}>О сайте</MyButton>
                <MyButton onClick={posts}>Посты</MyButton>

            </div>
        </div>

    );
})

export default Navbar;