import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSpaceDto, Member, Project, Space } from "../../interfaces/space";
import * as api from "./../../utilities/api"
import { AppDispatch, RootState } from "..";
import { getTasks } from "./task-actions";
import socket from "../../utilities/socket";

//get user
export const getInitSpace = createAsyncThunk<
    {
        space: Space,
        team: Member[],
        projects: Project[]
    },
    void,
    {
        state: RootState,
        rejectValue?: unknown,
        dispatch: AppDispatch
    }
>("spaces/getInitSpace", async (_, thunkApi) => {
    const { rejectWithValue, dispatch, getState } = thunkApi;
    try {
        const { data } = await api.getInitSpace();
        dispatch(getTasks(data.space.id));

        const state = getState();

        socket.emit("newContact", {
            spaceId: data.space.id,
            userId: state.user.user.id
        })

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
        team: Member[],
        projects: Project[]
    },
    number,
    {
        state: RootState,
        rejectValue: unknown,
        dispatch: AppDispatch
    }
>("spaces/getSpace", async (id, thunkApi) => {
    const { rejectWithValue, dispatch, getState } = thunkApi;
    try {
        const { data } = await api.getSpace(id)

        dispatch(getTasks(data.space.id))

        const state = getState()

        socket.emit("newContact", {
            spaceId: data.space.id,
            userId: state.user.user.id
        })

        return data;
    } catch (error) {
        return rejectWithValue(error)
    }
})

//update space
export const updateSpace = createAsyncThunk<
    {
        name: string,
    },
    {
        id: number,
        name: string
    },
    {
        rejectValue?: unknown
    }
>("spaces/updateSpace", async ({ id, name }, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
        await api.updateSpace(id, { name })

        return { name };
    } catch (error) {
        return rejectWithValue(error)
    }
})

//create space
export const createSpace = createAsyncThunk<
    {
        space: Space,
        team: Member[],
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