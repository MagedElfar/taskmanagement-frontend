import React, { useState } from 'react'
import AssigneeButton from '../AssigneeButton'
import { ITask } from '../../../interfaces/tasks'
import { Member } from '../../../interfaces/space'
import { useAppDispatch, useAppSelector } from '../../../hooks/store.hook'
import { assignTask, unassignTask } from '../../../store/thunk-actions/task-actions'
import { useTaskContext } from '../../../hooks/taskContext'

type props = {
    task: ITask,
}

const TaskAssign: React.FC<props> = ({ task }) => {
    const dispatch = useAppDispatch()

    const { user: { user: { username } } } = useAppSelector(state => state)

    const { setActivities } = useTaskContext()

    const [assignId, setAssignId] = useState<number | null>(task.assignId)
    const [member, setMember] = useState<Partial<Member> | null>(task.assignId ? {
        userImage: task.assignToImage_url,
        username: task.assignToUserName,
    } : null)

    const updateAssignee = (member: Partial<Member>) => {
        if (assignId) return
        dispatch(assignTask({
            memberId: member.id,
            taskId: task.id
        })).unwrap()
            .then((data) => {
                setMember({
                    id: member.id,
                    userImage: data.url,
                    username: data.username,
                })
                setAssignId(data.id)
                setActivities((s: any) => ([
                    {
                        id: 0,
                        user1: username,
                        user2: member.username,
                        activity: "Assign The Task To",

                    }, ...s
                ]))

            })
    }

    const unAssignee = () => {
        dispatch(unassignTask({
            id: assignId,
            taskId: task.id
        })).unwrap()
            .then(() => {
                setAssignId(null);
                setMember(null)
                setActivities((s: any) => ([
                    {
                        id: 0,
                        user1: username,
                        user2: member.username,
                        activity: "Unassign The Task To",

                    }, ...s
                ]))
            })
    }


    return (
        <AssigneeButton
            updateAssignee={updateAssignee}
            member={member}
            unAssignee={unAssignee}
        />
    )
}

export default TaskAssign