import { Update, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./../../utilities/api"
import { CreateProjectDto, UpdateProjectDto } from "../../interfaces/space";

export const createProject = createAsyncThunk<
    {
        id: number,
        name: string
    },
    CreateProjectDto,
    {
        rejectValue: unknown
    }
>("spaces/createProject", async (body, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
        const { data } = await api.createProject(body)

        return data.project;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})

//update project
export const updateProject = createAsyncThunk<
    {
        id: number,
        data: UpdateProjectDto
    },
    {
        id: number,
        data: UpdateProjectDto
    },
    {
        rejectValue: unknown
    }
>("spaces/updateProject", async (body, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
        const { data } = await api.updateProject(body.data, body.id)

        return body
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})

//update project
export const deleteProject = createAsyncThunk<
    { id: number },
    { id: number },
    {
        rejectValue: unknown
    }
>("spaces/deleteProject", async (body, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
        await api.deleteProject(body.id)

        return body
    } catch (error) {
        return rejectWithValue(error)
    }
})