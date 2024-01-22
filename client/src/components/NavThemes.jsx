import React, {useContext} from 'react';
import "../styles/NavThemes.css"
import {Context} from "../App";
import {observer} from "mobx-react-lite";
import MyButton from "./UI/button/MyButton";
import Button from "@mui/material/Button";
const NavThemes = observer(({themes}) => {
    const {posts} = useContext(Context)
    return (
        <div>
            {themes.map(theme =>
                <div
                    className={theme.id !== posts.selectedTheme.id ? "theme" : " theme selectedTheme"}
                    onClick={() => posts.setSelectedTheme(theme)}
                >
                    {theme.name}
                    <MyButton style={{padding: "0px", marginLeft: "auto", zIndex: 1}} color={"error"}>X</MyButton>
                </div>
            )}
        </div>
    );
}
)

export default NavThemes;