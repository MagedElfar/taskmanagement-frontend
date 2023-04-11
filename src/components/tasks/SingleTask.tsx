import React, { useState, useEffect } from 'react';
import { ISingleTask, ITask } from '../../interfaces/tasks';
import { Alert, Box, Divider, Grid, IconButton, Snackbar, TextField, Tooltip } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hook';
import AssigneeButton from './AssigneeButton';
import { Member } from '../../interfaces/space';
import { assignTask, unassignTask, updateTask } from '../../store/thunk-actions/task-actions';
import TaskPriority from './TaskPriority';
import { toggleDeleteTaskModel } from '../../store/slices/model.slice';
import DeleteIcon from '@mui/icons-material/Delete';
import usePrevious from '../../hooks/prevState';
import Label from '../layouts/Label';
import TaskDueDate from './TaskDueDate';
import ProjectList from '../projects/ProjectList';

interface TaskInfo {
    title: string,
    description: string,
    [key: string]: any
}

type props = {
    task: ISingleTask,
    setTask: (data: Partial<ISingleTask>) => void
}

const SingleTask: React.FC<props> = ({ task, setTask }) => {
    const { them } = useAppSelector(state => state)
    const dispatch = useAppDispatch()

    //task
    const [taskInfo, setTaskInfo] = useState<TaskInfo>({
        title: task.task.title,
        description: task.task.description
    })
    const [assignId, setAssignId] = useState<number | null>(task.task.assignId)
    const [member, setMember] = useState<Partial<Member> | null>(task.task.assignId ? {
        userImage: task.task.assignToImage_url,
        username: task.task.assignToUserName,
    } : null)

    const prevState = usePrevious<TaskInfo>(taskInfo)

    const updateAssignee = (member: Partial<Member>) => {
        if (assignId) return
        dispatch(assignTask({
            memberId: member.id,
            taskId: +task.task.id
        })).unwrap()
            .then((data) => {
                setMember({
                    id: member.id,
                    userImage: data.url,
                    username: data.username,
                })
                setAssignId(data.id)
            })
    }

    const unAssignee = () => {
        dispatch(unassignTask({
            id: assignId,
            taskId: +task.task.id
        })).unwrap()
            .then(() => {
                setAssignId(null);
                setMember(null)
            })
    }


    const onBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
        try {
            if (taskInfo[e.target.name] === prevState[e.target.name]) return;

            await dispatch(updateTask({
                id: task.task.id,
                data: {
                    [e.target.name]: e.target.value
                }
            }));

        } catch (error) {
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskInfo(s => ({
            ...s,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <Grid container sx={{ height: "100%", overflow: "auto" }} >

            <Grid item xs={6} >
                <Grid container >
                    <Grid item xs={6} sx={{ p: 2, display: "flex", gap: "20px" }}>
                        <AssigneeButton
                            updateAssignee={updateAssignee}
                            member={member}
                            unAssignee={unAssignee}
                        />

                        <TaskPriority task={task.task} />
                    </Grid>
                    <Grid item xs={6} sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center"
                    }}>
                        <Tooltip title="Delete">
                            <IconButton
                                sx={{ px: 2 }}
                                color="error"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    dispatch(toggleDeleteTaskModel(task.task.id))
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
                <Divider />
                <div className='px-4 py-2'>
                    <TextField
                        sx={{
                            outline: "0 !important",
                            color: them.colors.secondColor,
                            transition: "all 0.3s",
                            border: `1px solid transparent`,
                            borderRadius: "8px",
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderWidth: "0 !important",
                                outline: "0 !important",
                            },
                            "&:hover": {
                                border: `1px solid ${them.colors.secondColor} !important`
                            },
                            "& .MuiInputBase-root , & .MuiInputBase-input": {
                                outline: "0 !important",
                            },
                            "& .MuiInputBase-input": {
                                fontSize: "35px"
                            }
                        }}
                        fullWidth
                        name='title'
                        value={taskInfo.title}
                        onBlur={onBlur}
                        onChange={onChange}
                    />
                </div>
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

                    <div>
                        <Label text='description' />
                        <TextField
                            multiline
                            rows={8}
                            maxRows={12}
                            sx={{
                                mx: "-14px",
                                outline: "0 !important",
                                color: them.colors.secondColor,
                                transition: "all 0.3s",
                                border: `1px solid transparent`,
                                borderRadius: "8px",
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderWidth: "0 !important",
                                    outline: "0 !important",
                                },
                                "&:hover": {
                                    border: `1px solid ${them.colors.secondColor} !important`
                                },
                                "& .MuiInputBase-root , & .MuiInputBase-input": {
                                    outline: "0 !important",
                                },
                                "& .MuiInputBase-input": {
                                    fontSize: "20px"
                                }
                            }}
                            fullWidth
                            name='description'
                            value={taskInfo.description}
                            onBlur={onBlur}
                            onChange={onChange}
                        />
                    </div>
                </Box>
            </Grid>
            <Grid item xs={6} sx={{ bgcolor: them.colors.firstColor }}>
                <Box >

                </Box>
            </Grid>
        </Grid >
    )
}

export default SingleTask