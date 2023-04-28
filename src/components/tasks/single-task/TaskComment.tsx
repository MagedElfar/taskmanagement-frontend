import { Style } from '@mui/icons-material'
import { Box, Button, CircularProgress, Divider, InputAdornment, TextField } from '@mui/material'
import React, { useRef, useState } from 'react'
import CommentIcon from '@mui/icons-material/Comment';
import useOutsideAlerter from '../../../hooks/useOutsideAlerter';
import { addComment } from '../../../utilities/api';
import { apiErrorFormat } from '../../../utilities/error-format';
import SnackError from '../../common/SnackError';
import { IActivity, ITask } from '../../../interfaces/tasks';
import { useTaskContext } from '../../../hooks/taskContext';

type props = {
    task: ITask,
}
const TaskComment: React.FC<props> = ({ task }) => {

    const { setActivities } = useTaskContext()

    const [comment, setComment] = useState("")
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const [maxHeight, setMaxHeight] = useState("56px")

    const onSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault()
            if (!comment) {
                setMaxHeight("56px")
                return
            }
            setLoading(true)
            setErrors([])
            const { data: { comment: activity } } = await addComment({
                taskId: task.id,
                activity: comment
            })
            setActivities((s: IActivity[]) => [
                {
                    id: activity.id,
                    activity: activity.activity,
                    user1: activity.user1,
                    user1FirstName: activity.user1FirstName,
                    user1LastName: activity.user1LastName,
                    userImage: activity.userImage,
                    user1_Id: activity.user1_Id,
                    type: "comment"
                }, ...s
            ])
            setMaxHeight("56px")
            setComment("")
        } catch (error) {

            setErrors(apiErrorFormat(error))
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box
            px={3}
            position="absolute"
            bottom="0"
            right="0"
            width="50%"
            maxHeight={maxHeight}
            height="auto"
            zIndex={99999}
            bgcolor="#EFF0F3"
            overflow="hidden"
            sx={{
                transition: "max-height 0.3s",
                // display: "flex",
                // alignItems: "flex-end"
            }}

        >
            <SnackError errors={errors} />
            <form
                onSubmit={onSubmit}
                className='w-full'
            // onBlur={() => setMaxHeight("56px")}
            >
                <TextField
                    onFocus={() => setMaxHeight("500px")}
                    name='comment'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder='Comment...'
                    fullWidth
                    multiline
                    InputProps={{
                        style: {
                            alignItems: "flex-start"
                        },
                        endAdornment: <InputAdornment position="start" sx={{ pt: 2 }}  >
                            {
                                maxHeight === "56px" ? <CommentIcon /> : <CommentIcon />
                            }

                        </InputAdornment>,
                    }}
                    rows={8}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                border: "none",
                                borderColor: '#000',
                            },
                            '&:hover fieldset': {
                                borderColor: '#000',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#000',
                            },
                        },

                    }}
                />

                <Divider />

                <div className='flex justify-end py-3'>
                    <Button
                        type="submit"
                        size='small'
                        variant="contained"
                    >
                        {comment ? <>
                            comment
                            {loading && <CircularProgress
                                size={22}
                                sx={{
                                    color: "#fff",
                                    marginLeft: 2
                                }}
                            />}
                        </> : "close"}
                    </Button>
                </div>

            </form>
        </Box>
    )
}

export default TaskComment