import React, { useEffect, useRef, useState } from 'react'
import { IConnection, IMessage } from '../../interfaces/inbox'
import { Box, Divider, Stack } from '@mui/material'
import Contact from './Contact'
import { apiErrorFormat } from '../../utilities/error-format'
import { getMessages } from '../../utilities/api'
import SnackError from '../common/SnackError'
import Message from './Message'
import { useAppDispatch, useAppSelector } from '../../hooks/store.hook'
import SendMessage from './SendMessage'
import socket from '../../utilities/socket'
import { markMessagesRead } from '../../store/thunk-actions/conversations-actions'

type props = {
    conversation: IConnection
}

const ChatBox: React.FC<props> = ({ conversation }) => {
    const { user: { user: { id: userId } } } = useAppSelector(state => state);

    const [messages, setMessages] = useState<IMessage[]>([])
    const [offset, setOffset] = useState(0)
    const [maxOffset, setMaxOffset] = useState(0)
    const [errors, setErrors] = useState<string[]>([])

    const dispatch = useAppDispatch()

    const getConversationMessages = async () => {
        try {

            const { data } = await getMessages(conversation.conversation_id, offset)

            setMessages(s => [...s, ...data.messages.messages])

            setMaxOffset(Math.ceil(data.messages.count / 10))


        } catch (error) {
            setErrors(apiErrorFormat(error))
        }
    }

    const updateMassage = (message: IMessage) => {
        setMessages(s => [message, ...s])
    }

    function handleScroll(e: React.UIEvent<HTMLDivElement>) {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;



        if (Math.floor(scrollHeight + scrollTop) - 20 <= clientHeight && maxOffset > offset) {
            setOffset(s => s + 1);
        }
    }

    useEffect(() => {
        socket.on("newMessage", (data) => {
            setMessages(s => [data, ...s])
        })

        socket.on("deleteMessage", (data) => {
            setMessages(s => s.filter((message) => message.id !== data.id))
        })
    }, [])


    useEffect(() => {

        setOffset(0);
        setMaxOffset(0);
        setMessages([])

        if (conversation.unread_count > 0) dispatch(markMessagesRead(conversation.conversation_id))

        socket.emit("joinChatRoom", {
            chatId: conversation.conversation_id
        });

        return () => {
            socket.emit("leaveChatRoom", {
                chatId: conversation.conversation_id
            });
        }

    }, [conversation.conversation_id])

    useEffect(() => {

        if (offset === 0) {
            setOffset(1);
            return;
        }

        getConversationMessages()

    }, [offset])


    return (
        <Box height="100%" width="100%">
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
                onScroll={handleScroll}
            >
                {messages.map(message => <Message key={message.id} message={message} userId={+userId!} />)}
            </Stack>

            <SendMessage setMessages={updateMassage} conversation={conversation.conversation_id} />
        </Box>
    )
}

export default ChatBox