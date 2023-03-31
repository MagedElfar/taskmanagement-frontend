import { createAsyncThunk } from "@reduxjs/toolkit";
import { Space, Member, Project } from "../../interfaces/space";
import * as api from "./../../utilities/api"
import { number } from "yup";

//update space
export const addMember = createAsyncThunk<
    {
        space: Space,
        team: Member[],
        projects: Project[],
        member: Member
    }
    ,
    { query: string },
    {
        rejectValue?: unknown
    }
>("spaces/addMember", async (body, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
        const { data } = await api.acceptInvite(body.query)

        return data
    } catch (error) {
        return rejectWithValue(error)
    }
})

//update space
export const updateMember = createAsyncThunk<
    {
        memberId: number,
        role: string
    }
    ,
    {
        memberId: number,
        role: string
    },
    {
        rejectValue?: unknown
    }
>("spaces/updateMember", async ({ memberId, role }, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
        await api.updateMember(memberId, role)

        return { memberId, role }
    } catch (error) {
        return rejectWithValue(error)
    }
})

//update space
export const deleteMember = createAsyncThunk<
    {
        memberId: number,
    }
    ,
    {
        memberId: number,
    },
    {
        rejectValue?: unknown
    }
>("spaces/deleteMember", async ({ memberId }, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
        await api.deleteMember(memberId)

        return { memberId }
    } catch (error) {
        return rejectWithValue(error)
    }
})