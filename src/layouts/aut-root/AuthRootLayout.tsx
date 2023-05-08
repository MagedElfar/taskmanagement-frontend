import { Box } from '@mui/material';
import React from 'react';
import style from "./AuthRootLayout.module.css"

type Props = {
    children?: React.ReactNode
};


const AuthRootLayout: React.FC<Props> = ({ children }) => {
    return (
        <Box
            component="div"
            sx={{
                py: 6,
                backgroundColor: "#F9F8F8",
                minHeight: "100vh",
                px: 3
            }}
            className={`flex justify-center items-center w-full	auth-form-layout`}>
            {children}
        </Box>
    )
}

export default AuthRootLayout