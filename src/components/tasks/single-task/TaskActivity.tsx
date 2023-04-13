import React, { useState } from 'react'
import { IActivity, ITask } from '../../../interfaces/tasks'
import { Box, Button, Typography } from '@mui/material'
import moment from 'moment';
import { getActivities } from '../../../utilities/api';

type props = {
    activities: { data: IActivity[], count: number },
    task: ITask
}

const TaskActivity: React.FC<props> = ({ activities: { data, count }, task }) => {

    const [activities, setActivities] = useState(data);


    const [offset, setOffset] = useState(2)

    const maxOffset = Math.ceil(count / 5)

    const fetchActivities = async () => {
        if (maxOffset < offset) return;
        try {
            const { data: { data } } = await getActivities(`?taskId=${task.id}&limit=5&page=${offset}`);

            console.log(data)

            setOffset(s => s + 1);

            setActivities(s => [...s, ...data.data])

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <Box>
            <div className='flex items-center mb-6'>
                <Typography textTransform="capitalize" fontWeight={600} fontSize="18px">
                    {task.username} created this task.
                </Typography>
                <Typography ml={2} component="span" fontSize="12px">
                    {moment(task.created_at).fromNow()}
                </Typography>
            </div>

            <div className='mb-2'>
                {
                    activities.map((activity: IActivity, index) => (
                        <div className='flex mb-2' key={index}>
                            <Typography textTransform="capitalize" component="span" fontSize="12px">
                                {`${activity.user1} ${activity.activity} ${activity.user2 ? activity.user2 : ""}`}
                            </Typography>
                            <Typography ml={2} component="span" fontSize="12px">
                                {moment(activity.created_at).fromNow()}
                            </Typography>
                        </div>
                    ))
                }
            </div>

            {
                maxOffset >= offset && <Button
                    variant='text'
                    sx={{ fontSize: "14px", textTransform: "none", p: 0 }}
                    onClick={fetchActivities}
                >
                    Show previous updates
                </Button>
            }

        </Box>
    )
}

export default TaskActivity