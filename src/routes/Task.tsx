import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import TaskModel from '../models/TaskModel';
import SingleTask from '../components/tasks/SingleTask';
import { ITask, ISingleTask, IActivity } from '../interfaces/tasks';
import { getTask } from '../utilities/api';
import { Box, CircularProgress } from '@mui/material';
import { TaskContext } from '../hooks/taskContext';


const Task = () => {
    const { id } = useParams();

    const [activities, setActivities] = useState<IActivity[]>([]);

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [task, setTask] = useState<ISingleTask | null>(null);

    useEffect(() => {
        getSingleTask()
    }, [])

    const getSingleTask = async () => {
        try {
            const { data } = await getTask(+id);
            setTask(data)
            setLoading(false)
            setActivities(data.activities.data)
        } catch (error) {
            setLoading(false)
            navigate("404")
        }
    }


    return (
        <TaskContext.Provider
            value={{
                activities,
                setActivities
            }}
        >
            <TaskModel task={task?.task}>
                {loading ?
                    <Box
                        component="div"
                        sx={{
                            minHeight: "inherit",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                        <CircularProgress />
                    </Box>
                    :
                    <SingleTask task={task} />
                }
            </TaskModel>
        </TaskContext.Provider>

    )
}

export default Task 