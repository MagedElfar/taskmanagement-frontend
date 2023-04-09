import React, { useState, useEffect } from 'react';
import { ISingleTask, ITask } from '../../interfaces/tasks';
import { Box, Grid } from '@mui/material';
import { useAppSelector } from '../../hooks/store.hook';

type props = {
    task: ISingleTask
}

const SingleTask: React.FC<props> = ({ task }) => {

    const { them } = useAppSelector(state => state)



    return (
        <Grid container sx={{ height: "100%" }} >
            <Grid item xs={6}></Grid>
            <Grid item xs={6} sx={{ bgcolor: them.colors.firstColor }}>
                <Box >

                </Box>
            </Grid>
        </Grid >
    )
}

export default SingleTask