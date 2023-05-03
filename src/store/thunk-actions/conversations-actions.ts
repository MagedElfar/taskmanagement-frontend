import { Update, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./../../utilities/api"
import { CreateProjectDto, UpdateProjectDto } from "../../interfaces/space";
import { IConnection } from "../../interfaces/inbox";

export const getContacts = createAsyncThunk<
    IConnection[],
    void,
    {
        rejectValue: unknown
    }
>("conversations/getContacts", async (body, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
        const { data } = await api.getContacts()

        return data.conversations;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})