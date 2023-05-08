import { Box } from '@mui/material'
import React from 'react'
import TaskListHead from './TaskListHead'
import { ITask, TaskStatus } from '../../interfaces/tasks'
import TaskCard from './TaskCard'
import { Droppable } from 'react-beautiful-dnd'

type props = {
    color: string,
    tasks: ITask[],
    type: TaskStatus
}

const TaskList: React.FC<props> = ({ color, tasks, type }) => {
    return (
        <Droppable droppableId={type}>
            {(provided) => (
                <Box
                    sx={{
                        minHeight: {
                            sx: "auto",
                            md: "calc(100vh - 190px)"
                        },
                        mb: {
                            xs: 3,
                            md: 0
                        }
                    }}
                    component="div"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    <TaskListHead title={type} color={color} />
                    {
                        tasks.map((task: ITask, index: number) => <TaskCard key={task.id} task={task} color={color} index={index} />)
                    }
                    {provided.placeholder}
                </Box>
            )}
        </Droppable>
    )
}

export default TaskList