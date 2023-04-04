import { Grid } from '@mui/material'
import React from 'react'
import TaskList from '../components/tasks/TaskList'
import { useAppSelector } from '../hooks/store.hook';

const Home = () => {
    const { them } = useAppSelector(state => state);

    return (
        <Grid container wrap='nowrap' gap={2} sx={{ mr: -3, ml: 0 }}>
            <Grid item xs={3} sx={{ flexShrink: 0 }}>
                <TaskList title="to do" color={them.colors.toDo} />
            </Grid>

            <Grid item xs={3} sx={{ flexShrink: 0 }}>
                <TaskList title="in progress" color={them.colors.inProgress} />
            </Grid>

            <Grid item xs={3} sx={{ flexShrink: 0 }}>
                <TaskList title="in review" color={them.colors.inReview} />
            </Grid>

            <Grid item xs={3} sx={{ flexShrink: 0 }}>
                <TaskList title="blocked" color={them.colors.blocked} />
            </Grid>

            <Grid item xs={3} sx={{ flexShrink: 0 }}>
                <TaskList title="done" color={them.colors.done} />
            </Grid>
        </Grid>
    )
}

export default Home