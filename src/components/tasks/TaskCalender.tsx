import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { DatesSetArg, EventContentArg, EventInput } from '@fullcalendar/core';
import { ITask } from '../../interfaces/tasks';
import moment from 'moment';
import { getTasks } from '../../utilities/api';
import { useAppSelector } from '../../hooks/store.hook';
import TaskEvent from './TaskEvent';
import TaskRadio from './TaskRadio';
import { apiErrorFormat } from '../../utilities/error-format';
import SnackError from '../common/SnackError';

const TaskCalender = () => {

    const { space: { id: spaceId } } = useAppSelector(state => state)

    const [tasks, setTasks] = useState<ITask[]>([])
    const [fromDate, setFromDate] = useState<string>("")
    const [toDate, setToDate] = useState<string>("")
    const [errors, setErrors] = useState<string[]>([])
    const [view, setView] = useState("my-tasks")

    const handelDate = (arg: DatesSetArg) => {

        setFromDate(moment(arg.start).format("YYYY-MM-DD"))
        setToDate(moment(arg.end).format("YYYY-MM-DD"))

    }

    const tasksGet = async () => {
        try {
            console.log(view)
            const { data: { tasks } } = await getTasks(`?spaceId=${spaceId}&fromDate=${fromDate}&toDate=${toDate}${view === "my-tasks" ? "&user=true" : ""}`)
            setTasks(tasks.data)
        } catch (error) {
            setErrors(apiErrorFormat(error))
        }
    }

    const events: EventInput[] = tasks.map(task => ({
        title: task.title,
        date: moment(task.due_date).format("YYYY-MM-DD"),
        extendedProps: {
            customComponent: <TaskEvent task={task} key={task.id} />
        }

    }))

    const renderEventContent = (eventContent: EventContentArg) => {
        const { event } = eventContent;

        return event.extendedProps.customComponent;
    };

    useEffect(() => {
        if (!fromDate || !spaceId || !toDate) return;

        tasksGet()
    }, [spaceId, fromDate, toDate, view])

    return (
        <div>

            <SnackError errors={errors} />

            <TaskRadio value={view} onChange={(e) => setView(e)} />

            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                datesSet={handelDate}
                events={events}
                eventContent={renderEventContent}
            />
        </div>
    )
}


export default TaskCalender