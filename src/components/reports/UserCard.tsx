import { Avatar, Box, Grid, LinearProgress, LinearProgressProps, Typography } from '@mui/material'
import React from 'react'
import { ISpaceTeamReport } from '../../interfaces/space'
import { useAppSelector } from '../../hooks/store.hook'
import { fullName } from '../../utilities/helper'


function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', width: "100%" }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

type props = {
    report: ISpaceTeamReport
}

const UserCard: React.FC<props> = ({ report }) => {
    const { them } = useAppSelector(state => state)

    console.log(report)
    return (
        <Box
            sx={{
                bgcolor: "#fff",
                p: 2,
                borderRadius: "8px"
            }}
        >
            <Grid container alignItems="center" >
                <Grid item>
                    <Avatar
                        alt={report.username}
                        src={report.image || "/"}
                        sx={{ width: 45, height: 45, fontSize: "16px" }}
                    />
                </Grid>
                <Grid item ml={2}>
                    <Typography
                        variant='body1'
                        sx={{
                            fontSize: "16px",
                            color: them.colors.secondColor,
                            fontWeight: 500,
                            textTransform: "capitalize",
                            lineHeight: "16px"
                        }}
                    >
                        {fullName({
                            username: report.username,
                            first_name: report.firstName,
                            last_name: report.lastName
                        })}
                    </Typography>

                    <Typography
                        variant='body1'
                    >
                        <a
                            style={{
                                color: "#ccc",
                                fontSize: "14px",
                                lineHeight: "14px"
                            }}
                            href={`mailto:${report.email}`}>{report.email}
                        </a>
                    </Typography>
                </Grid>
            </Grid>

            <Box width="100%" mt={4}>
                <Typography
                    variant='body1'
                    sx={{
                        color: "#ccc",
                        fontSize: "  nm",
                        lineHeight: "16px",
                        mb: 2
                    }}
                >
                    {`${report.completedTasks} from ${report.totalTasks} tasks completed`}
                </Typography>

                <LinearProgressWithLabel value={report.totalTasks > 0 ? (report.completedTasks / report.totalTasks) * 100 : 0} />
            </Box>
        </Box >
    )
}

export default UserCard