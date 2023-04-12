import { Tooltip, IconButton } from '@mui/material'
import React from 'react'
import { toggleDeleteTaskModel } from '../../../store/slices/model.slice';
import { ITask } from '../../../interfaces/tasks';
import { useAppDispatch } from '../../../hooks/store.hook';
import DeleteIcon from '@mui/icons-material/Delete';

type props = {
    task: ITask,
}

const TaskDelete: React.FC<props> = ({ task }) => {
    const dispatch = useAppDispatch()

    return (
        <Tooltip title="Delete">
            <IconButton
                sx={{ px: 2 }}
                color="error"
                onClick={(e) => {
                    e.stopPropagation()
                    dispatch(toggleDeleteTaskModel(task.id))
                }}
            >
                <DeleteIcon />
            </IconButton>
        </Tooltip>)
}

export default TaskDelete