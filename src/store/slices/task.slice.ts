import { Member, Project } from '../../interfaces/space';
import { createSlice } from "@reduxjs/toolkit";
import { apiErrorFormat } from "../../utilities/error-format";
import { ITask } from '../../interfaces/tasks';
import { createTask, getTasks, updateTaskStatus } from '../thunk-actions/task-actions';


const initialState = {
    loading: false,
    errors: [] as string[],
    tasks: [] as ITask[]

}

const slice = createSlice({
    name: "task",
    initialState,
    reducers: {
        localUpdate(state, { payload: { newArr, index, position, currentPosition } }) {


            const direction = position > currentPosition ? "down" : "up";
            newArr[index].position = 0;

            const tasks = newArr.map((task: ITask, index: number) => {

                if (direction === "up" && task.position >= position && task.position < currentPosition) {
                    return {
                        ...task,
                        position: task.position - 1
                    }
                } else if (direction === "down" && task.position > currentPosition && task.position <= position) {

                    return {
                        ...task,
                        position: task.position - 1
                    }
                }
                return task
            })

            tasks[index].position = position;

            console.log(tasks)

            state.tasks = tasks
        }
    },
    extraReducers: (builder) => {
        //get tasks
        builder.addCase(getTasks.fulfilled, (state, action) => {
            state.tasks = action.payload

        })

        //create task
        builder.addCase(createTask.pending, (state, action) => {
            state.errors = [];
            state.loading = true
        })

        builder.addCase(createTask.fulfilled, (state, action) => {
            state.tasks = [...state.tasks, action.payload]
            state.loading = false

        })

        builder.addCase(createTask.rejected, (state, action) => {
            state.loading = false;
            state.errors = apiErrorFormat(action.payload);
        })

        //update task status
        builder.addCase(updateTaskStatus.pending, (state, action) => {
            state.errors = [];
            state.loading = true
        })

        builder.addCase(updateTaskStatus.fulfilled, (state, action) => {
            state.tasks = state.tasks.map((task: ITask) => {
                if (task.id === action.payload.id) {
                    task.status = action.payload.status;
                }

                return task
            })
            state.loading = false

        })

        builder.addCase(updateTaskStatus.rejected, (state, action) => {
            state.loading = false;
            state.errors = apiErrorFormat(action.payload);
        })

        // //delete project
        // builder.addCase(deleteProject.pending, (state, action) => {
        //     state.errors = [];
        //     state.loading = true
        // })

        // builder.addCase(deleteProject.fulfilled, (state, action) => {
        //     state.projects = state.projects.filter((project: Project) => project.id !== action.payload.id)
        //     state.loading = false

        // })

        // builder.addCase(deleteProject.rejected, (state, action) => {
        //     state.loading = false;
        //     state.errors = apiErrorFormat(action.payload);
        // })
    }
})

const { localUpdate } = slice.actions;

export { localUpdate }

export default slice.reducer;