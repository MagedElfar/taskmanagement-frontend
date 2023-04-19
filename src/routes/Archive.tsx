import React, { useCallback, useEffect, useState } from 'react'
import { ITask } from '../interfaces/tasks'
import { useAppSelector } from '../hooks/store.hook'
import { getTasks } from '../utilities/api'
import { apiErrorFormat } from '../utilities/error-format'
import FullPageLoading from '../components/common/loading/FullPageLoading'
import SnackError from '../components/common/SnackError'
import TaskListView from '../components/tasks/task-view/listview/TaskListView'
import { Box, Pagination } from '@mui/material'
import SearchInput from '../components/common/SearchInput'
import usePrevious from '../hooks/prevState'

const Archive = () => {
    const { space: { id: spaceId } } = useAppSelector(state => state)
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [tasks, setTasks] = useState<ITask[]>([])
    const [term, setTerm] = useState("")

    const prevTerm = usePrevious(term)

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleTerm = (term: string) => {
        setTerm(term)
    }


    const getArchivedTasks = async () => {
        try {
            setLoading(true)
            if (!spaceId) return;
            const { data } = await getTasks(`?spaceId=${spaceId}&orderBy=position&order=asc&limit=10&page=${page}&term=${term}&is_archived=1`);
            console.log(data)

            const count = Math.ceil(data.tasks.count / 10);

            setCount(count)
            setTasks(data.tasks.data)
        } catch (error) {
            setErrors(apiErrorFormat(error))
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {


        if (prevTerm !== term) {
            const delay = setTimeout(getArchivedTasks, 1500);

            return () => clearTimeout(delay)
        } else {
            getArchivedTasks()

        }
    }, [spaceId, page, term])

    return (
        <>
            <Box bgcolor="#FFF" maxWidth="300px" ml="auto" mb={4} mt={2} borderRadius="5px">
                <SearchInput placeHolder={"search in tasks ..."} onChange={(term) => handleTerm(term)} />
            </Box>
            <FullPageLoading loading={loading} />
            <SnackError errors={errors} />
            <TaskListView tasks={tasks} />
            {count > 1 && <Pagination
                onChange={handleChange}
                count={count}
                size="medium"
                sx={{
                    mt: 4,
                    display: "flex",
                    justifyContent: "flex-end"
                }}
            />
            }
        </>
    )
}

export default Archive