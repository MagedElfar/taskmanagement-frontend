import React from 'react'
import Box from '@mui/material/Box';
import { Avatar, Typography } from '@mui/material';
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "./../../hooks/store.hook"

type Props = {
    children?: React.ReactNode,
    title: string
};

const AuthFormLayout: React.FC<Props> = ({ children, title }) => {

    const { them } = useAppSelector(s => s);

    const authStep = useAppSelector(state => state.auth.step)

    return (
        <Box component="div" sx={{
            px: 4,
            py: 6,
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 5px 20px 0 rgba(109, 110, 111, 0.08)",
            width: {
                xs: "100%",
                md: "415px"
            }
        }}>
            {authStep === 1 ?
                <Avatar
                    alt="logo"
                    src="/logo.svg"
                    sx={{ width: 70, height: "auto", mb: 6, marginX: "auto" }}
                /> : null}

            <Typography variant="h1" component="h1" sx={{
                fontSize: them.fonSize.title,
                fontWeight: 500,
                mb: 4,
                textAlign: "center"
            }}>
                {title}
            </Typography>

            {children}

        </Box>
    )
}

export default AuthFormLayout