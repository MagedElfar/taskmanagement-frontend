import { Box, Typography } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../../hooks/store.hook'

type props = {
    title: string,
    children?: React.ReactNode,
}

const ProfileLayout: React.FC<props> = ({ title, children }) => {
    const { them } = useAppSelector(s => s)
    return (
        <Box sx={{ width: '100%', backgroundColor: them.colors.thirdColor, p: 2 }}>
            <Typography
                variant="h5"
                component="h5"
                sx={{
                    color: them.colors.fourthColor,
                    backgroundColor: "transparent",
                    mb: 3
                }}
            >
                {title}
            </Typography>

            {children}
        </Box>
    )
}

export default ProfileLayout