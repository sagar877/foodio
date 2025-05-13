import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../utils/CartSlice';

const MenuCard = ({item}) => {

    const info = item.card?.info ? item?.card?.info : item.dish?.info
	const itemId = item.card?.info?.id || item.dish?.info?.id;
    const {name,price,imageId} = info

    const dispatch=useDispatch()
	const cart = useSelector(store => store.cart.items)
	const isInCart = cart.some(cartItem => {
  		const cartItemId = cartItem.card?.info?.id || cartItem.dish?.info?.id;
  		return cartItemId === itemId;
	});

    const handleAdd=(item)=>{
        dispatch(addItem(item))
    }

  	return (
		<div>
			<div className='bg-white p-4'>   
				<img className="w-full rounded-lg" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/"+ imageId} alt="menu-item"/>
				<h2 className='font-bold text-lg'>{name}</h2>
				<p> Price: ₹{price == undefined ? 'Not available' : price/100}</p>
				<button onClick={() => handleAdd(item)} className='rounded-lg text-white p-1.5 mt-2 bg-green-600 w-full'>{ isInCart ? 'Added' : 'Add to cart'}</button>
			</div>
		</div>
  	)
}

export default MenuCard
