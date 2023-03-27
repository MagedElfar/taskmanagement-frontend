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
    SignupCredentials,
    {
        rejectValue?: unknown
    }
>("auth/signup", async (credentials, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
        const { data } = await api.signup(credentials);
        localStorage.setItem("token", JSON.stringify(data.accessToken))
        return data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})