import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, signup } from "./auth.slice";
import * as api from "./../../utilities/api"
import { Profile, User } from "../../interfaces/user";

//get user
export const getUser = createAsyncThunk<
    User,
    void,
    {
        rejectValue?: unknown
    }
>("users/getUser", async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
        const token = localStorage.getItem("token")
        if (!token) throw "";
        const { data } = await api.getUser()
        return data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})

//create profile
export const createUserProfile = createAsyncThunk<
    Profile,
    Profile,
    {
        rejectValue?: unknown
    }
>("users/createProfile", async (body, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
        await api.createUserProfile(body)
        return body;
    } catch (error) {
        return rejectWithValue(error)
    }
})
const initialState = {
    isLoggedIn: false,
    loading: false,
    errors: [],
    user: {
        id: 0,
        username: "",
        email: "",
        image: {
            image_url: "",
        },
        profile: {
            first_name: "",
            last_name: "",
            phone: "",
            gender: "",

        }
    }
}

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //getUser
        builder.addCase(getUser.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isLoggedIn = true
        })
        builder.addCase(getUser.rejected, (state, action) => {
            state.loading = false;
            state.isLoggedIn = false
        })

        //create user profile
        builder.addCase(createUserProfile.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(createUserProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.user.profile = action.payload!;
        })
        builder.addCase(createUserProfile.rejected, (state, action) => {
            state.loading = false;
        })

        //login
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isLoggedIn = true
        })

        //signup
        builder.addCase(signup.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isLoggedIn = true
        })
    }
})

export default slice.reducer;