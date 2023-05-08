import { Alert, Avatar, Box, Button, CircularProgress, Divider, MenuItem, MenuList, Snackbar, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { IconButton } from '@mui/material';
import { useAppSelector } from '../../hooks/store.hook';
import { apiErrorFormat } from '../../utilities/error-format';
import { deleteAllNotifications, deleteNotifications, getNotifications, markAllReadNotifications, readNotifications } from '../../utilities/api';
import { useNavigate } from 'react-router-dom';
import { purple } from '@mui/material/colors';
import { fullName } from '../../utilities/helper';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import SnackError from './SnackError';
import socket from '../../utilities/socket';

interface INotification {
    id: number,
    text: string,
    task_id: number,
    username: string,
    first_name: string,
    last_name: string,
    image: string,
    is_read: boolean,
    created_at: string
}

const Notification = () => {

    const containerRef = useRef(null);

    const [notifications, setNotifications] = useState<INotification[]>([]);
    const [offset, setOffset] = useState<number>(1);
    const [maxOffset, setMaxOffset] = useState<number>(0)
    const [unRead, setUnread] = useState<number>(0)
    const [errors, setErrors] = useState<string[]>([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openBar, setOpenBar] = useState(false);
    const [notification, setNotification] = useState<INotification | null>(null)

    const navigate = useNavigate()

    const { user: userState, them, space: { id: space_id } } = useAppSelector(s => s);

    const getAllNotification = async () => {
        try {
            setLoading(true);
            const { data } = await getNotifications({
                space_id: +space_id,
                page: offset,
                limit: 5
            })

            setNotifications(s => [...s, ...data.data.data])
            setMaxOffset(Math.ceil(data.data.count / 5))
            setUnread(data.data.unReadCount)
        } catch (error) {
            setErrors(apiErrorFormat(error))
        } finally {
            setLoading(false)
        }
    }

    const navigateTo = async (e: React.MouseEvent<HTMLElement>, notification: INotification) => {
        try {
            e.stopPropagation()
            if (!notification.is_read) {
                console.log("rrrr")
                await readNotifications(notification.id);
                setUnread(s => s - 1)
                setNotifications(s => (
                    s.map(item => {
                        if (item.id === notification.id) {
                            item.is_read = true
                        }

                        return item
                    })
                ))
            }
            setOpen(false);
            setOffset(1);
        } catch (error) {
            setErrors(apiErrorFormat(error))
        } finally {
            navigate(`/task/${notification.task_id}`)
        }
    }

    const removeNotification = async (e: React.MouseEvent<HTMLElement>, notification: INotification) => {
        try {
            e.stopPropagation()
            await deleteNotifications(notification.id)
            if (!notification.is_read) {
                setUnread(s => s - 1)
            }

            setNotifications(s => s.filter(item => item.id !== notification.id))

        } catch (error) {
            setErrors(apiErrorFormat(error))
        }
    }


    const markAllRead = async () => {
        try {
            await markAllReadNotifications()
            setUnread(0)
            setNotifications(s => (
                s.map(item => {
                    item.is_read = true
                    return item
                })
            ))
        } catch (error) {
            setErrors(apiErrorFormat(error))
        }
    }

    const deleteAll = async () => {
        try {
            await deleteAllNotifications()
            setUnread(0)
            setNotifications([])
            setOffset(1)
        } catch (error) {
            setErrors(apiErrorFormat(error))
        }
    }


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenBar(false);
    };

    useEffect(() => {

        socket.on("notification", (data) => {
            console.log("notification...")
            setNotification(data);
            setOpenBar(true);
            setNotifications(s => [data, ...s])
            setUnread(s => s + 1)
        })

    }, [])

    useEffect(() => {
        getAllNotification()
    }, [space_id, offset])

    useEffect(() => {
        containerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [notifications]);

    return (
        <Box
            position="relative"
            zIndex="999999"
        >
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
                            __html: `<span class = "capitalize font-bold">${fullName({ first_name: notification.first_name, last_name: notification.last_name, username: notification.username })}</span> ${notification.text}`
                        }}></span>
                    </Typography>
                </Alert>
            </Snackbar>
            }


            <SnackError errors={errors} />

            <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={() => setOpen(!open)}
                sx={{
                    marginRight: "12px",
                    color: them.colors.fourthColor
                }}
            >
                <Badge badgeContent={unRead} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>


            {
                open && <Box
                    border="2px solid #E4E4E4"
                    borderRadius="4px"
                    position="absolute"
                    width="320px"
                    top="50px"
                    bgcolor="#FFF"
                    color="#0C1A3E"
                    right="0"
                >
                    {notifications.length > 0 ?
                        <>
                            <Box sx={{
                                justifyContent: "space-between",
                                display: "flex",
                                px: 2,
                                py: 1
                            }}>
                                <Button
                                    onClick={markAllRead}
                                    variant='text'
                                    size={"small"}
                                    sx={{
                                        fontSize: "12px",
                                        textTransform: "capitalize"
                                    }}>
                                    Mark all is read
                                </Button>
                                <Button
                                    onClick={deleteAll}
                                    variant='text'
                                    size={"small"}
                                    sx={{
                                        fontSize: "12px",
                                        textTransform: "capitalize"
                                    }}>
                                    Delete all
                                </Button>
                            </Box>
                            <Divider sx={{ my: "0 !important" }} />

                        </>

                        : null}

                    <MenuList
                        sx={{
                            maxHeight: "370px",
                            py: 0,
                            overflow: "auto",
                            '&::-webkit-scrollbar': {
                                width: "5px"
                            }
                        }}
                    >
                        {notifications.length > 0 ?

                            notifications.map(notification => <MenuItem
                                sx={{
                                    py: 2,
                                    bgcolor: notification.is_read ? "#FFF" : "#FEF6F0",
                                    borderBottom: "1px solid #E4E4E4",
                                    justifyContent: "space-between"
                                }}

                                key={notification.id}
                                onClick={(e) => navigateTo(e, notification)}
                            >
                                <Avatar
                                    sx={{ width: "35px", height: "35px", bgcolor: purple[500], p: 0 }}
                                    alt={notification.username}
                                    src={notification.image || "/"}
                                />

                                <div className='ml-4 w-8/12'>
                                    <Typography sx={{
                                        fontSize: "12px",
                                        whiteSpace: "pre-wrap"
                                    }}>
                                        <span dangerouslySetInnerHTML={{
                                            __html: `<span class = "capitalize font-bold">${fullName({ first_name: notification.first_name, last_name: notification.last_name, username: notification.username })}</span> ${notification.text}`
                                        }}></span>
                                    </Typography>

                                    <Typography sx={{ mr: 2, opacity: "0.7", fontSize: "12px" }} component="span">{moment(notification.created_at).calendar()}</Typography>

                                </div>

                                <IconButton color="error" aria-label="delete" onClick={(e) => removeNotification(e, notification)}>
                                    <DeleteIcon sx={{ width: "20px" }} />
                                </IconButton>

                            </MenuItem>
                            )
                            :
                            <MenuItem sx={{ py: 2 }}>
                                <Typography fontSize={"14px"} align='center' width="100%" >
                                    You don't have notifications
                                </Typography>
                            </MenuItem>

                        }

                        <div ref={containerRef} />
                    </MenuList>

                    {
                        notifications.length === 0 ? null :
                            maxOffset <= offset ?
                                null
                                : <>
                                    <Divider />
                                    <Button
                                        fullWidth
                                        variant='text'
                                        sx={{
                                            fontSize: "14px", textTransform: "none", textAlign: "center"
                                        }}
                                        onClick={() => setOffset(s => s + 1)}
                                    >
                                        Load More...
                                        {loading &&
                                            <CircularProgress sx={{ width: "5px", height: "5px", ml: 1 }} />
                                        }
                                    </Button>
                                </>
                    }
                </Box>
            }
        </Box>
    )
}

export default Notification