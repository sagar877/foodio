import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

const AppSlice = createSlice({
    name:'app',
    initialState:{
        isLoggedInModal:false,
        isRegisteredModal:false,
    },
    reducers:{
        toggleLogin:(state,action)=>{
            state.isLoggedInModal = action.payload
        },
        toggleRegister:(state,action)=>{
            state.isRegisteredModal = action.payload
        },
    }
})

export const { toggleLogin , toggleRegister, setLogin} = AppSlice.actions
export default AppSlice.reducer