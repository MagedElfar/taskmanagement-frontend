import React from 'react'
import { IMessage } from '../../interfaces/inbox'
import { useAppSelector } from '../../hooks/store.hook'
import { Avatar, Box, Typography } from '@mui/material'
import { purple, blue, grey } from '@mui/material/colors'
import moment from 'moment'

type props = {
    message: IMessage,
    userId: number
}

const Message: React.FC<props> = ({ message, userId }) => {

    console.log()
    return (
        <Box
            sx={{
                maxWidth: "65%",
                marginLeft: userId === message.sender_id ? "auto !important" : 0,
            }}

        >
            <div className={`flex ${userId === message.sender_id ? "justify-end" : "justify-start"} mb-1`}>
                <Typography
                    component="span"
                    sx={{
                        fontSize: "12px"
                    }}
                >
                    {moment(message.created_at).format('ddd [at] HH:mm')}
                </Typography>
            </div>
            <div className='flex gap-x-2 items-end'>
                <Avatar
                    sx={{ width: "25px", height: "25px", bgcolor: purple[500], p: 0 }}
                    alt={message.username}
                    src={message.userImage || "/"}
                />
                <Typography
                    variant='body1'
                    sx={{
                        bgcolor: userId === message.sender_id ? blue[400] : grey[500],
                        p: 1,
                        borderRadius: "12px",
                        fontSize: "14px"
                    }}

                >
                    {message.content}
                </Typography>
            </div>
        </Box>
    )
}

export default Message