import React, { useState } from 'react';
import usePrevious from '../../../hooks/prevState';
import { useAppDispatch, useAppSelector } from '../../../hooks/store.hook';
import { ITask } from '../../../interfaces/tasks';
import { updateTask } from '../../../store/thunk-actions/task-actions';
import { TextField } from '@mui/material';
import { useTaskContext } from '../../../hooks/taskContext';

type props = {
    task: ITask,
}

const TaskDescription: React.FC<props> = ({ task }) => {
    const { them, user: { user: { username } } } = useAppSelector(state => state)
    const dispatch = useAppDispatch()

    const { setActivities } = useTaskContext()

    const [description, setDescription] = useState<string>(task.description)


    const prevState = usePrevious<string>(description);



    const onBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
        try {
            if (description === prevState) return;

            dispatch(updateTask({
                id: task.id,
                data: {
                    description: e.target.value
                }
            })).unwrap()
                .then(() => {
                    setActivities((s: any) => ([
                        {
                            id: 0,
                            user1: username,
                            activity: `Change Task description to ${e.target.value}`,

                        }, ...s
                    ]))
                })



        } catch (error) {
            console.log(error)
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value)
    }

    return (
        <TextField
            multiline
            rows={12}
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
            value={description}
            onBlur={onBlur}
            onChange={onChange}
        />
    )
}

export default TaskDescription
