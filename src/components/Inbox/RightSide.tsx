import React, { useContext } from 'react'
import { useAppSelector } from '../../hooks/store.hook'
import { Box, IconButton, Tooltip, useMediaQuery } from '@mui/material'
import ChatBox from './ChatBox'
import MenuIcon from '@mui/icons-material/Menu';
import { MyContext } from '../../routes/Inbox'

const RightSide = () => {

    const { conversation } = useAppSelector(state => state)
    const isMobile = useMediaQuery('(max-width:1024px)');

    const { setOpen } = useContext(MyContext)

    return (
        <Box height="100%" position="relative">

            {isMobile && <Box
                component="div"
                position="absolute"
                top="16px"
                right="16px"
                zIndex="99"
            >
                <Tooltip title="back to contacts">
                    <IconButton onClick={setOpen}>
                        <MenuIcon />
                    </IconButton>
                </Tooltip>
            </Box>}

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