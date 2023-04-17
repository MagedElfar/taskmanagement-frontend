import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useAppSelector } from '../../hooks/store.hook'
import SpaceMenu from '../space/SpaceMenu'
import ProjectMenu from '../projects/ProjectMenu'
import DropDownMenu from '../common/DropDownMenu'
import FactCheckIcon from '@mui/icons-material/FactCheck';
import Groups2Icon from '@mui/icons-material/Groups2';
import TeamList from '../team/TeamList'
import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

const Navigation = () => {
    const { them, space, user } = useAppSelector(s => s)

    return (
        <Box component="nav">
            <SpaceMenu />
            <Divider sx={{ backgroundColor: them.colors.firstColor }} />
            <List
                sx={{
                    "& .MuiButtonBase-root": {
                        py: 2
                    }
                }}
            >
                <ListItemButton >
                    <ListItemIcon>
                        <HomeIcon sx={{ fill: them.colors.firstColor }} />
                    </ListItemIcon>
                    <Link to="/" style={{ color: them.colors.firstColor }}>Home</Link>
                </ListItemButton>

                <ListItemButton >
                    <ListItemIcon>
                        <CheckCircleOutlineOutlinedIcon sx={{ fill: them.colors.firstColor }} />
                    </ListItemIcon>
                    <Link to="/my-tasks" style={{ color: them.colors.firstColor }}>My Tasks</Link>
                </ListItemButton>

                <DropDownMenu title='projects' items={space.projects} icon={<FactCheckIcon />}>
                    <ProjectMenu />
                </DropDownMenu>

                <DropDownMenu title='team' items={space.team} icon={<Groups2Icon />}>
                    <TeamList />
                </DropDownMenu>
            </List>

        </Box>
    )
}

export default Navigation