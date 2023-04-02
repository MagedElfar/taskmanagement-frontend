import { Box, Divider } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../../../hooks/store.hook'
import SpaceMenu from '../../space/SpaceMenu'
import ProjectMenu from '../../projects/ProjectMenu'
import DropDownMenu from './DropDownMenu'
import FactCheckIcon from '@mui/icons-material/FactCheck';

const Navigation = () => {
    const { them, space } = useAppSelector(s => s)
    return (
        <Box component="nav">
            <SpaceMenu />
            <Divider sx={{ backgroundColor: them.colors.firstColor }} />
            <DropDownMenu title='projects' items={space.projects} icon={<FactCheckIcon />}>
                <ProjectMenu />
            </DropDownMenu>
        </Box>
    )
}

export default Navigation