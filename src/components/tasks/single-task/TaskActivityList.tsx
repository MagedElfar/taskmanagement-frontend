import { Avatar, IconButton, TextField, Toolbar, Tooltip, Typography } from '@mui/material'
import moment from 'moment'
import React, { useState } from 'react'
import { fullName } from '../../../utilities/helper'
import { IActivity } from '../../../interfaces/tasks'
import { purple } from '@mui/material/colors'
import { useAppSelector } from '../../../hooks/store.hook';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useTaskContext } from '../../../hooks/taskContext'
import FullPageLoading from '../../common/loading/FullPageLoading'
import SnackError from '../../common/SnackError'
import { deleteComment, updateComment } from '../../../utilities/api'
import { apiErrorFormat } from '../../../utilities/error-format'

type props = {
    activity: IActivity
}

const TaskActivityList: React.FC<props> = ({ activity }) => {

    const { setActivities } = useTaskContext()

    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])

    const { user: { user: { id: userId } } } = useAppSelector(state => state);

    const [comment, setComment] = useState(activity.activity)

    const [edit, setEdit] = useState(false)

    const deleteComments = async () => {
        try {
            setLoading(true)

            await deleteComment(activity.id)

            setActivities((s: IActivity[]) => {
                return s.filter((item: IActivity) => item.id !== activity.id)
            })

        } catch (error) {
            console.log(error)
            setErrors(apiErrorFormat(error))
        } finally {
            setLoading(false)
        }
    }

    const onBlur = async () => {
        try {
            setLoading(true)

            await updateComment(activity.id, { activity: comment })

            setActivities((s: IActivity[]) => {
                return s.map((item: IActivity) => {
                    if (item.id === activity.id) {
                        item.activity = comment
                    }

                    return item
                })
            })

            setEdit(!edit)

        } catch (error) {
            setErrors(apiErrorFormat(error))
        } finally {
            setLoading(false)
        }
    }

    const user1 = fullName({
        username: activity.user1,
        first_name: activity.user1FirstName,
        last_name: activity.user1LastName
    })

    const user2 = fullName({
        username: activity.user2,
        first_name: activity.user2FirstName,
        last_name: activity.user2LastName
    })


    return (
        <>
            {
                activity.type === "comment" ?
                    <div className='w-full'>
                        <FullPageLoading loading={loading} />
                        <SnackError errors={errors} />
                        <div className='flex items-center'>
                            <Avatar
                                sx={{ width: "35px", height: "35px", bgcolor: purple[500], p: 0 }}
                                alt={activity.userImage}
                                src={activity.userImage || "/"}
                            />

                            <Typography ml={1} textTransform="capitalize" component="span" fontSize="16px" fontWeight="600">
                                {user1}
                            </Typography>


                            <Typography ml={2} component="span" fontSize="12px">
                                {moment(activity.created_at).fromNow()}
                            </Typography>
                            {activity.user1_Id === userId && <div className='flex ml-3'>
                                <Tooltip title="Edit" onClick={() => setEdit(!edit)}>
                                    <IconButton color='info'>
                                        <EditIcon sx={{ width: "20px" }} />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Delete" onClick={() => deleteComments()}>
                                    <IconButton color='error'>
                                        <DeleteIcon sx={{ width: "20px" }} />
                                    </IconButton>
                                </Tooltip>
                            </div>}

                        </div>

                        <div className='flex items-center p-4'>
                            {
                                edit ?
                                    <TextField
                                        onBlur={onBlur}
                                        multiline
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        fullWidth
                                    />
                                    :
                                    <Typography component="span" fontSize="14px">
                                        {activity.activity}
                                    </Typography>
                            }

                        </div>
                    </div>

                    :
                    <>
                        <Typography component="span" fontSize="12px">
                            <span className='capitalize'>{user1} </span>
                            {activity.activity}
                            <span className='capitalize'> {`${activity.user2 ? user2 : ""}`}</span>
                        </Typography>
                        <Typography ml={2} component="span" fontSize="12px">
                            {moment(activity.created_at).fromNow()}
                        </Typography>
                    </>
            }
        </>
    )
}

export default TaskActivityList