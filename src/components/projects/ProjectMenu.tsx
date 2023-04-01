import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { useAppSelector } from '../../hooks/store.hook';
import { Project } from '../../interfaces/space';
import ProjectItem from './ProjectItem';

const ProjectMenu = () => {
    const { space } = useAppSelector(state => state);

    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <FactCheckIcon sx={{ fill: "#fff" }} />
                </ListItemIcon>
                <ListItemText sx={{ color: "#fff" }} primary="Projects" />
                {open ? <ExpandLess sx={{ fill: "#fff" }} /> : <ExpandMore sx={{ fill: "#fff" }} />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {space.projects.map((project: Project) => <ProjectItem project={project} key={project.id} />)}
                </List>
            </Collapse>

        </List>
    )
}

export default ProjectMenu