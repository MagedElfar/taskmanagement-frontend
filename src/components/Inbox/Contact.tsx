import { Avatar, Badge, Box, Typography } from '@mui/material'
import { green, grey, purple, red } from '@mui/material/colors'
import React, { useContext } from 'react'
import { IConnection } from '../../interfaces/inbox'
import { useAppDispatch, useAppSelector } from '../../hooks/store.hook'
import { fullName } from '../../utilities/helper'
import { changeCurrentChat } from '../../store/slices/conversation.slice'
import { MyContext } from '../../routes/Inbox'

type props = {
    contact: IConnection,
    isHeader?: boolean
}

const Contact: React.FC<props> = ({ contact, isHeader }) => {
    const { conversation } = useAppSelector(state => state);
    const dispatch = useAppDispatch();
    const { setOpen } = useContext(MyContext)

    const onClick = () => {
        if (isHeader) return;
        dispatch(changeCurrentChat(contact))
        setOpen()
    }

    return (
        <Box
            component="div"
            onClick={onClick}
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                position: "relative",
                transition: "all 0.3s",
                cursor: "pointer",
                borderRadius: "12px",
                p: 2,
                "&:hover": {
                    bgcolor: isHeader ? "transparent" : grey[400]
                }
            }}>
            <Badge
                overlap="circular"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                badgeContent={<div style={{
                    backgroundColor: conversation.onlineUsers.some(item => item.userId === contact.user_Id) ? green['A700'] : grey[500],
                    border: "2px solid #fff",
                    height: "13px",
                    width: "13px",
                    borderRadius: "50%"
                }} />}
            >
                <Avatar
                    sx={{ width: "35px", height: "35px", bgcolor: purple[500], p: 0 }}
                    alt={contact.username}
                    src={contact.image || "/"}
                />
            </Badge>

            <Typography
                variant="body1"
            >
                {fullName({
                    username: contact.username,
                    first_name: contact.first_name,
                    last_name: contact.last_name
                })}
            </Typography>

            {
                contact.unread_count > 0 && !isHeader ?
                    <Box
                        sx={{
                            bgcolor: red[900],
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#FFF",
                            height: "20px",
                            width: "20px",
                            borderRadius: "50%",
                            fontSize: "12px",
                            position: "absolute",
                            top: "50%",
                            right: "16px",
                            transform: "translateY(-50%)"
                        }}
                    >
                        {contact.unread_count}
                    </Box>
                    : null
            }
        </Box>
    )
}

export default Contact