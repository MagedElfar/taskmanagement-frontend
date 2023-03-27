import { Avatar, Box } from '@mui/material'
import React from 'react'

const SideBar = () => {
    return (
        <Box
            component="div"
            sx={{
                height: "100vh",
                padding: 2,
            }}
        >
            <Box component="div">
                <Avatar
                    alt="logo"
                    src="/logo.svg"
                    sx={{
                        width: "30px",
                        height: "30px"
                    }}
                />



            </Box>

        </Box>
    )
}

export default SideBar