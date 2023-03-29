import { Member } from './../../interfaces/space';
import { createSpace, getInitSpace, getSpace } from './../thunk-actions/space-actions';
import { createSlice } from "@reduxjs/toolkit";
import { apiErrorFormat } from "../../utilities/error-format";


const initialState = {
    isLoggedIn: false,
    loading: false,
    errors: [] as string[],
    name: "",
    id: null as unknown,
    team: [] as Member[]
}

const slice = createSlice({
    name: "space",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getInitSpace.fulfilled, (state, action) => {
            state.name = action.payload.space.name;
            state.id = action.payload.space.id;
            state.team = action.payload.team
        })

        builder.addCase(getSpace.fulfilled, (state, action) => {
            state.name = action.payload.space.name;
            state.id = action.payload.space.id;
            state.team = action.payload.team
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
            state.team = action.payload.team
        })

        builder.addCase(createSpace.rejected, (state, action) => {
            state.loading = false;
            state.errors = apiErrorFormat(action.payload);
        })
    }
})

export default slice.reducer;