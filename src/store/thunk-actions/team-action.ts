import { createAsyncThunk } from "@reduxjs/toolkit";
import { Space, Member, Project } from "../../interfaces/space";
import * as api from "./../../utilities/api"

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