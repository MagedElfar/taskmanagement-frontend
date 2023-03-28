import { createSlice } from "@reduxjs/toolkit";
import { apiErrorFormat } from '../../utilities/error-format';
import { login, logout, signup } from "../thunk-actions/auth-actions";
import { createUserProfile, uploadProfilePicture } from './../thunk-actions/user-action';



const initialState = {
    loading: false,
    errors: [],
    step: 1
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

        //logout
        builder.addCase(logout.pending, (state, action) => {
            state.loading = true;
            state.errors = []
        });

        builder.addCase(logout.fulfilled, (state, action) => {
            state.loading = false;
            state.step = 1
        });

        builder.addCase(logout.rejected, (state, action) => {
            state.loading = false;
            state.errors = apiErrorFormat(action.payload);
        })

        //create user profile
        builder.addCase(createUserProfile.fulfilled, (state, action) => {
            state.step = 3
        })

        builder.addCase(uploadProfilePicture.fulfilled, (state, action) => {
            state.step = 1
        })

    }
})

export default slice.reducer;