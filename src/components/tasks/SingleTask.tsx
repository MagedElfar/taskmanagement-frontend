import React, { useState, useEffect } from 'react';
import { ISingleTask, ITask } from '../../interfaces/tasks';
import { Alert, Box, Grid, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hook';
import AssigneeButton from './AssigneeButton';
import { Member } from '../../interfaces/space';
import { assignTask, unassignTask } from '../../store/thunk-actions/task-actions';
import TaskPriority from './TaskPriority';

type props = {
    task: ISingleTask,
    setTask: (data: Partial<ISingleTask>) => void
}

const SingleTask: React.FC<props> = ({ task, setTask }) => {
    const { them, task: { errors } } = useAppSelector(state => state)
    const dispatch = useAppDispatch()

    //Snackbar
    const [openBar, setOpen] = useState(false);
    const handleCloseBar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        setOpen(false);
    };

    let member: Partial<Member> | null = task.task.assignId ? {
        userImage: task.task.assignToImage_url,
        username: task.task.assignToUserName,
    } : null

    const updateAssignee = (member: Partial<Member>) => {
        if (task.task.assignId) return
        dispatch(assignTask({
            memberId: member.id,
            taskId: +task.task.id
        })).unwrap()
            .then((data) => setTask({
                task: {
                    ...task.task,
                    assignId: data.id,
                    assignToUserName: data.username,
                    assignToImage_url: data.url
                }
            }))
            .catch(() => setOpen(true))
    }

    const unAssignee = () => {
        dispatch(unassignTask({
            id: task.task.assignId,
            taskId: +task.task.id
        })).unwrap()
            .then(() => {
                setTask({
                    task: {
                        ...task.task,
                        assignId: null,
                        assignToUserName: null,
                        assignToImage_url: null
                    }
                })

            })
            .catch(() => setOpen(true))
    }
    return (
        <Grid container sx={{ height: "100%" }} >
            {errors.length > 0 &&
                errors.map((error: string, index: number) => <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    key={index}
                    open={openBar}
                    autoHideDuration={6000}
                    onClose={handleCloseBar}
                >
                    <Alert onClose={handleCloseBar} severity="error" sx={{ width: '100%' }}>
                        {error}
                    </Alert>
                </Snackbar>)
            }
            <Grid container item xs={6} >
                <Grid item xs={6} sx={{ p: 2, display: "flex", gap: "20px" }}>
                    <AssigneeButton
                        updateAssignee={updateAssignee}
                        member={member}
                        unAssignee={unAssignee}
                    />

                    <TaskPriority task={task.task} />
                </Grid>
                <Grid item xs={6}>

                </Grid>
            </Grid>
            <Grid item xs={6} sx={{ bgcolor: them.colors.firstColor }}>
                <Box >

                </Box>
            </Grid>
        </Grid >
    )
}

export default SingleTask