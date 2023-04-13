import React from 'react'
import { ITask } from '../../interfaces/tasks'
import { Avatar, Box, Chip, Grid, Tooltip, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../hooks/store.hook'
import moment from 'moment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Draggable } from 'react-beautiful-dnd';
import { toggleDeleteTaskModel } from '../../store/slices/model.slice';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';

type props = {
    task: ITask,
    color: string,
    index: number
}
const TaskCard: React.FC<props> = ({ task, color, index }) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { them } = useAppSelector(state => state)

    return (
        <Draggable draggableId={task.id.toString()} index={index}>
            {(provided) => (
                <Box
                    onClick={(e) => navigate(`/task/${task.id}`)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    component="div"
                    sx={{
                        bgcolor: "#FFF",
                        p: 2,
                        mt: 2,
                        borderRadius: "5px",
                        borderLeft: `5px solid ${color}`
                    }}
                >
                    <Grid container
                        sx={{
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2
                        }}
                    >

                        {
                            task.taskMedia && <div className='mb-8'>
                                <img alt="" src={task.taskMedia} />
                            </div>
                        }

                        <Grid item>
                            <Chip
                                sx={{
                                    textTransform: "capitalize",
                                    fontSize: "12px",
                                    height: "25px"
                                }}
                                label={`${task.priority} Priority`}
                                color={
                                    task.priority === "heigh" ? "error"
                                        : task.priority === "medium" ? "warning"
                                            : "info"
                                }
                            />
                        </Grid>

                        <Grid item >
                            <Chip
                                sx={{
                                    textTransform: "capitalize",
                                    fontSize: "12px",
                                    height: "25px"
                                }}
                                label="Delete"
                                onDelete={(e) => {
                                    e.stopPropagation()
                                    dispatch(toggleDeleteTaskModel(task.id))
                                }}
                            />
                        </Grid>

                    </Grid>

                    <Typography align='left' variant='h6' sx={{
                        color: them.colors.secondColor,
                        fontSize: "16px",
                        textTransform: "capitalize"
                    }}>
                        <Chip
                            size='small'
                            color='success'
                            variant={task?.is_complete ? "filled" : "outlined"}
                            icon={<CheckIcon sx={{ width: "12px", margin: "0 !important" }} />}
                            sx={{
                                mr: 1,
                                width: "15px",
                                height: "15px",
                                borderRadius: "50%",
                                "& span": {
                                    display: "none"
                                }
                            }}
                        />
                        {task.title}
                    </Typography>

                    {(task.due_date || task.assignId) && <Grid container
                        sx={{
                            mt: 3,
                            justifyContent: task.due_date ? "space-between" : "flex-end",
                            alignItems: "center"
                        }}
                    >
                        {task.due_date && <Grid item >
                            <Typography variant='body1' sx={{
                                display: "flex",
                                alignItems: "center",
                                color: "rgba(0, 0, 0, 0.54)",
                                fontSize: "12px",
                            }}>
                                <CalendarMonthIcon
                                    sx={{
                                        width: "20px",
                                        fill: "rgba(0, 0, 0, 0.54)",
                                        mr: 1
                                    }}
                                />
                                {moment(task.due_date).format("MMM DD")}
                            </Typography>
                        </Grid>}

                        {task.assignId && <Grid item >
                            <Tooltip title={`assign to ${task.assignToUserName}`}>
                                <Avatar
                                    alt={task.assignToUserName}
                                    src={task.assignToImage_url || "/"}
                                    sx={{ width: 30, height: 30, fontSize: "16px" }}
                                />
                            </Tooltip>
                        </Grid>}
                    </Grid>}
                </Box>
            )}
        </Draggable>
    )
}

export default TaskCard