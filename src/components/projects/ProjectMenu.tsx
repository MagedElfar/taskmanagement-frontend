import { List } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../../hooks/store.hook';
import { Project } from '../../interfaces/space';
import ProjectItem from './ProjectItem';

type props = {
    items?: Project[]
}

const ProjectMenu: React.FC<props> = ({ items }) => {


    return (
        <List component="div" disablePadding>
            {items.map((project: Project) => <ProjectItem project={project} key={project.id} />)}
        </List>
    )
}

export default ProjectMenu