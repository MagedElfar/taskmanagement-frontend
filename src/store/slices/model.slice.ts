import { number } from 'yup';
import { createSpace } from './../thunk-actions/space-actions';
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    openCreateSpaceModel: false,
    deleteSpaceModel: false,
    inviteModel: false,
    spaceSearchModel: false,
    deleteMemberModel: {
        isOpen: false,
        memberId: 0
    }

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

        toggleSpaceSearchModel: (state) => {
            state.spaceSearchModel = !state.spaceSearchModel
        },

        toggleDeleteMemberModel: (state, action) => {
            state.deleteMemberModel.isOpen = !state.deleteMemberModel.isOpen;
            state.deleteMemberModel.memberId = action.payload
            console.log(action)
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
    toggleInviteModel,
    toggleDeleteMemberModel,
    toggleSpaceSearchModel
} = slice.actions;

export {
    toggleCreateSpaceModel,
    toggleDeleteSpaceModel,
    toggleInviteModel,
    toggleDeleteMemberModel,
    toggleSpaceSearchModel
}