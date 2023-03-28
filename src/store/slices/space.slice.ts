import { getInitSpace } from './../thunk-actions/space-actions';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiErrorFormat } from "../../utilities/error-format";


const initialState = {
    isLoggedIn: false,
    loading: false,
    errors: [],
    name: ""
}

const slice = createSlice({
    name: "space",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getInitSpace.fulfilled, (state, action) => {
            state.name = action.payload.space.name
        })
    }
})

export default slice.reducer;