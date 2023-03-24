import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: 0,
    username: "",
    email: "",
    image_url: "",
    loading: false,
    errors: [],
    profile: {
        first_name: "",
        last_name: "",
        phone: "",
        gender: "",

    }
}

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: {}
})

export default slice.reducer;