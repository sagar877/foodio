import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

const AppSlice = createSlice({
    name:'app',
    initialState:{
        isLoggedIn:false,
        isRegistered:false,
    },
    reducers:{
        toggleLogin:(state,action)=>{
            state.isLoggedIn = action.payload
        },
        toggleRegister:(state,action)=>{
            state.isRegistered = action.payload
        }
    }
})

export const { toggleLogin , toggleRegister } = AppSlice.actions
export default AppSlice.reducer