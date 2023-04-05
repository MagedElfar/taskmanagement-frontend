import { number } from 'yup';
import { RootState } from './../index';
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./../../utilities/api"
import { CreateTaskDto, ITask } from "../../interfaces/tasks";


export const getTasks = createAsyncThunk<
    ITask[],
    number,
    {
        rejectValue: unknown,
    }
>("task/getTasks", async (spaceId, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
        const { data } = await api.getTasks(`?spaceId=${spaceId}&orderBy=position&order=asc`)

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