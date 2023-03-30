import { addMember } from './../thunk-actions/team-action';
import { Member, Project } from './../../interfaces/space';
import { createSpace, getInitSpace, getSpace, updateSpace } from './../thunk-actions/space-actions';
import { createSlice } from "@reduxjs/toolkit";
import { apiErrorFormat } from "../../utilities/error-format";


const initialState = {
    isLoggedIn: false,
    loading: false,
    errors: [] as string[],
    name: "",
    id: null as unknown,
    team: [] as Member[],
    projects: [] as Project[]

}

const slice = createSlice({
    name: "space",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getInitSpace.fulfilled, (state, action) => {
            if (!action.payload.space) {
                console.log(initialState)
                state.id = initialState.id;
                state.name = initialState.name;
                state.team = initialState.team
                state.projects = initialState.projects
                return
            }
            state.name = action.payload.space.name;
            state.id = action.payload.space.id;
            state.team = action.payload.team;
            state.projects = action.payload.projects
        })

        builder.addCase(getSpace.fulfilled, (state, action) => {
            state.name = action.payload.space.name;
            state.id = action.payload.space.id;
            state.team = action.payload.team;
            state.projects = action.payload.projects
        })

        //accept invite
        builder.addCase(addMember.fulfilled, (state, action) => {
            state.name = action.payload.space.name;
            state.id = action.payload.space.id;
            state.team = action.payload.team;
            state.projects = action.payload.projects
        })

        //create space
        builder.addCase(createSpace.pending, (state, action) => {
            state.errors = [];
            state.loading = true
        })

        builder.addCase(createSpace.fulfilled, (state, action) => {
            state.loading = false;
            state.name = action.payload.space.name;
            state.id = action.payload.space.id;
            state.team = action.payload.team;
        })

        builder.addCase(createSpace.rejected, (state, action) => {
            state.loading = false;
            state.errors = apiErrorFormat(action.payload);
        })

        //create space
        builder.addCase(updateSpace.pending, (state, action) => {
            state.errors = [];
            state.loading = true
        })

        builder.addCase(updateSpace.fulfilled, (state, action) => {
            state.loading = false;
            state.name = action.payload.name;
        })

        builder.addCase(updateSpace.rejected, (state, action) => {
            state.loading = false;
            state.errors = apiErrorFormat(action.payload);
        })
    }
})

export default slice.reducer;