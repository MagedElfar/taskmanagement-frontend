import React, { useState } from 'react'
import { IMessage } from '../../interfaces/inbox'
import { useAppSelector } from '../../hooks/store.hook'
import { Avatar, Box, Button, Typography } from '@mui/material'
import { purple, blue, grey } from '@mui/material/colors'
import moment from 'moment'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { apiErrorFormat } from '../../utilities/error-format'
import SnackError from '../common/SnackError'
import { deleteMessage } from '../../utilities/api'
import Linkify from 'react-linkify';

type props = {
    message: IMessage,
    userId: number
}

const Message: React.FC<props> = ({ message, userId }) => {

    const [errors, setErrors] = useState([])

    const onClick = async () => {
        try {
            await deleteMessage(message.id)
        } catch (error) {
            setErrors(apiErrorFormat(error))
        }
    }

    return (
        <Box
            sx={{
                maxWidth: "65%",
                marginLeft: userId === message.sender_id ? "auto !important" : 0,
                cursor: userId === message.sender_id ? "pointer" : "auto",
                ":hover": {
                    "& .MuiButtonBase-root": {
                        opacity: 1
                    }
                }
            }}

        >
            <SnackError errors={errors} />
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
            <div className='flex gap-x-2 items-end relative chat-msg'>
                <Avatar
                    sx={{ width: "25px", height: "25px", bgcolor: purple[500], p: 0 }}
                    alt={message.username}
                    src={message.userImage || "/"}
                />
                <Typography
                    variant='body1'
                    sx={{
                        bgcolor: userId === message.sender_id ? blue[400] : grey[400],
                        p: 1,
                        px: 2,
                        borderRadius: "12px",
                        fontSize: {
                            xs: "12px",
                            md: "14px"
                        },

                    }}

                >
                    <Linkify
                        componentDecorator={(decoratedHref, decoratedText, key) => (
                            <a href={decoratedHref} key={key} target="_blank" rel="noopener noreferrer">
                                {decoratedText}
                            </a>
                        )}
                    >
                        {message.content}
                    </Linkify>
                </Typography>

                {
                    userId === message.sender_id && <Button
                        size="small"
                        color="error"
                        onClick={onClick}
                        sx={{
                            position: "absolute",
                            top: "-6px",
                            right: "-2px",
                            width: "15px",
                            height: "15px",
                            borderRadius: "50%",
                            bgcolor: "#FFF",
                            minWidth: 0,
                            p: 0,
                            transition: "all 0.3s",
                            opacity: "0"
                        }}
                    >
                        <HighlightOffIcon sx={{ width: "20px" }} />
                    </Button>
                }
            </div>
        </Box>
    )
}

export default Message