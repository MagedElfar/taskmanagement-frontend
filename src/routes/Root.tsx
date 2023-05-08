
import React, { useEffect } from 'react';
import { Box, Avatar, IconButton, Divider, CssBaseline, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import withGuard from '../utilities/withGuard'
import { Link, Outlet, useLocation } from 'react-router-dom';
import { AppBar, Drawer, DrawerHeader } from '../layouts/main-layout/MainLayoute';
import { useAppDispatch, useAppSelector } from '../hooks/store.hook';
import Nav from '../components/layouts/nav/Nav';
import { getInitSpace, getSpace } from '../store/thunk-actions/space-actions';
import Navigation from '../components/layouts/Navigation';
import Models from '../models/Models';
import socket, { socketListener } from '../utilities/socket';

function Root() {
    const { them, space } = useAppSelector(s => s)
    const isMobile = useMediaQuery('(max-width:600px)');

    const [open, setOpen] = React.useState(isMobile ? false : true);

    const location = useLocation()

    const dispatch = useAppDispatch();


    useEffect(() => {

        socket.connect();


        socketListener(dispatch)

        if (space.id) {
            dispatch(getSpace(+space.id))
        } else {
            dispatch(getInitSpace())
        }

        return () => {
            socket.disconnect()
        }

    }, [])

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Models />
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open}>
                    <Nav open={open} onClick={handleDrawerOpen} />
                </AppBar>


                <Drawer
                    variant={isMobile ? "temporary" : "permanent"}

                    open={open}

                    sx={{
                        "& .MuiBackdrop-root": {
                            transition: "unset !important"
                        }
                    }}

                    PaperProps={{
                        sx: {
                            bgcolor: "transparent"
                        }
                    }}
                >
                    <DrawerHeader>
                        <Link to="/">
                            <Avatar
                                alt="logo"
                                src="/logo.svg"
                                sx={{
                                    width: "30px",
                                    height: "30px",
                                    ...(!open && { display: 'none' }),
                                }}
                            />
                        </Link>
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
                    {open ? <>
                        <Navigation />
                    </> : null}

                </Drawer>
                <Box
                    component="main"
                    sx={{
                        position: "relative",
                        flexGrow: 1,
                        p: 3,
                        backgroundColor: them.colors.firstColor,
                        minHeight: "100vh",
                        overflow: "auto",
                        mt: {
                            xs: "100px",
                            md: "0"
                        },
                        "& ::-webkit-scrollbar": {
                            display: "none"
                        }
                    }}
                >
                    {!location.pathname.includes("inbox") && <DrawerHeader />}
                    <DrawerHeader />
                    <Outlet />
                </Box>
            </Box>

        </>

    );
}

export default withGuard(Root)