import React from 'react'
import { ISpaceReport } from '../../interfaces/space'
import PieSpaceChart from './PieSpaceChart'
import { Box, Chip, Grid, Stack, Typography } from '@mui/material'
import SpaceBarChart from './SpaceBarChart'
import { useAppSelector } from '../../hooks/store.hook'
import TaskIcon from '@mui/icons-material/Task';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ArchiveIcon from '@mui/icons-material/Archive';
import PersonIcon from '@mui/icons-material/Person';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

type props = {
    report: ISpaceReport
}

const SpaceReport: React.FC<props> = ({ report }) => {
    const { them, space: { team, projects } } = useAppSelector(state => state)
    const pieData = [
        {
            name: "Complete Tasks",
            value: report.completed_tasks
        },
        {
            name: "Incomplete Tasks",
            value: report.total_tasks - report.completed_tasks
        }
    ]

    const barData = [
        { name: 'To Do', task: report.toDo },
        { name: 'In Progress', task: report.inProgress },
        { name: 'In Review', task: report.inReview },
        { name: 'Done', task: report.done },
        { name: 'Blocked', task: report.blocked }
    ];
    return (
        <Grid container mt={2} spacing={3}>
            <Grid item xs={12} sx={{ mb: 2 }} pt="0 !important">
                <Stack direction="row" justifyContent="center" flexWrap="wrap" spacing={1} gap={1}>
                    <Chip icon={<TaskIcon />} label={`${report.total_tasks} Tasks`} />
                    <Chip icon={<TaskAltIcon />} label={`${report.completed_tasks ? report.completed_tasks : 0} Completed task`} />
                    <Chip icon={<ArchiveIcon />} label={`${report.archived_tasks ? report.archived_tasks : 0} Archived task`} />
                    <Chip icon={<PersonIcon />} label={`${team.length} Member`} />
                    <Chip icon={<BusinessCenterIcon />} label={`${projects.length} Project`} />
                </Stack>
            </Grid>
            <Grid item md={8} xs={12}>
                <Box
                    component="div"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        bgcolor: "#fff",
                        borderRadius: "8px",
                        p: 2,
                        height: "320px"
                    }}
                >
                    <Typography
                        variant='h4'
                        align='left'
                        sx={{
                            color: them.colors.secondColor,
                            fontWeight: 500,
                            fontSize: "16px",
                            mb: 2
                        }}
                    >
                        Tasks by status
                    </Typography>
                    <SpaceBarChart data={barData} />

                </Box>

            </Grid>
            <Grid item md={4} xs={12}>
                <Box
                    component="div"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "#fff",
                        borderRadius: "8px",
                        p: 2,
                        height: "320px"
                    }}
                >
                    <PieSpaceChart data={pieData} />

                </Box>

            </Grid>
        </Grid>
    )
}

export default SpaceReport