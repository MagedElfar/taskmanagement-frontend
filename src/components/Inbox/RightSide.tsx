import React from 'react'
import { useAppSelector } from '../../hooks/store.hook'
import { Box, Divider } from '@mui/material'
import Contact from './Contact'
import ChatBox from './ChatBox'

const RightSide = () => {

    const { conversation } = useAppSelector(state => state)

    return (
        <Box height="100%">

            {conversation.currentChat ?
                <ChatBox conversation={conversation.currentChat} /> : null
            }
        </Box>
    )
}

export default RightSide