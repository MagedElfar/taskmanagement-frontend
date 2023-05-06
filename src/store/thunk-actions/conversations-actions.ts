import { Update, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./../../utilities/api"
import { CreateProjectDto, UpdateProjectDto } from "../../interfaces/space";
import { IConnection } from "../../interfaces/inbox";

export const getContacts = createAsyncThunk<
    {
        conversations: IConnection[],
        unreadCount: number
    },
    void,
    {
        rejectValue: unknown
    }
>("conversations/getContacts", async (body, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
        const { data } = await api.getContacts()

        return data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})


export const addContact = createAsyncThunk<
    {
        contact: IConnection,
    },
    { userId: number },
    {
        rejectValue: unknown
    }
>("conversations/addContact", async (body, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
        const { data } = await api.createContacts(body)

        return data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})

export const markMessagesRead = createAsyncThunk<
    number,
    number,
    {
        rejectValue: unknown
    }
>("conversations/markRead", async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
        await api.markMessageRead(id)

        return id;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})