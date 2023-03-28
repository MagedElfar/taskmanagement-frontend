import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, logout, signup } from "./../thunk-actions/auth-actions";
import { createUserProfile, deleteProfilePicture, getUser, updateUser, uploadProfilePicture } from "../thunk-actions/user-action";
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

        //updateUser
        builder.addCase(updateUser.pending, (state, action) => {
            state.loading = true;
            state.errors = [];
        })
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user.email = action.payload.email;
            state.user.username = action.payload.username;
            state.user.profile.first_name = action.payload.first_name;
            state.user.profile.last_name = action.payload.last_name;
            state.user.profile.phone = action.payload.phone;
            state.user.profile.gender = action.payload.gender;
        })
        builder.addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.errors = apiErrorFormat(action.payload);
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
            state.user.image.image_url = action.payload.image_url!;
            state.isLoggedIn = true
        })
        builder.addCase(uploadProfilePicture.rejected, (state, action) => {
            state.loading = false;
            state.errors = apiErrorFormat(action.payload);
        })

        //delete user Image
        builder.addCase(deleteProfilePicture.pending, (state, action) => {
            state.loading = true;
            state.errors = [];
        })
        builder.addCase(deleteProfilePicture.fulfilled, (state, action) => {
            state.loading = false;
            state.user.image.image_url = "";
            state.isLoggedIn = true
        })
        builder.addCase(deleteProfilePicture.rejected, (state, action) => {
            state.loading = false;
            state.errors = apiErrorFormat(action.payload);
        })

        //login
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isLoggedIn = true
        })

        //login
        builder.addCase(logout.fulfilled, (state, action) => {
            state.isLoggedIn = false
        })

        //signup
        builder.addCase(signup.fulfilled, (state, action) => {
            state.user = action.payload.user;
        })
    }
})

export default slice.reducer;