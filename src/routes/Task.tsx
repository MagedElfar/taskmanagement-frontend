import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import TaskModel from '../models/TaskModel';
import SingleTask from '../components/tasks/SingleTask';
import { ITask, ISingleTask } from '../interfaces/tasks';
import { getTask } from '../utilities/api';
import { Box, CircularProgress } from '@mui/material';

const Task = () => {
    const { id } = useParams();

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [task, setTask] = useState<ISingleTask | null>(null);

    useEffect(() => {
        getSingleTask()
    }, [])

    const getSingleTask = async () => {
        try {
            const { data } = await getTask(+id);
            console.log(data)
            setTask(data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error);
            navigate("404")
        }
    }


    return (
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
    )
}

export default Task 