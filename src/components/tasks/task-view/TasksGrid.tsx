import React, { useState } from 'react'
import { Alert, Grid, Snackbar } from '@mui/material'
import { ITask, TaskStatus } from '../../../interfaces/tasks';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import TaskList from '../TaskList'
import { useAppDispatch, useAppSelector } from '../../../hooks/store.hook';
import { updateTaskOrder } from '../../../utilities/api';
import { apiErrorFormat } from '../../../utilities/error-format';
import { localUpdate } from '../../../store/slices/task.slice';

type props = {
    tasks: ITask[]
}

const TasksGrid: React.FC<props> = ({ tasks }) => {
    const [errors, setErrors] = useState([]);

    const { them, task } = useAppSelector(state => state);
    const dispatch = useAppDispatch()

    const statusTask = {
        [`${TaskStatus.TO_DO}`]: tasks.filter((task: ITask) => task.status === TaskStatus.TO_DO),
        [`${TaskStatus.IN_PROGRESS}`]: tasks.filter((task: ITask) => task.status === TaskStatus.IN_PROGRESS),
        [`${TaskStatus.IN_REVIEW}`]: tasks.filter((task: ITask) => task.status === TaskStatus.IN_REVIEW),
        [`${TaskStatus.BLOCKED}`]: tasks.filter((task: ITask) => task.status === TaskStatus.BLOCKED),
        [`${TaskStatus.DONE}`]: tasks.filter((task: ITask) => task.status === TaskStatus.DONE),

    };

    let oldArr: ITask[] = []
    Object.values(TaskStatus).forEach((status: string) => oldArr = [...oldArr, ...statusTask[status]])


    const onDragEnd = async (result: DropResult) => {
        try {
            const { source, destination, draggableId } = result;

            if (!destination) return;

            if (destination.droppableId === source.droppableId && destination.index === source.index) return;

            let add: ITask;


            Object.values(TaskStatus).forEach((status: string) => {
                if (source.droppableId === status) {
                    add = statusTask[status][source.index];
                    statusTask[status].splice(source.index, 1);
                    return;
                }
            })

            Object.values(TaskStatus).forEach((status: string) => {
                if (destination.droppableId === status) {
                    statusTask[status].splice(destination.index, 0, { ...add, status })
                    return;
                }
            })

            let newArr: ITask[] = [];

            Object.values(TaskStatus).forEach((status: string) => newArr = [...newArr, ...statusTask[status]])

            const index = newArr.findIndex((task: ITask) => task.id === add.id)

            const position = oldArr[index].position
            const currentPosition = add.position

            await updateTaskOrder(parseInt(draggableId), { status: destination.droppableId, position })

            dispatch(localUpdate({
                newArr,
                currentPosition,
                position,
                index
            }))

        } catch (error) {
            console.log(error)
            setOpen(true)
            setErrors(apiErrorFormat(error))
        }

    }

    //Snackbar
    const [openBar, setOpen] = useState(false);
    const handleCloseBar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        setOpen(false);
        setErrors([])
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {errors.length > 0 &&
                errors.map((error: string, index: number) => <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    key={index}
                    open={openBar}
                    autoHideDuration={6000}
                    onClose={handleCloseBar}
                >
                    <Alert onClose={handleCloseBar} severity="error" sx={{ width: '100%' }}>
                        {error}
                    </Alert>
                </Snackbar>)
            }
            <Grid container wrap='nowrap' gap={2} sx={{ mr: -3, ml: 0, width: "auto" }} >
                <Grid item xs={3.75} sx={{ flexShrink: 0 }}>
                    <TaskList
                        color={them.colors.toDo}
                        tasks={statusTask[TaskStatus.TO_DO]}
                        type={TaskStatus.TO_DO}
                    />

                </Grid>

                <Grid item xs={3.75} sx={{ flexShrink: 0 }}>
                    <TaskList
                        color={them.colors.inProgress}
                        tasks={statusTask[TaskStatus.IN_PROGRESS]}
                        type={TaskStatus.IN_PROGRESS}
                    />

                </Grid>

                <Grid item xs={3.75} sx={{ flexShrink: 0 }}>
                    <TaskList
                        color={them.colors.inReview}
                        tasks={statusTask[TaskStatus.IN_REVIEW]}
                        type={TaskStatus.IN_REVIEW}
                    />

                </Grid>

                <Grid item xs={3.75} sx={{ flexShrink: 0 }}>
                    <TaskList
                        color={them.colors.blocked}
                        tasks={statusTask[TaskStatus.BLOCKED]}
                        type={TaskStatus.BLOCKED}
                    />
                </Grid>

                <Grid item xs={3.75} sx={{ flexShrink: 0 }}>
                    <TaskList
                        color={them.colors.done}
                        tasks={statusTask[TaskStatus.DONE]}
                        type={TaskStatus.DONE}
                    />

                </Grid>

                <Grid item width="1px" sx={{ flexShrink: 0 }}></Grid>
            </Grid>
        </DragDropContext>)
}

export default TasksGrid