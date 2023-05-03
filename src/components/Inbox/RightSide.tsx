import React from 'react'
import { useAppSelector } from '../../hooks/store.hook'
import { Box, Divider } from '@mui/material'
import Contact from './Contact'

const RightSide = () => {

    const { conversation } = useAppSelector(state => state)

    return (
        <Box>

            {conversation.currentChat ? <Contact contact={conversation.currentChat} isHeader={true} /> : null}
            <Divider />
        </Box>
    )
}

export default RightSide