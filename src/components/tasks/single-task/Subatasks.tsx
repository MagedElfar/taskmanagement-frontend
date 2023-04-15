import { Box, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, List, ListItem, Tooltip, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import React, { FormEvent, useState } from 'react'
import { ITask } from '../../../interfaces/tasks';
import { useAppDispatch, useAppSelector } from '../../../hooks/store.hook';
import { toggleCreateTaskModel } from '../../../store/slices/model.slice';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTask, deleteTask } from '../../../store/thunk-actions/task-actions';
import SendIcon from '@mui/icons-material/Send';
type props = {
    subTasks: ITask[],
    task: ITask
}

const SubTasks: React.FC<props> = ({ subTasks, task }) => {

    const [isOpen, setOpen] = useState(false)
    const [title, setTitle] = useState("")
    const [tasks, setTasks] = useState(subTasks)

    const { them, space } = useAppSelector(state => state)

    const dispatch = useAppDispatch()

    const onClick = (id: number) => {
        dispatch(deleteTask(id)).unwrap().then(() => {
            setTasks(s => s.filter((item: ITask) => item.id !== id))
        })
    }

    const onsubmit = (e: FormEvent) => {
        e.preventDefault()
        dispatch(createTask({
            parentId: task.id,
            spaceId: +space.id,
            title,
            description: ""
        })).unwrap().then((data) => {
            setTasks(s => [...s, data]);
            setOpen(false)
            setTitle("")
        })
    }


    return (
        <Box>
            <div>
                {tasks.length > 0 && <List>
                    {tasks.map((task: ITask) => (
                        <ListItem

                            key={task.id}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                px: 0,
                                py: "3px",
                                borderTop: `1px solid  ${them.colors.firstColor}`,
                                borderBottom: `1px solid  ${them.colors.firstColor}`,
                                "&.MuiListItem-root:not(:last-of-type)": {
                                    borderBottom: "none"
                                }
                            }}
                        >
                            <div>
                                <Link to={`/task/${task.id}`}>
                                    <Typography
                                        component="span"
                                        sx={{
                                            fontSize: "12px",
                                            textTransform: "capitalize",
                                            color: "rgba(0, 0, 0, 0.54)",
                                        }}
                                    >
                                        {task.title}
                                    </Typography>
                                </Link>
                            </div>
                            <div>
                                <Tooltip title="Delete">
                                    <IconButton onClick={() => onClick(task.id)} color='error' size='small'>
                                        <DeleteIcon sx={{ width: "20px" }} />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </ListItem>
                    ))}
                </List>}

                {isOpen && <form className='mb-3' onSubmit={onsubmit}>
                    <FormControl sx={{ width: '100%' }} variant="standard">
                        <Input
                            fullWidth
                            placeholder='title'
                            id="standard-adornment-password"
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton color='info' type="submit">
                                        <SendIcon sx={{ width: "20px" }} />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </form>}
                <Button

                    onClick={() => setOpen(!isOpen)}
                    variant="outlined"
                    size='small'
                    sx={{
                        mt: "5px",
                        fontSize: "12px",
                        textTransform: "capitalize"
                    }}
                    startIcon={<AddIcon />}
                >
                    Add subtask
                </Button>
            </div>
        </Box>
    )
}

export default SubTasks