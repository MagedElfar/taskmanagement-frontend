import { Box, Divider } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../../hooks/store.hook'
import SpaceMenu from '../space/SpaceMenu'
import ProjectMenu from '../projects/ProjectMenu'

const Navigation = () => {
    const { them } = useAppSelector(s => s)
    return (
        <Box component="nav">
            <SpaceMenu />
            <Divider sx={{ backgroundColor: them.colors.firstColor }} />
            <ProjectMenu />
        </Box>
    )
}

export default Navigation