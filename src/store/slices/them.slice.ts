import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    colors: {
        firstColor: "#E4E4E4",
        secondColor: "#0C1A3E",
        thirdColor: "#fff",
        fourthColor: "rgba(0, 0, 0, 0.87)",
        toDo: "#C0C0C0",
        inProgress: "#FDD835",
        inReview: "#00B0FF",
        done: "#00C853",
        blocked: "#FF1744"
    },

    fonSize: {
        title: "32px"
    }
}

const slice = createSlice({
    name: "them",
    initialState,
    reducers: {},
})

export default slice.reducer;