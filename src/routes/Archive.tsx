import React, { useCallback, useEffect, useState } from 'react'
import { ITask } from '../interfaces/tasks'
import { useAppSelector } from '../hooks/store.hook'
import { getTasks } from '../utilities/api'
import { apiErrorFormat } from '../utilities/error-format'
import FullPageLoading from '../components/common/loading/FullPageLoading'
import SnackError from '../components/common/SnackError'
import TaskListView from '../components/tasks/task-view/listview/TaskListView'

const Archive = () => {
    const { space: { id: spaceId } } = useAppSelector(state => state)
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [tasks, setTasks] = useState<ITask[]>([])

    useEffect(() => {
        getArchivedTasks()
    }, [spaceId])

    const getArchivedTasks = useCallback(async () => {
        try {
            setLoading(true)
            if (!spaceId) return;
            const { data } = await getTasks(`?spaceId=${spaceId}&orderBy=position&order=asc&is_archived=1`)
            setTasks(data.tasks.data)
        } catch (error) {
            setErrors(apiErrorFormat(error))
        } finally {
            setLoading(false)
        }
    }, [spaceId])


    return (
        <>
            <FullPageLoading loading={loading} />
            <SnackError errors={errors} />
            <TaskListView tasks={tasks} />
        </>
    )
}

export default Archive