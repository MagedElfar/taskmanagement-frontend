import React, { useState } from 'react';
import usePrevious from '../../../hooks/prevState';
import { useAppDispatch, useAppSelector } from '../../../hooks/store.hook';
import { ITask } from '../../../interfaces/tasks';
import { updateTask } from '../../../store/thunk-actions/task-actions';
import { TextField } from '@mui/material';

type props = {
    task: ITask,
}

const TaskTitle: React.FC<props> = ({ task }) => {
    const { them } = useAppSelector(state => state)
    const dispatch = useAppDispatch()

    const [title, setTitle] = useState<string>(task.title)


    const prevState = usePrevious<string>(title)


    const onBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
        try {
            if (title === prevState) return;

            await dispatch(updateTask({
                id: task.id,
                data: {
                    [e.target.name]: e.target.value
                }
            }));

        } catch (error) {
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    return (
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
                value={title}
                onBlur={onBlur}
                onChange={onChange}
            />
        </div>
    )
}

export default TaskTitle