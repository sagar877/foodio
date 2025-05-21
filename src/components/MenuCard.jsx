import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../utils/CartSlice';

const MenuCard = ({item}) => {

    const info = item.card?.info ? item?.card?.info : item.dish?.info

	const itemId = item.card?.info?.id || item.dish?.info?.id;
    const {name, price, imageId, description} = info

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
			<div className='border rounded-lg bg-white my-4'>   
				<img className="w-full rounded-tr-lg rounded-tl-lg" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/"+ imageId} alt="menu-item"/>
				<div className='flex flex-col p-4 py-2'>
					<h2 className='font-bold text-base mt-1 line-clamp-1'>{name}</h2>
					<p className='text-sm line-clamp-3 my-1.5 text-neutral-700'>{description}</p>
					<p className='font-bold'>₹ {price/100}</p>
					<button onClick={() => handleAdd(item)} className='border shadow-md font-semibold rounded-lg bg-white w-[70%] mx-auto -mb-6 text-green-600 p-1.5 mt-2 hover:bg-green-50'>{ isInCart ? 'Added ' : 'Add'}</button>
				</div>
			</div>
		</div>
  	)
}

export default MenuCard
