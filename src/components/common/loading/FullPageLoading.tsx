import { Box, CircularProgress } from '@mui/material'
import React from 'react'

type props = {
    loading: boolean
}

const FullPageLoading: React.FC<props> = ({ loading }) => {

    if (!loading) return;
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "rgba(0 , 0 , 0 , 0.4)",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: "99999"
        }}>
            <CircularProgress />
        </Box>
    )
}

export default FullPageLoading