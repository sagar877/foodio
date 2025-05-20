
import { configureStore } from '@reduxjs/toolkit'
import CartSlice from './CartSlice'
import AppSlice from './AppSlice'

const Store=configureStore({
reducer:{
    cart:CartSlice,
    app:AppSlice
},

})

export default Store
