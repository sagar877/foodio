import { createSlice } from '@reduxjs/toolkit'

const AppSlice = createSlice({
    name:'app',
    initialState:{
        isLoggedInModal:false,
        isRegisteredModal:false,
        isLoggedIn : localStorage.getItem('login') === 'true'
    },
    reducers:{
        toggleLogin:(state,action)=>{
            state.isLoggedInModal = action.payload
        },
        toggleRegister:(state,action)=>{
            state.isRegisteredModal = action.payload
        },
        setLogIn : (state , action) =>{
            state.isLoggedIn = action.payload
        }
    }
})

export const { toggleLogin , toggleRegister, setLogIn } = AppSlice.actions
export default AppSlice.reducer