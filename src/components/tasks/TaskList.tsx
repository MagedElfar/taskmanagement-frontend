import { Box } from '@mui/material'
import React from 'react'
import TaskListHead from './TaskListHead'

type props = {
    title: string,
    color: string
}

const TaskList: React.FC<props> = ({ title, color }) => {
    return (
        <Box component="div">
            <TaskListHead title={title} color={color} />
        </Box>
    )
}

export default TaskList