import React, { useState } from 'react'
import { ITask } from '../../interfaces/tasks'
import { Box, Button, Menu, MenuItem, Tooltip } from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hook';
import { updateTask } from '../../store/thunk-actions/task-actions';

type props = {
    task: ITask,
}

enum COLOR {
    INFO = "info",
    WARNING = "warning",
    ERROR = "error"
}

interface Priority {
    color: COLOR,
    key: string
}

const priorities: Priority[] = [
    { key: "low", color: COLOR.INFO },
    { key: "medium", color: COLOR.WARNING },
    { key: "heigh", color: COLOR.ERROR },
]

const TaskPriority: React.FC<props> = ({ task }) => {
    const [priority, setPriority] = useState(task.priority)

    const { task: { errors } } = useAppSelector(state => state)
    const dispatch = useAppDispatch()

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const updatePriority = (priority: string) => {

        dispatch(updateTask({
            id: task.id,
            data: { priority }
        })).unwrap()
            .then(() => {
                setPriority(priority)
                setAnchorEl(null);
            })




    };
    const ITEM_HEIGHT = 48;

    return (
        <Box>
            <Tooltip title={priority ? `${priority} priority` : "priority"} placement='top'>
                <Button
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                    variant='outlined'
                    sx={{ height: "35px", minWidth: "35px !important", borderRadius: "50%", p: 0 }}
                    color={
                        priority === "heigh" ? "error"
                            : priority === "medium" ? "warning"
                                : "info"
                    }
                >
                    <FlagIcon />
                </Button>


            </Tooltip >
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                {
                    priorities.map((priority: Priority) => <MenuItem
                        key={priority.key}
                        onClick={() => updatePriority(priority.key)}
                    >
                        <Button variant='text' color={priority.color}>
                            <FlagIcon sx={{ mr: 1 }} />

                            {priority.key}
                        </Button>
                    </MenuItem>)
                }

            </Menu>
        </Box>


    )
}

export default TaskPriority