import { Box, Typography } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../../hooks/store.hook'

type props = {
    title: string,
    color: string
}

const TaskListHead: React.FC<props> = ({ title, color }) => {
    const { them } = useAppSelector(state => state);

    return (
        <Box
            sx={{
                bgcolor: "#FFF",
                px: 2,
                py: 1
            }}
            component="div"
        >
            <Typography
                component="h5"
                align='left'
                sx={{
                    color: them.colors.firstColor,
                    textTransform: "capitalize",
                    width: "fit-content",
                    fontSize: "14px"
                }}
            >
                <Box
                    sx={{
                        bgcolor: color,
                        px: 2,
                        borderRadius: "20px"
                    }}
                >
                    {title}
                </Box>
            </Typography>
        </Box>
    )
}

export default TaskListHead