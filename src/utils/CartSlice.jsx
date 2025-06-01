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
			localStorage.setItem('cartItems', JSON.stringify(state.items));
		},
		clearCart:(state)=>{
			state.items=[];
			localStorage.removeItem('cartItems');
		},
		removeItem:(state,action)=>{
			const next=state.items.filter((index)=>{
				const dishCardId = index.dish?.info?.id || index.card?.info?.id;
				return dishCardId !== action.payload.id
			})
			state.items=next;
			localStorage.setItem('cartItems', JSON.stringify(next));
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