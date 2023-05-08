import React, { useEffect, useState } from 'react'
import { ITask } from '../../../../interfaces/tasks'
import style from "./TaskListView.module.css"
import { Link } from 'react-router-dom'
import TaskProgress from './TaskProgress'
import TaskPriority from './TaskPriority'
import moment from 'moment'

type props = {
    tasks: ITask[]
}

const TaskListView: React.FC<props> = ({ tasks }) => {
    const [taskList, setTask] = useState([])

    useEffect(() => {
        setTask(tasks)
    }, [tasks])

    return (
        <div className={style.table_container}>
            <table className={style.table}>
                <colgroup>
                    <col span={1} style={{ width: "45%" }} />
                    <col span={1} style={{ width: "15%" }} />
                    <col span={1} style={{ width: "20%" }} />
                    <col span={1} style={{ width: "20%" }} />
                </colgroup>
                <thead>
                    <tr>
                        <th>Task Name</th>
                        <th>Due Date</th>
                        <th>Task Progress</th>
                        <th>Task Priority</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        taskList.map((task: ITask) => {
                            return (
                                <tr key={task.id}>
                                    <td><Link className='w-full block' to={`/task/${task.id}`}>{task.title}</Link></td>
                                    <td> {task.due_date && moment(task.due_date).format("MMM DD")}</td>
                                    <td><TaskProgress taskId={task.id} status={task.status} /></td>
                                    <td><TaskPriority priority={task.priority} /></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TaskListView