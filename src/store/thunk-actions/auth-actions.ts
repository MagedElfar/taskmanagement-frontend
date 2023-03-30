import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginCredentials, SignupCredentials } from "../../interfaces/auth";
import { User } from "../../interfaces/user";
import * as api from "./../../utilities/api"

//login
export const login = createAsyncThunk<
    {
        user: User,
        accessToken: string
    },
    LoginCredentials,
    {
        rejectValue?: unknown
    }
>("auth/login", async (credentials, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
        const { data } = await api.login(credentials);
        localStorage.setItem("token", JSON.stringify(data.accessToken))
        return data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})

//sign up
export const signup = createAsyncThunk<
    {
        user: User,
        accessToken: string
    },
    {
        credentials: SignupCredentials,
        query?: string
    },
    {
        rejectValue?: unknown
    }
>("auth/signup", async ({ credentials, query = "" }, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
        const { data } = await api.signup(credentials, query);
        localStorage.setItem("token", JSON.stringify(data.accessToken))
        return data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})

//login
export const logout = createAsyncThunk<
    void,
    void,
    {
        rejectValue?: unknown
    }
>("auth/logout", async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
        await api.logout();
        localStorage.clear()
        return;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})