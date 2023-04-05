import React from 'react'
import { ITask } from '../../interfaces/tasks'
import { Avatar, Box, Grid, Tooltip, Typography } from '@mui/material'
import { useAppSelector } from '../../hooks/store.hook'
import moment from 'moment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Draggable } from 'react-beautiful-dnd';

type props = {
    task: ITask,
    color: string,
    index: number
}
const TaskCard: React.FC<props> = ({ task, color, index }) => {

    const { them } = useAppSelector(state => state)

    return (
        <Draggable draggableId={task.id.toString()} index={index}>
            {(provided) => (
                <Box
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
                    <Typography align='left' variant='h6' sx={{
                        color: them.colors.secondColor,
                        fontSize: "16px",
                        textTransform: "capitalize"
                    }}>
                        {task.title}
                    </Typography>

                    {(task.due_date || task.assignId) && <Grid container
                        sx={{
                            mt: 2,
                            justifyContent: task.due_date ? "space-between" : "flex-end",
                            alignItems: "center"
                        }}
                    >
                        {task.due_date && <Grid item >
                            <Typography variant='body1' sx={{
                                display: "flex",
                                alignItems: "center",
                                color: "rgba(0, 0, 0, 0.54)",
                                fontSize: "12px"
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