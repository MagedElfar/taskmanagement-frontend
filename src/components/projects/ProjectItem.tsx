import { IconButton, ListItemButton, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react'
import { Project } from '../../interfaces/space';

type props = {
    project: Project
}

const ProjectItem: React.FC<props> = ({ project }) => {
    return (
        <ListItemButton sx={{ pl: 4 }}>
            <ListItemText sx={{ color: "#FFF" }} primary={project.name} />
            <Tooltip title="Delete">
                <IconButton color='error'>
                    DeleteIcon
                </IconButton>
            </Tooltip>

        </ListItemButton>)
}

export default ProjectItem