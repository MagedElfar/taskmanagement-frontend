import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./../../utilities/api"
import { CreateProjectDto } from "../../interfaces/space";

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