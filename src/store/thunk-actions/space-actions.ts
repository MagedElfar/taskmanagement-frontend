import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSpaceDto, Member, Space } from "../../interfaces/space";
import * as api from "./../../utilities/api"

//get user
export const getInitSpace = createAsyncThunk<
    {
        space: Space,
        team: Member[]
    },
    void,
    {
        rejectValue?: unknown
    }
>("spaces/getInitSpace", async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
        const { data } = await api.getInitSpace()

        console.log("data", data)
        return data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})

//get user
export const getSpace = createAsyncThunk<
    {
        space: Space,
        team: Member[]
    },
    number,
    {
        rejectValue: unknown
    }
>("spaces/getSpace", async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
        const { data } = await api.getSpace(id)

        return data;
    } catch (error) {
        return rejectWithValue(error)
    }
})

//create space
export const createSpace = createAsyncThunk<
    {
        space: Space,
        team: Member[]
    },
    createSpaceDto,
    {
        rejectValue: unknown
    }
>("spaces/createSpace", async (body, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
        const { data } = await api.createSpace(body)

        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})