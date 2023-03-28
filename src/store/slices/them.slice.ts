import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    colors: {
        firstColor: "#F6F7FB",
        secondColor: "#0C1A3E",
        thirdColor: "#fff",
        fourthColor: "rgba(0, 0, 0, 0.87)"
    }
}

const slice = createSlice({
    name: "them",
    initialState,
    reducers: {},
})

export default slice.reducer;