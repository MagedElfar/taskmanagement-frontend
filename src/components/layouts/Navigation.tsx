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
import ArchiveIcon from '@mui/icons-material/Archive';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssessmentIcon from '@mui/icons-material/Assessment';

const Navigation = () => {
    const { them, space, user } = useAppSelector(s => s)

    return (
        <Box component="nav">
            <SpaceMenu />
            <Divider sx={{ backgroundColor: them.colors.firstColor }} />
            <List
                sx={{
                    "& .MuiButtonBase-root": {
                        p: 0
                    }
                }}
            >
                <ListItemButton sx={{ display: "flex", alignItems: "center" }} >
                    <Link className='w-full p-4 flex items-center' to="/" style={{ color: them.colors.firstColor }}>
                        <ListItemIcon>
                            <HomeIcon sx={{ fill: them.colors.firstColor }} />
                        </ListItemIcon>
                        Home
                    </Link>
                </ListItemButton>

                <ListItemButton>
                    <Link className='w-full  p-4 flex items-center' to="/my-tasks" style={{ color: them.colors.firstColor }}>
                        <ListItemIcon>
                            <CheckCircleOutlineOutlinedIcon sx={{ fill: them.colors.firstColor }} />
                        </ListItemIcon>
                        My Tasks
                    </Link>
                </ListItemButton>
                <ListItemButton>
                    <Link className='w-full  p-4 flex items-center' to="/reports" style={{ color: them.colors.firstColor }}>
                        <ListItemIcon>
                            <AssessmentIcon sx={{ fill: them.colors.firstColor }} />
                        </ListItemIcon>
                        Reports
                    </Link>
                </ListItemButton>

                <ListItemButton>
                    <Link className='w-full  p-4  flex items-center' to="/calender" style={{ color: them.colors.firstColor }}>
                        <ListItemIcon>
                            <CalendarMonthIcon sx={{ fill: them.colors.firstColor }} />
                        </ListItemIcon>
                        Calender
                    </Link>
                </ListItemButton>

                <ListItemButton sx={{ display: "flex", alignItems: "center" }} >
                    <Link className='w-full  p-4  flex items-center' to="/archive" style={{ color: them.colors.firstColor }}>
                        <ListItemIcon>
                            <ArchiveIcon sx={{ fill: them.colors.firstColor }} />
                        </ListItemIcon>
                        Archive
                    </Link>
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