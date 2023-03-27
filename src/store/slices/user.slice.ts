import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, signup } from "./../thunk-actions/auth-actions";
import { createUserProfile, getUser, uploadProfilePicture } from "../thunk-actions/user-action";
import { apiErrorFormat } from "../../utilities/error-format";


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
            state.isLoggedIn = false;
            localStorage.removeItem("token")
        })

        //create user profile
        builder.addCase(createUserProfile.pending, (state, action) => {
            state.loading = true;
            state.errors = [];
        })
        builder.addCase(createUserProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.user.profile = action.payload!;
        })
        builder.addCase(createUserProfile.rejected, (state, action) => {
            state.loading = false;
            state.errors = apiErrorFormat(action.payload);
        })

        //upload user Image
        builder.addCase(uploadProfilePicture.pending, (state, action) => {
            state.loading = true;
            state.errors = [];
        })
        builder.addCase(uploadProfilePicture.fulfilled, (state, action) => {
            state.loading = false;
            state.user.image = action.payload.image_url!;
            state.isLoggedIn = true
        })
        builder.addCase(uploadProfilePicture.rejected, (state, action) => {
            state.loading = false;
            state.errors = apiErrorFormat(action.payload);
        })

        //login
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isLoggedIn = true
        })

        //signup
        builder.addCase(signup.fulfilled, (state, action) => {
            state.user = action.payload.user;
        })
    }
})

export default slice.reducer;