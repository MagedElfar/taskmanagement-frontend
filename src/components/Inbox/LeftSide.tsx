import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../../hooks/store.hook'
import Contact from './Contact'
import NewChat from './NewChat'

const LeftSide = () => {
    const { conversation } = useAppSelector(state => state)

    return (
        <Box>
            <div>
                <Typography
                    component="h4"
                    sx={{
                        fontSize: "16px",
                        fontWeight: 600
                    }}
                >
                    Contacts
                </Typography>
            </div>

            <Stack py={2} spacing={2}>
                <NewChat />
                {conversation.connection.map(contact => <div key={contact.id}><Contact contact={contact} /></div>)}
            </Stack>
        </Box>
    )
}

export default LeftSide