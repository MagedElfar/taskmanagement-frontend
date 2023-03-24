import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./../../utilities/api"

const login = createAsyncThunk("auth/login", async (credentials: { email: string, password: string }, thunkApi: any) => {
    const { rejectWithValue } = thunkApi;
    try {
        const { data } = await api.login(credentials);
        return data;
    } catch (error) {
        return rejectWithValue(error)
    }
})

const initialState = {
    loading: false,
    errors: [],
}

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: {}
})

export default slice.reducer;