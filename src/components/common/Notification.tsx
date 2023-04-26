import { Avatar, Box, Button, CircularProgress, Divider, MenuItem, MenuList, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { IconButton } from '@mui/material';
import { useAppSelector } from '../../hooks/store.hook';
import { apiErrorFormat } from '../../utilities/error-format';
import { getNotifications } from '../../utilities/api';
import { useNavigate } from 'react-router-dom';
import { purple } from '@mui/material/colors';
import { fullName } from '../../utilities/helper';

interface INotification {
    id: number,
    text: string,
    task_id: number,
    username: string,
    first_name: string,
    last_name: string,
    image: string,
    is_read: boolean
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

    const navigate = useNavigate()

    const { user: userState, them, space: { id: space_id } } = useAppSelector(s => s);

    useEffect(() => {
        getAllNotification()
    }, [space_id, offset])

    useEffect(() => {
        containerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [notifications]);

    const getAllNotification = async () => {
        try {
            setLoading(true);
            const { data } = await getNotifications({
                space_id: +space_id,
                page: offset,
                limit: 5
            })

            setNotifications(data.data.data)
            setMaxOffset(data.data.count)
            setUnread(data.data.unReadCount)
        } catch (error) {
            setErrors(apiErrorFormat(error))
        } finally {
            setLoading(false)
        }
    }
    console.log(maxOffset >= offset && notifications.length > 0)
    const navigateTo = (id: number) => {
        setOpen(false);
        setOffset(1)

        navigate(`/task/${id}`)
    }


    return (
        <Box
            position="relative"
            zIndex="99999"
        >
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
                    width="280px"
                    top="45px"
                    bgcolor="#FFF"
                    color="#0C1A3E"
                    right="0"
                >

                    <MenuList
                        sx={{
                            maxHeight: "165px",
                            py: 0,
                            overflow: "auto"
                        }}
                    >
                        {notifications.length > 0 ?
                            notifications.map(notification => <MenuItem
                                sx={{
                                    py: 2,
                                    bgcolor: notification.is_read ? "#FFF" : "#FEF6F0"
                                }}

                                key={notification.id}
                                onClick={() => navigateTo(notification.task_id)}
                            >
                                <Avatar
                                    sx={{ width: "35px", height: "35px", bgcolor: purple[500], p: 0 }}
                                    alt={notification.username}
                                    src={notification.image || "/"}
                                />

                                <Typography sx={{
                                    fontSize: "14px",
                                    ml: 2,
                                    maxWidth: "75%",
                                    whiteSpace: "pre-wrap"
                                }}>
                                    <span dangerouslySetInnerHTML={{
                                        __html: `<span class = "capitalize font-bold">${fullName({ first_name: notification.first_name, last_name: notification.last_name, username: notification.username })}</span> ${notification.text}`
                                    }}></span>
                                </Typography>
                            </MenuItem>)
                            :
                            <MenuItem>
                                <Typography align='center' width="100%" >
                                    No task found
                                </Typography>
                            </MenuItem>

                        }

                        <div ref={containerRef} />
                    </MenuList>

                    {
                        (maxOffset >= offset && notifications.length > 0) ?
                            null
                            : <>
                                <Divider />
                                <Button
                                    fullWidth
                                    variant='text'
                                    sx={{
                                        fontSize: "14px", textTransform: "none", textAlign: "center"
                                    }}
                                    onClick={getAllNotification}
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