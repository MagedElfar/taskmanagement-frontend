import { createAsyncThunk } from "@reduxjs/toolkit";
import { Space } from "../../interfaces/space";
import * as api from "./../../utilities/api"

//get user
export const getInitSpace = createAsyncThunk<
    {
        space: Space
    },
    void,
    {
        rejectValue?: unknown
    }
>("spaces/getInitSpace", async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
        const { data } = await api.getInitSpace()
        return data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})