
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Box, Avatar, IconButton, Divider, CssBaseline, Toolbar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import withGuard from '../utilities/withGuard'
import { Outlet } from 'react-router-dom';
import { AppBar, Drawer, DrawerHeader } from '../layouts/main-layout/MainLayoute';
import SpaceList from '../components/space-list/SpaceList';
import { useAppSelector } from '../hooks/store.hook';



function Root() {
    const them = useAppSelector(s => s.them)
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    r
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                open={open}
                sx={{
                    backgroundColor: them.colors.firstColor
                }}
            >
                <DrawerHeader>
                    <Avatar
                        alt="logo"
                        src="/logo.svg"
                        sx={{
                            width: "30px",
                            height: "30px"
                        }}
                    />
                    <IconButton
                        aria-label="open drawer"
                        onClick={handleDrawerClose}
                        edge="start"
                        sx={{
                            color: them.colors.firstColor
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                </DrawerHeader>

                <Divider sx={{ backgroundColor: them.colors.firstColor }} />
                <SpaceList />

                <Divider sx={{ backgroundColor: them.colors.firstColor }} />


            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, backgroundColor: them.colors.firstColor, height: "100vh" }}
            >
                <DrawerHeader />
                <Outlet />
            </Box>
        </Box>
    );
}

export default withGuard(Root)