import React, { useEffect, useState } from 'react';
import { ISingleTask, ITask } from '../../interfaces/tasks';
import { Box, Divider, Grid } from '@mui/material';
import { useAppSelector } from '../../hooks/store.hook';
import TaskPriority from './single-task/TaskPriority';
import Label from '../layouts/Label';
import TaskDueDate from './single-task/TaskDueDate';
import ProjectList from '../projects/ProjectList';
import TaskAssign from './single-task/TaskAssign';
import TaskDelete from './single-task/TaskDelete';
import TaskTitle from './single-task/TaskTitle';
import TaskDescription from './single-task/TaskDescription';
import TaskAttachment from './single-task/TaskAttach';
import TaskActivity from './single-task/TaskActivity';
import SubTasks from './single-task/Subatasks';

type props = {
    task: ISingleTask,
}


const SingleTask: React.FC<props> = ({ task: singleTask }) => {

    const [task, setTask] = useState<ISingleTask | null>(null)
    const { them } = useAppSelector(state => state)

    useEffect(() => {
        console.log("task.....")
        setTask(singleTask)
    }, [singleTask])
    if (!task) return
    return (
        <Grid container height="100%" >
            <Grid
                item xs={6}
                overflow="auto"
                height="100%"
                sx={{
                    "&::-webkit-scrollbar-track": {
                        bgcolor: "transparent"
                    }
                }}
            >
                <Grid container >
                    <Grid item xs={6} sx={{ p: 2, display: "flex", gap: "20px" }}>
                        <TaskAssign task={task.task} />
                        <TaskPriority task={task.task} />
                    </Grid>
                    <Grid item xs={6} sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center"
                    }}>
                        <TaskDelete task={task.task} />
                    </Grid>
                </Grid>
                <Divider />
                <TaskTitle task={task.task} />
                <Box sx={{ px: "30px", pb: 2 }}>
                    <div className='flex items-center mb-4'>
                        <div className='w-4/12'>
                            <Label text="due date" />
                        </div>
                        <TaskDueDate task={task.task} />
                    </div>

                    <div className='flex items-center mb-4'>
                        <div className='w-4/12'>
                            <Label text="Project" />
                        </div>
                        <ProjectList taskId={task.task.id} initProject={{
                            id: task.task.projectId,
                            name: task.task.projectName
                        }} />
                    </div>
                    <TaskAttachment task={task.task} attachments={task.attachments} />
                    <div className='mb-4'>
                        <Label text='Subtasks' />
                        <SubTasks subTasks={task.subTasks} task={task.task} />
                    </div>
                    <div >
                        <Label text='description' />
                        <TaskDescription task={task.task} />
                    </div>
                </Box>
            </Grid>
            <Grid
                item
                xs={6}
                overflow="auto"
                height="100%"

                sx={{
                    bgcolor: them.colors.firstColor,
                    py: 2,
                    px: 3,
                    "&::-webkit-scrollbar-track": {
                        bgcolor: "transparent"
                    }
                }}
            >
                <Box >
                    <TaskActivity task={task.task} activities={task.activities} />
                </Box>
            </Grid>
        </Grid >
    )
}

export default SingleTask