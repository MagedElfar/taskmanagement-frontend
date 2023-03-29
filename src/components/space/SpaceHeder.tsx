import React from 'react'
import { Avatar, Badge, Box, Grid } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import { useAppSelector } from '../../hooks/store.hook'
import HomeIcon from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography';

const SpaceHeder = () => {
    const { space, them } = useAppSelector(s => s)

    return (
        <Box component="div" sx={{ mb: "100px" }}>
            <Grid container spacing={1}>
                <Grid item>
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        sx={{
                            mr: 2,
                        }}
                        badgeContent={
                            <HomeIcon sx={{
                                position: "absolute",
                                bottom: "-5px",
                                right: "-10px",
                                color: them.colors.firstColor,
                                fill: them.colors.fourthColor,
                                stroke: them.colors.firstColor
                            }} />
                        }
                    >
                        <Avatar
                            sx={{
                                bgcolor: deepOrange[500],
                                width: "50px",
                                height: "50px",
                                fontSize: "30px"
                            }}
                            variant="rounded">
                            {space.name[0]?.toUpperCase() || "W"}
                        </Avatar>
                    </Badge>
                </Grid>
                <Grid item sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                        variant='h2'
                        sx={{
                            fontWeight: 500,
                            fontSize: them.fonSize.title,
                            textTransform: "capitalize"
                        }}
                    >
                        {space.name}
                    </Typography>
                </Grid>

            </Grid>
        </Box >
    )
}

export default SpaceHeder