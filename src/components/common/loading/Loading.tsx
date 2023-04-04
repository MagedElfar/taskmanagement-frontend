import { Avatar, Box } from '@mui/material';
import style from './Loading.module.css';
import React from 'react'

const Loading = () => {


    return (
        <Box
            sx={{
                backgroundColor: "#47426A",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column"
            }}
        >

            <Avatar
                alt="logo"
                src="/logo.svg"
                sx={{ width: 70, height: "auto", mb: 1, marginX: "auto" }}
            />

            <div className={style["lds-ellipsis"]}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </Box>
    )
}

export default Loading