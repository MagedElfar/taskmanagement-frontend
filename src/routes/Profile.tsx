import { Box, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ShieldIcon from '@mui/icons-material/Shield';
import { Link, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/store.hook';

const Profile = () => {
    const { them } = useAppSelector(s => s)
    return (
        <Grid container spacing={6}>
            <Grid item xs={12} md={4} sx={{ backgroundColor: "transparent" }}>
                <Box sx={{ width: '100%' }}>
                    <Typography
                        variant="h5"
                        component="h5"
                        sx={{
                            color: them.colors.fourthColor,
                            backgroundColor: "transparent",
                            mb: 2
                        }}
                    >
                        Account Setting
                    </Typography>
                    <nav aria-label="main mailbox folders">
                        <List sx={{ py: 0, backgroundColor: them.colors.thirdColor }}>
                            <Link to="" className='w-full'>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <PersonIcon />
                                        </ListItemIcon>
                                        Personal Information
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                            <Divider />
                            <ListItem disablePadding>
                                <Link to="photo" className='w-full'>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <AddAPhotoIcon />
                                        </ListItemIcon>
                                        Profile Photo
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                            <Divider />
                            <ListItem disablePadding>
                                <Link to="privacy" className='w-full'>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <ShieldIcon />
                                        </ListItemIcon>
                                        Privacy & Security
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        </List>
                    </nav>
                </Box>
            </Grid>
            <Grid item xs={12} md={8}>
                <Outlet />
            </Grid>
        </Grid>
    )
}

export default Profile