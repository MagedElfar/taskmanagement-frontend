import React, { useEffect, useState } from 'react'
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
import { useNavigate, useLocation } from 'react-router-dom'

const Archive = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);

    const { space: { id: spaceId } } = useAppSelector(state => state)

    const [page, setPage] = useState<number>(1)
    const [count, setCount] = useState<number>(0)
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState([]);
    const [tasks, setTasks] = useState<ITask[]>([])
    const [term, setTerm] = useState(searchParams.get('term') || "")

    const prevTerm = usePrevious(term)

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('page', value.toString());
        navigate(`/archive?${searchParams.get('term') ? `term=${searchParams.get('term')}&` : ''}page=${searchParams.get('page')}`);
    };

    const handleTerm = (term: string) => {
        setTerm(term)
        searchParams.set('term', term);
        navigate(`/archive?term=${searchParams.get('term')}&page=${searchParams.get('page') || 1}`);
    }

    const getArchivedTasks = async () => {
        try {
            const searchParams = new URLSearchParams(location.search);
            const term = searchParams.get('term') || "";
            const page = parseInt(searchParams.get('page') || '1', 10);

            setLoading(true)

            if (!spaceId) return;
            const { data } = await getTasks(`?spaceId=${spaceId}&orderBy=position&order=asc&limit=10&page=${page}&term=${term}&is_archived=1`);
            const count = Math.ceil(data.tasks.count / 10);

            setCount(count)
            setTasks(data.tasks.data)
            setPage(page)
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
    }, [spaceId, location.search])

    return (
        <>
            <Box bgcolor="#FFF" maxWidth="300px" ml="auto" mb={4} mt={2} borderRadius="5px">
                <SearchInput term={term} placeHolder={"search in tasks ..."} onChange={(term) => handleTerm(term)} />
            </Box>
            <FullPageLoading loading={loading} />
            <SnackError errors={errors} />
            <TaskListView tasks={tasks} />
            {count > 1 && <Pagination
                onChange={handleChange}
                page={page}
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