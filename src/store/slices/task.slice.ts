import { createSlice } from "@reduxjs/toolkit";
import { apiErrorFormat } from "../../utilities/error-format";
import { ITask } from '../../interfaces/tasks';
import { assignTask, createTask, deleteTask, getTasks, unassignTask, updateTask, updateTaskStatus, uploadAttachment } from '../thunk-actions/task-actions';


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
        },
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

        //update task
        builder.addCase(updateTask.pending, (state, action) => {
            state.errors = [];
            state.loading = true
        })

        builder.addCase(updateTask.fulfilled, (state, action) => {
            state.tasks = state.tasks.map((task: ITask) => {
                if (task.id === action.payload.id) {
                    return {
                        ...task,
                        ...action.payload
                    }
                } else {
                    return task
                }

            })
            state.loading = false

        })

        builder.addCase(updateTask.rejected, (state, action) => {
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

        //delete task
        builder.addCase(deleteTask.pending, (state, action) => {
            state.errors = [];
            state.loading = true
        })

        builder.addCase(deleteTask.fulfilled, (state, action) => {
            state.tasks = state.tasks.filter((task: ITask) => task.id !== action.payload)
            state.loading = false

        })

        builder.addCase(deleteTask.rejected, (state, action) => {
            state.loading = false;
            state.errors = apiErrorFormat(action.payload);
        })

        //assign task
        builder.addCase(assignTask.pending, (state, action) => {
            state.errors = [];
            state.loading = true
        })

        builder.addCase(assignTask.fulfilled, (state, action) => {
            state.tasks = state.tasks.map((task: ITask) => {
                if (task.id === action.payload.taskId) {
                    task.assignId = action.payload.id;
                    task.assignToImage_url = action.payload.url;
                    task.assignToUserName = action.payload.username
                }

                return task
            })
            state.loading = false

        })

        builder.addCase(assignTask.rejected, (state, action) => {
            state.loading = false;
            state.errors = apiErrorFormat(action.payload);
        })

        //unassign task
        builder.addCase(unassignTask.pending, (state, action) => {
            state.errors = [];
            state.loading = true
        })

        builder.addCase(unassignTask.fulfilled, (state, action) => {
            state.tasks = state.tasks.map((task: ITask) => {
                if (task.id === action.payload) {
                    task.assignId = null;
                    task.assignToImage_url = null;
                    task.assignToUserName = null
                }

                return task
            })
            state.loading = false

        })

        builder.addCase(unassignTask.rejected, (state, action) => {
            state.loading = false;
            state.errors = apiErrorFormat(action.payload);
        })

        //upload attachment
        builder.addCase(uploadAttachment.pending, (state, action) => {
            state.errors = [];
            state.loading = true
        })

        builder.addCase(uploadAttachment.fulfilled, (state, action) => {
            state.tasks = state.tasks.map((task: ITask) => {
                if (task.id === action.payload.taskId) {
                    const length = action.payload.attachments.length
                    task.taskMedia = action.payload.attachments[length - 1].url
                }

                return task

            })
            state.loading = false

        })

        builder.addCase(uploadAttachment.rejected, (state, action) => {
            state.loading = false;
            state.errors = apiErrorFormat(action.payload);
        })
    }
})

const { localUpdate } = slice.actions;

export { localUpdate }

export default slice.reducer;