import React from 'react';
import classes from './MyButton.module.css';
import Button from '@mui/material/Button';

const MyButton = ({children, ...props}) => {
    return (
        <Button sx={{mr:1}} color={"success"} variant={"outlined"} {...props} className={classes.myBtn}>
            {children}
        </Button>
    );
};

export default MyButton;