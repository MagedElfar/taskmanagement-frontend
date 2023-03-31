import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../../hooks/store.hook'
import SpaceMember from './SpaceMember'
import { Member } from '../../interfaces/space'
import Errors from '../layouts/Errors'

const SpaceTeam = () => {
    const { space: { team, loading, errors } } = useAppSelector(state => state)
    return (
        <Box component="div">
            {errors.length > 0 && <Errors errors={errors} />}

            {loading ?
                <Box sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    bgcolor: "rgba(0 , 0 , 0 , 0.7)",
                    top: 0,
                    left: 0,
                    zIndex: "99999",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff"
                }}>
                    <CircularProgress color="inherit" size={60} />
                </Box> :
                null
            }

            <Typography variant='h6'>
                Members / {team.length}
            </Typography>

            <Stack spacing={3} sx={{ mt: 4 }}>
                {team.map((member: Member) => <SpaceMember key={member.id} member={member} />)}
            </Stack>

        </Box>
    )
}

export default SpaceTeam