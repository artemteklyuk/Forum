import React from 'react';
import classes from "./MyInput.module.css"
import {TextField} from "@mui/material";
import FormControl from "@mui/material/FormControl";

const MyInput = (props) => {
    return (
        <FormControl fullWidth sx={{mb: 2}}>
            <TextField {...props} id="standard-basic" label={props.label} variant="outlined"/>
        </FormControl>
    );
};

export default MyInput;