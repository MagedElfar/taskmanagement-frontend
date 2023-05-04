import React, { useEffect, useState } from 'react'
import { IConnection, IMessage } from '../../interfaces/inbox'
import { Box, Divider, Stack } from '@mui/material'
import Contact from './Contact'
import { apiErrorFormat } from '../../utilities/error-format'
import { getMessages } from '../../utilities/api'
import SnackError from '../common/SnackError'
import Message from './Message'
import { useAppSelector } from '../../hooks/store.hook'
import SendMessage from './SendMessage'
import socket from '../../utilities/socket'

type props = {
    conversation: IConnection
}

const ChatBox: React.FC<props> = ({ conversation }) => {
    const { user: { user: { id: userId } } } = useAppSelector(state => state);

    const [messages, setMessages] = useState<IMessage[]>([])
    const [errors, setErrors] = useState<string[]>([])

    const getConversationMessages = async () => {
        try {
            const { data } = await getMessages(conversation.conversation_id, 1)

            setMessages(data.messages.messages)

        } catch (error) {
            setErrors(apiErrorFormat(error))
        }
    }

    const updateMassage = (message: IMessage) => {
        setMessages(s => [message, ...s])
    }

    useEffect(() => {
        socket.on("newMessage", (data) => {
            setMessages(s => [data, ...s])
        })
    }, [])

    useEffect(() => {
        socket.emit("joinChatRoom", {
            chatId: conversation.conversation_id
        });

        return () => {
            console.log("leave-room")
            socket.emit("leaveChatRoom", {
                chatId: conversation.conversation_id
            });
        }

    }, [conversation.conversation_id])

    useEffect(() => {
        getConversationMessages()
    }, [conversation.conversation_id])

    console.log(messages)

    return (
        <Box height="100%">
            <SnackError errors={errors} />
            <Contact contact={conversation} isHeader={true} />
            <Divider />

            <Stack
                width="100%"
                flexDirection="column-reverse"
                gap="24px"
                p={3}
                height="60%"
                overflow="auto"
            >
                {messages.map(message => <Message key={message.id} message={message} userId={+userId!} />)}
            </Stack>

            <SendMessage setMessages={updateMassage} conversation={conversation.conversation_id} />
        </Box>
    )
}

export default ChatBox