import { createSlice } from "@reduxjs/toolkit";

const CartSlice=createSlice({
    name:"cart",
    initialState:{
        items:[]
    },
    reducers:{
		addItem:(state,action)=>{
			state.items.push(action.payload);
		},
		increaseQuantity:(state,action)=>{
			action.payload.quantity+=action.payload.quantity;
		},
		decreaseQuantity:(state,action)=>{
			if(action.payload.quantity>0){
				action.payload.quantity-=action.payload.quantity;
			}
		},
		clearCart:(state)=>{
			state.items=[];
		},
		removeItem:(state,action)=>{
		const next=state.items.filter((index)=>
			index.dish.info.id!==action.payload.id
		)
		state.items=next
		},

    }
})

export const {addItem,clearCart,removeItem,removeCarouselItem}=CartSlice.actions

export default CartSlice.reducer