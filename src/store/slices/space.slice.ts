import { addMember, deleteMember, updateMember } from './../thunk-actions/team-action';
import { Member, Project } from './../../interfaces/space';
import { createSpace, getInitSpace, getSpace, updateSpace } from './../thunk-actions/space-actions';
import { createSlice } from "@reduxjs/toolkit";
import { apiErrorFormat } from "../../utilities/error-format";
import { createProject, deleteProject, updateProject } from '../thunk-actions/project-actions';


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

        //member update
        builder.addCase(updateMember.pending, (state, action) => {
            state.errors = [];
            state.loading = true
        })

        builder.addCase(updateMember.fulfilled, (state, action) => {
            state.loading = false;
            state.team = state.team.map((member: Member) => {
                if (member.id === action.payload.memberId) {
                    member.role = action.payload.role
                }

                return member
            });
        })

        builder.addCase(updateMember.rejected, (state, action) => {
            state.loading = false;
            state.errors = apiErrorFormat(action.payload);
        })

        //member delete
        builder.addCase(deleteMember.pending, (state, action) => {
            state.errors = [];
        })

        builder.addCase(deleteMember.fulfilled, (state, action) => {
            state.team = state.team.filter((member: Member) => member.id !== action.payload.memberId);
        })

        builder.addCase(deleteMember.rejected, (state, action) => {
            state.errors = apiErrorFormat(action.payload);
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

        //update space
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

        //create project
        builder.addCase(createProject.pending, (state, action) => {
            state.errors = [];
            state.loading = true
        })

        builder.addCase(createProject.fulfilled, (state, action) => {
            state.projects = [action.payload, ...state.projects]
            state.loading = false

        })

        builder.addCase(createProject.rejected, (state, action) => {
            state.loading = false;
            state.errors = apiErrorFormat(action.payload);
        })

        //update project
        builder.addCase(updateProject.pending, (state, action) => {
            state.errors = [];
            state.loading = true
        })

        builder.addCase(updateProject.fulfilled, (state, action) => {
            state.projects = state.projects.map((project: Project) => {
                if (project.id === action.payload.id) {
                    project.name = action.payload.data.name;
                }

                return project
            })
            state.loading = false

        })

        builder.addCase(updateProject.rejected, (state, action) => {
            state.loading = false;
            state.errors = apiErrorFormat(action.payload);
        })

        //delete project
        builder.addCase(deleteProject.pending, (state, action) => {
            state.errors = [];
            state.loading = true
        })

        builder.addCase(deleteProject.fulfilled, (state, action) => {
            state.projects = state.projects.filter((project: Project) => project.id !== action.payload.id)
            state.loading = false

        })

        builder.addCase(deleteProject.rejected, (state, action) => {
            state.loading = false;
            state.errors = apiErrorFormat(action.payload);
        })
    }
})

export default slice.reducer;