import { createSpace } from './../thunk-actions/space-actions';
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    openCreateSpaceModel: false,
    deleteSpaceModel: false,
    inviteModel: false
}

const slice = createSlice({
    name: "models",
    initialState,
    reducers: {
        toggleCreateSpaceModel: (state) => {
            state.openCreateSpaceModel = !state.openCreateSpaceModel
        },

        toggleDeleteSpaceModel: (state) => {
            state.deleteSpaceModel = !state.deleteSpaceModel
        },

        toggleInviteModel: (state) => {
            state.inviteModel = !state.inviteModel
        },
    },

    extraReducers: (builder) => {
        builder.addCase(createSpace.fulfilled, (state, action) => {
            state.openCreateSpaceModel = !state.openCreateSpaceModel
        })
    }
})

export default slice.reducer;

const {
    toggleCreateSpaceModel,
    toggleDeleteSpaceModel,
    toggleInviteModel
} = slice.actions;

export {
    toggleCreateSpaceModel,
    toggleDeleteSpaceModel,
    toggleInviteModel
}