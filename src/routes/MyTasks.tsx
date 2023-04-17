import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../hooks/store.hook'
import TasksGrid from '../components/tasks/task-view/TasksGrid';
import { ITask } from '../interfaces/tasks';

const MyTasks = () => {
    const { task: { tasks, view }, space: { team }, user: { user: { id } } } = useAppSelector(state => state);

    const [member, setMember] = useState(null)

    useEffect(() => {
        setMember(team.find(item => item.userId === id))
    }, [team])

    return (
        <div>
            {
                view === "list" ?
                    <TasksGrid tasks={tasks.filter(task => task.assignIdMember === member?.id)} />
                    :
                    <TasksGrid tasks={tasks.filter(task => task.assignIdMember === member?.id)} />
            }
        </div>
    )
}

export default MyTasks