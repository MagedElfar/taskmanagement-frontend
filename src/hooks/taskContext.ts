import { createContext, useContext } from "react"
import { IActivity } from "../interfaces/tasks"
export type TaskContent = {
    activities: IActivity[]
    setActivities: (activity: any) => void
}
export const TaskContext = createContext<TaskContent>({
    activities: [], // set a default value
    setActivities: () => { }
})

export const useTaskContext = () => useContext(TaskContext)

