import React from 'react'
import { ISpaceTeamReport, Member } from '../../interfaces/space'
import { Box, Grid, Typography } from '@mui/material'
import { useAppSelector } from '../../hooks/store.hook'
import UserCard from './UserCard'

type props = {
    report: ISpaceTeamReport[]
}



const TeamReport: React.FC<props> = ({ report }) => {
    const { them, space: { team } } = useAppSelector(state => state)

    const members: ISpaceTeamReport[] = team.map((item: Member) => {
        const member = report.find(member => member.memberId === item.id)

        if (!member) {
            return {
                memberId: item.id,
                image: item.userImage,
                username: item.username,
                email: item.userEmail,
                firstName: item.firstName,
                lastName: item.lastName,
                totalTasks: 0,
                completedTasks: 0
            }
        }

        return member
    })


    return (
        <Box mt={8}>
            <div>
                <Typography
                    variant='h2'
                    sx={{
                        color: them.colors.secondColor,
                        fontSize: "20px",
                        fontWeight: "500",
                        mb: 3
                    }}
                >
                    Team Overview
                </Typography>

                <Grid container spacing={2}>
                    {members.map(member => <Grid xs={4} key={member.memberId} item><UserCard report={member} /></Grid>)}
                </Grid>
            </div>

        </Box>

    )
}

export default TeamReport