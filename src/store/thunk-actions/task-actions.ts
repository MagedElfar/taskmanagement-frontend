import { number, object } from 'yup';
import { RootState } from './../index';
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./../../utilities/api"
import { CreateTaskDto, ITask } from "../../interfaces/tasks";
import socket from '../../utilities/socket';


export const getTasks = createAsyncThunk<
    ITask[],
    number,
    {
        rejectValue: unknown,
    }
>("task/getTasks", async (spaceId, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
        const { data } = await api.getTasks(`?spaceId=${spaceId}&orderBy=position&order=asc&is_archived=0`)

        return data.tasks.data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})

export const createTask = createAsyncThunk<
    ITask,
    CreateTaskDto,
    {
        rejectValue: unknown
    }
>("task/createTask", async (body, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
        const { data } = await api.createTask(body)

        socket.emit("createTask", data.task)

        return data.task;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})

export const updateTaskStatus = createAsyncThunk<
    {
        id: number,
        status: string
    },
    {
        id: number,
        status: string
    }, {
        rejectValue: unknown
    }
>("task/updateTaskStatus", async (data, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
        await api.updateTaskStatus(data.id, { status: data.status })

        return data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})

export const updateTask = createAsyncThunk<
    Partial<ITask>,
    {
        id: number,
        data: Partial<ITask>
    }
    , {
        rejectValue: unknown,
        state: RootState
    }
>("task/updateTask", async (body, thunkApi) => {
    const { rejectWithValue, getState } = thunkApi;
    try {
        let key;


        const state = getState()

        Object.keys(body.data).forEach(item => key = item);

        if (key === "is_complete") {
            const { data } = await api.markTaskComplete(body.id);

            socket.emit("updateTask", {
                id: body.id,
                is_complete: body.data.is_complete,
                spaceId: + state.space.id
            });

            return { id: body.id, is_complete: body.data.is_complete }
        } else {
            const { data } = await api.updateTask(body.id, {
                ...body.data,
                spaceId: +state.space.id
            });

            socket.emit("updateTask", data.task)


            return data.task;
        }


    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})

export const deleteTask = createAsyncThunk<
    number
    ,
    number
    , {
        state: RootState,
        rejectValue: unknown
    }
>("task/deleteTask", async (data, thunkApi) => {
    const { rejectWithValue, getState } = thunkApi;
    try {
        const state = getState()
        await api.deleteTask(data)

        socket.emit("deleteTask", {
            spaceId: state.space.id,
            taskId: data
        })

        return data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})

export const assignTask = createAsyncThunk<
    {
        id: number,
        username: string,
        url: string,
        taskId: number,
        memberId: number
    },
    {
        taskId: number,
        memberId: number
    }
    , {
        state: RootState
        rejectValue: unknown
    }
>("task/assignTask", async (body, thunkApi) => {
    const { rejectWithValue, getState } = thunkApi;
    try {
        const state = getState()

        const { data } = await api.assignTask({ taskId: body.taskId, memberId: body.memberId })

        socket.emit("updateTask", {
            id: body.taskId,
            memberId: body.memberId,
            assignId: data.assign.id,
            assignToImage_url: data.assign.url,
            assignToUserName: data.assign.username,
            assignIdMember: data.assign.memberId,
            spaceId: + state.space.id
        });

        return {
            ...data.assign,
            taskId: body.taskId,
            memberId: body.memberId
        }
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})


export const unassignTask = createAsyncThunk<
    number,
    {
        id: number,
        taskId: number
    }
    , {
        rejectValue: unknown
    }
>("task/unassignTask", async (data, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
        console.log(data)
        await api.unassignTask(data.id)

        return data.taskId;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})

export const uploadAttachment = createAsyncThunk<
    {
        taskId: number,
        attachments: { id: number, url: string }[]
    },
    { taskId: number, file: any }
    , {
        rejectValue: unknown,
        state: RootState
    }
>("task/uploadAttachment", async (body, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
        const formData = new FormData();

        for (const key of Object.keys(body.file)) {
            formData.append('file', body.file[key])
        }
        formData.append("taskId", `${body.taskId}`)

        const { data } = await api.uploadAttachment(formData)
        return {
            taskId: body.taskId,
            attachments: data.attachments
        };

    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})

export const archiveTask = createAsyncThunk<
    {
        task: ITask
    },
    {
        task: ITask
    }
    , {
        rejectValue: unknown
    }
>("task/archiveTask", async (data, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
        await api.archiveTask(data.task.id)

        return data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})