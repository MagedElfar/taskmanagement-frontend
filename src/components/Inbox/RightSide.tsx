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
                <ChatBox conversation={conversation.currentChat} />
                :
                <Box
                    height="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    p={3}
                >
                    you don't have any contact please create one to start chat...
                </Box>
            }
        </Box>
    )
}

export default RightSide