import { Button, Menu, MenuItem } from '@mui/material';
import React from 'react'
import { TaskStatus } from '../../../../interfaces/tasks';
import { useAppDispatch, useAppSelector } from '../../../../hooks/store.hook';
import { updateTaskStatus } from '../../../../store/thunk-actions/task-actions';
import SnackError from '../../../common/SnackError';

type props = {
    status: string,
    taskId: number
}

function toCamelCase(text: string): string {
    const words = text.toLowerCase().split(/[_\s]+/);
    const firstWord = words[0];
    const restWords = words.slice(1).map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return firstWord + restWords.join('');
}

const TaskProgress: React.FC<props> = ({ taskId, status }) => {
    const { them, task: { errors } } = useAppSelector(state => state);
    const dispatch = useAppDispatch()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (status: string) => {
        if (typeof (status) !== "string") {
            setAnchorEl(null);
            return;
        }
        dispatch(updateTaskStatus({
            id: taskId,
            status
        })).then(() => setAnchorEl(null))
    }

    return (
        <div className='w-full'>
            <SnackError errors={errors} />
            <Button
                fullWidth
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                size="small"
                sx={{
                    borderRadius: "20px",
                    bgcolor: them.colors[toCamelCase(status) as keyof typeof them.colors],
                    color: "#FFF",
                    "&:hover": {
                        backgroundColor: them.colors[toCamelCase(status) as keyof typeof them.colors],
                        opacity: "0.7"
                    },
                }}
            >
                {status}
            </Button>
            <Menu
                PaperProps={{
                    style: {
                        width: "190px", // set the width here
                    },
                }}
                anchorOrigin={{
                    vertical: "top", // center the menu vertically
                    horizontal: "center", // center the menu horizontally
                }}
                transformOrigin={{
                    vertical: "center", // center the menu contents vertically
                    horizontal: "center", // center the menu contents horizontally
                }}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {Object.values(TaskStatus).map((status, index) => {
                    return (
                        <MenuItem key={index} onClick={() => handleClose(status)}>{status}</MenuItem>
                    )
                })}
            </Menu>
        </div>
    );

}

export default TaskProgress