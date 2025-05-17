import { createSlice } from "@reduxjs/toolkit";

const CartSlice=createSlice({
    name:"cart",
    initialState:{
        items:[],
		cartItemsQuantity:{}
    },
    reducers:{
		addItem:(state,action)=>{
			state.items.push(action.payload);
		},
		clearCart:(state)=>{
			state.items=[];
		},
		removeItem:(state,action)=>{
			const next=state.items.filter((index)=>{
				const dishCardId = index.dish?.info?.id || index.card?.info?.id;
				return dishCardId !== action.payload.id
			})
			state.items=next
		},
		increaseQuantity:(state,action)=>{
			const item = state.cartItemsQuantity[action.payload.id] || { quantity: 1, price:action.payload.price/100 };
			item.quantity += 1;
			item.price = action.payload.price * item.quantity;
			state.cartItemsQuantity[action.payload.id] = item;
		},
		decreaseQuantity :(state, action)=>{
			const item = state.cartItemsQuantity[action.payload.id] || { quantity: 1, price:action.payload.price/100 };
			item.quantity -=1;
			item.price = action.payload.price * item.quantity;
			state.cartItemsQuantity[action.payload.id] = item;
		}

    }
})

export const {addItem, clearCart, removeItem, removeCarouselItem, increaseQuantity, decreaseQuantity}=CartSlice.actions

export default CartSlice.reducer