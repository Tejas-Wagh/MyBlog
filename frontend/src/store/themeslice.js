import { createSlice } from "@reduxjs/toolkit";

export const theme= createSlice({
    name:"theme",
    initialState:{
        theme:"light",
    },
    reducers:{
        toggleTheme(state){
            state.theme=state.theme=="light" ? "dark" : "light";
        },
    }
})

export const {toggleTheme}= theme.actions;