import { Typography } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../../hooks/store.hook'

type props = {
    text: string
}

const Label: React.FC<props> = ({ text }) => {
    const { them } = useAppSelector(state => state)
    return (
        <Typography
            component="label"
            align='left'
            sx={{
                textTransform: "capitalize",
                fontSize: "14px",
                color: them.colors.fourthColor
            }}
        >
            {text}
        </Typography>
    )
}

export default Label