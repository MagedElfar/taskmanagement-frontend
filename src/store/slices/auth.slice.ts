import { LoginCredentials, SignupCredentials } from './../../interfaces/auth';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../interfaces/user";
import * as api from "./../../utilities/api"
import { apiErrorFormat } from '../../utilities/error-format';
import { createUserProfile } from './user.slice';

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

const initialState = {
    loading: false,
    errors: [],
    step: 3
}

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //login
        builder.addCase(login.pending, (state, action) => {
            state.loading = true;
            state.errors = []
        });

        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
        });

        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.errors = apiErrorFormat(action.payload);
        })

        //signup
        builder.addCase(signup.pending, (state, action) => {
            state.loading = true;
            state.errors = []
        });

        builder.addCase(signup.fulfilled, (state, action) => {
            state.loading = false;
            state.step = 2
        });

        builder.addCase(signup.rejected, (state, action) => {
            state.loading = false;
            state.errors = apiErrorFormat(action.payload);
        })

        //create user profile
        builder.addCase(createUserProfile.fulfilled, (state, action) => {
            state.step = 3
        })
    }
})

export default slice.reducer;