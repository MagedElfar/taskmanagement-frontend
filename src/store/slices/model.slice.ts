import { number } from 'yup';
import { createSpace } from './../thunk-actions/space-actions';
import { createSlice } from "@reduxjs/toolkit";
import { createProject } from '../thunk-actions/project-actions';


const initialState = {
    openCreateSpaceModel: false,
    openCreateProjectModel: false,
    openCreateTaskModel: false,
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

        toggleCreateProjectModel: (state) => {
            state.openCreateProjectModel = !state.openCreateProjectModel
        },

        toggleCreateTaskModel: (state) => {
            state.openCreateTaskModel = !state.openCreateTaskModel
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

        builder.addCase(createProject.fulfilled, (state, action) => {
            state.openCreateProjectModel = !state.openCreateProjectModel
        })
    }
})

export default slice.reducer;

const {
    toggleCreateSpaceModel,
    toggleDeleteSpaceModel,
    toggleInviteModel,
    toggleDeleteMemberModel,
    toggleSpaceSearchModel,
    toggleCreateProjectModel,
    toggleCreateTaskModel
} = slice.actions;

export {
    toggleCreateSpaceModel,
    toggleDeleteSpaceModel,
    toggleInviteModel,
    toggleDeleteMemberModel,
    toggleSpaceSearchModel,
    toggleCreateProjectModel,
    toggleCreateTaskModel
}