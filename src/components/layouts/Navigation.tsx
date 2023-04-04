import { Box, Divider } from '@mui/material'
import { useAppSelector } from '../../hooks/store.hook'
import SpaceMenu from '../space/SpaceMenu'
import ProjectMenu from '../projects/ProjectMenu'
import DropDownMenu from '../common/DropDownMenu'
import FactCheckIcon from '@mui/icons-material/FactCheck';
import Groups2Icon from '@mui/icons-material/Groups2';
import SpaceTeam from '../space/SpaceTeam'
import TeamList from '../team/TeamList'

const Navigation = () => {
    const { them, space } = useAppSelector(s => s)
    return (
        <Box component="nav">
            <SpaceMenu />
            <Divider sx={{ backgroundColor: them.colors.firstColor }} />

            <DropDownMenu title='projects' items={space.projects} icon={<FactCheckIcon />}>
                <ProjectMenu />
            </DropDownMenu>

            <DropDownMenu title='team' items={space.team} icon={<Groups2Icon />}>
                <TeamList />
            </DropDownMenu>
        </Box>
    )
}

export default Navigation