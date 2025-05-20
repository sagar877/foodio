import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

const AppSlice = createSlice({
    name:'app',
    initialState:{
        isLoggedIn:false,
    },
    reducers:{
        toggleLogin:(state,action)=>{
            state.isLoggedIn = action.payload
        }
    }
})

export const { toggleLogin } = AppSlice.actions
export default AppSlice.reducer