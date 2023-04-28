import React, { useEffect, useRef, useState } from 'react'
import { IActivity, ITask } from '../../../interfaces/tasks'
import { Box, Button, Typography } from '@mui/material'
import moment from 'moment';
import { getActivities } from '../../../utilities/api';
import { useTaskContext } from '../../../hooks/taskContext';
import TaskActivityList from './TaskActivityList';

type props = {
    activities: { data: IActivity[], count: number },
    task: ITask
}

const TaskActivity: React.FC<props> = ({ activities: { data, count }, task }) => {

    const { activities, setActivities } = useTaskContext()

    const containerRef = useRef(null);

    const [offset, setOffset] = useState(2)

    const maxOffset = Math.ceil(count / 5)

    const fetchActivities = async () => {
        if (maxOffset < offset) return;
        try {
            const { data: { data } } = await getActivities(`?taskId=${task.id}&limit=5&page=${offset}`);

            console.log(data)

            setOffset(s => s + 1);

            setActivities((s: any) => [...s, ...data.data])

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        containerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [activities]);

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
                        <div className='flex mb-5' key={index}>
                            <TaskActivityList activity={activity} />
                        </div>
                    ))
                }
                <div ref={containerRef} />

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