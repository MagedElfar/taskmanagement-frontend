import React, { useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { Alert, Box, Breadcrumbs, Snackbar, Toolbar, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../hooks/store.hook';
import NavTopMenu from './NavTopMenu';
import { Link, useLocation, useParams } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SearchBar from '../../common/SearchBar';
import socket from '../../../utilities/socket';
import { IMessage } from '../../../interfaces/inbox';
import { fullName } from '../../../utilities/helper';
import { updateUnreadMessages } from '../../../store/slices/conversation.slice';

type props = {
    open: Boolean
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const NavTop: React.FC<props> = ({ open, onClick }) => {
    const { them, space } = useAppSelector(s => s)
    const [notification, setNotification] = useState<IMessage | null>(null)
    const [openBar, setOpenBar] = useState(false);

    const dispatch = useAppDispatch()

    const location = useLocation()
    const { id } = useParams()

    let subTitle;

    if (location.pathname.includes("project")) {
        const project = space.projects.find(project => project.id === +id);

        subTitle = project?.name;
    } else if (location.pathname.includes("my-tasks")) {
        subTitle = "My Tasks"
    } else if (location.pathname.includes("archive")) {
        subTitle = "Archive"
    } else if (location.pathname.includes("calender")) {
        subTitle = "Calender"
    } else if (location.pathname.includes("reports")) {
        subTitle = "Reports"
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenBar(false);
    };


    const menuId = 'primary-search-account-menu';

    useEffect(() => {
        socket.on("newUnReadMessage", (data) => {
            dispatch(updateUnreadMessages(data));

            console.log(data)
            setNotification(data)
            setOpenBar(true);
        })
    }, [])

    return (
        <Toolbar sx={{ backgroundColor: them.colors.thirdColor }}>
            <Box component="div" sx={{ display: "flex", width: "100%", alignItems: "center" }}>
                {notification && <Snackbar
                    open={openBar}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                >
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        <Typography sx={{
                            fontSize: "12px",
                            whiteSpace: "pre-wrap"
                        }}>
                            <span dangerouslySetInnerHTML={{
                                __html: `<span class = "capitalize font-bold">you have a new message from ${fullName({ first_name: notification.first_name, last_name: notification.last_name, username: notification.username })}</span>`
                            }}></span>
                        </Typography>
                    </Alert>
                </Snackbar>
                }
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={onClick}
                    sx={{
                        mr: 2,
                        marginRight: 5,
                        ...(open && { display: 'none' }),
                    }}

                >
                    <MenuIcon sx={{ color: them.colors.fourthColor }} />
                </IconButton>

                {subTitle ?

                    <Breadcrumbs
                        separator={<NavigateNextIcon fontSize="small" />}
                        aria-label="breadcrumb"
                    >
                        <Link
                            to="/"
                        >
                            {space.name}
                        </Link>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                display: { xs: 'none', sm: 'block' },
                                color: them.colors.fourthColor,
                                textTransform: "capitalize"
                            }}
                        >
                            {subTitle}
                        </Typography>
                    </Breadcrumbs>
                    :
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            color: them.colors.fourthColor,
                            textTransform: "capitalize"
                        }}
                    >
                        {location.pathname.includes("inbox") ? "Inbox" : space.name}
                    </Typography>

                }
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: "center" }}>
                    <SearchBar />
                    <NavTopMenu />
                </Box>
            </Box>


        </Toolbar>
    )
}

export default NavTop