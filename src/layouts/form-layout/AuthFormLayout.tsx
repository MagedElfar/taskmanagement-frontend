import React from 'react'
import Box from '@mui/material/Box';
import { Avatar, Typography } from '@mui/material';
import { Link, useLocation } from "react-router-dom";
import style from "./AuthFormLayout.module.css"

type Props = {
    children?: React.ReactNode,
    title: string
};

const AuthFormLayout: React.FC<Props> = ({ children, title }) => {
    const { pathname } = useLocation();

    console.log(pathname)
    return (
        <Box component="div" sx={{
            px: 4,
            py: 6,
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 5px 20px 0 rgba(109, 110, 111, 0.08)"
        }}>
            <Avatar
                alt="logo"
                src="/logo.svg"
                sx={{ width: 70, height: "auto", mb: 6, marginX: "auto" }}
            />

            <Typography variant="h1" component="h1" sx={{
                fontSize: 32,
                fontWeight: 500,
                mb: 4,
                textAlign: "center"
            }}>
                {title}
            </Typography>

            {children}

            <Box
                component="div"
            >
                {pathname === "/signup" || pathname === "/login" ?
                    <Typography
                        component="p"
                        sx={{
                            textAlign: "center",
                            marginTop: 4,
                            color: "#6d6e6f",
                            fontSize: "14px"
                        }}
                    >
                        {pathname === "/signup" ? "Do have an account?" : "Don't have an account?"}

                        <Link className={`${style.link} ml-2 underline text-blue-500`} to={pathname === "/signup" ? "/login" : "/signup"}>
                            {pathname === "/signup" ? "Login" : "Sign up"}
                        </Link>
                    </Typography>
                    : null}

            </Box>


        </Box>
    )
}

export default AuthFormLayout