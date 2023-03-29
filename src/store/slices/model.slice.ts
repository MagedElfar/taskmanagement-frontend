import { createSpace } from './../thunk-actions/space-actions';
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    openCreateSpaceModel: false
}

const slice = createSlice({
    name: "models",
    initialState,
    reducers: {
        toggleCreateSpaceModel: (state) => {
            state.openCreateSpaceModel = !state.openCreateSpaceModel
        }
    },

    extraReducers: (builder) => {
        builder.addCase(createSpace.fulfilled, (state, action) => {
            state.openCreateSpaceModel = !state.openCreateSpaceModel
        })
    }
})

export default slice.reducer;

const { toggleCreateSpaceModel } = slice.actions;

export {
    toggleCreateSpaceModel
}