import React, { useState } from 'react'
import { apiErrorFormat } from '../../utilities/error-format';
import SendIcon from '@mui/icons-material/Send';
import { Button, CircularProgress } from '@mui/material';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import SnackError from '../common/SnackError';
import { IMessage } from '../../interfaces/inbox';
import { sendMessage } from '../../utilities/api';

type props = {
    setMessages: (message: IMessage) => void,
    conversation: number
}

const SendMessage: React.FC<props> = ({ setMessages, conversation }) => {
    const [message, setMessage] = useState<string>("");
    const [errors, setErrors] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)

    const handleEmojiSelect = (emoji: any) => {
        setMessage(message + emoji.native)
        setShowEmojiPicker(false)
    }


    const onSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault()
            setLoading(true)

            const { data } = await sendMessage({
                content: message,
                conversation_id: conversation
            })

            // setMessages(data.message)

            setMessage("")

        } catch (error) {
            setErrors(apiErrorFormat(error))
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='send-message-container'>
            {
                showEmojiPicker && <div className='emoji-container'>
                    <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                </div>
            }

            <SnackError errors={errors} />
            <form onSubmit={onSubmit}>
                <textarea
                    placeholder='write a message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onClick={() => setShowEmojiPicker(false)}
                >
                </textarea>
                <div className='flex justify-end mt-2 gap-x-2'>
                    <button type='button' onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                        🙂
                    </button>
                    <Button
                        type='submit'
                        disabled={!message || loading ? true : false}
                        size='small' variant="contained"
                        endIcon={
                            loading ?
                                <CircularProgress sx={{
                                    width: "15px !important",
                                    height: "15px !important",
                                }} />
                                : <SendIcon />
                        }
                    >
                        Send
                    </Button>
                </div>
            </form>

        </div>
    )
}

export default SendMessage