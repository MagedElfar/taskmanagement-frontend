import React, { useState } from 'react'
import { ITask } from '../../../interfaces/tasks'
import { useAppDispatch, useAppSelector } from '../../../hooks/store.hook'
import { Box, Button, Tooltip, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment, { Moment } from 'moment';
import { updateTask } from '../../../store/thunk-actions/task-actions';
import { useTaskContext } from '../../../hooks/taskContext';

type props = {
    task: ITask,
}



const TaskDueDate: React.FC<props> = ({ task }) => {
    const { them, user: { user: { username } } } = useAppSelector(state => state);


    const { setActivities } = useTaskContext()
    const dispatch = useAppDispatch()

    const [due_date, setDueDate] = useState<any>(task.due_date && moment(task.due_date))

    const [open, setOpen] = useState(false);

    const onChange = (newValue: any) => {
        dispatch(updateTask({
            id: task.id,
            data: {
                due_date: newValue ? moment(newValue).format("YYYY-MM-DD") : newValue
            }
        })).unwrap().then(() => {
            setDueDate(newValue)
            setOpen(false);
            setActivities((s: any) => ([
                {
                    id: 0,
                    user1: username,
                    activity: `Change Task due_date to ${newValue ? moment(newValue).format("YYYY-MM-DD") : "no due date"}`,
                }, ...s
            ]))
        })
    }

    return (
        <Box sx={{
            px: 2,
            display: "flex",
            alignItems: "center",
            position: "relative"
        }}>
            <Tooltip placement='bottom' title="Update Due Date">
                <Button
                    id="long-button"
                    aria-haspopup="true"
                    onClick={() => setOpen(!open)}
                    variant='outlined'
                    sx={{
                        height: "30px",
                        minWidth: "30px !important",
                        borderRadius: "50%", p: 0,
                        color: them.colors.fourthColor,
                        border: `1px dashed ${them.colors.fourthColor}`
                    }}
                >
                    <CalendarMonthIcon sx={{ width: "18px" }} fill={them.colors.fourthColor} />
                </Button>
            </Tooltip>


            {open ?
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker

                        orientation="landscape"
                        label="Due Date"
                        value={due_date}
                        format='YYYY-MM-DD'
                        sx={{ ml: 1 }}
                        onChange={(newValue) => onChange(newValue)}

                        slotProps={{
                            actionBar: {
                                actions: ['clear'],
                            },
                            popper: {
                                sx: {
                                    zIndex: "999999"
                                },
                                placement: "right-start"
                            }
                        }}
                    />
                </LocalizationProvider>
                :
                <Typography
                    variant='body1'
                    sx={{
                        color: them.colors.fourthColor,
                        ml: 1,
                        fontSize: "14px"
                    }}
                >
                    {
                        due_date ?
                            moment(due_date).format('YYYY-MM-DD') :
                            "No Due Date"
                    }
                </Typography>

            }
        </Box>
    )
}

export default TaskDueDate