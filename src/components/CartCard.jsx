import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector} from "react-redux";
import { removeItem , increaseQuantity , decreaseQuantity } from "../utils/CartSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const CartCard = (item) => {

	const info = item.card?.info || item.dish?.info

	const dispatch=useDispatch()

	const quantity = useSelector(store => store.cart.cartItemsQuantity[info.id]?. quantity) ||1
	const price = useSelector(store => store.cart.cartItemsQuantity[info.id]?. price) || info.price

	const handleRemove=(info)=>{
		dispatch(removeItem(info))
	}

	const getUser = async () => {
		const response = await fetch('http://localhost:8000/api/user', {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Accept': 'application/json'
			
			}
		});

		if (response.ok) {
			const user = await response.json();
			console.log('User data:', user);
		} else {
			console.error('Failed to fetch user, status:', response.status);
		}
	};
  return (
    <div>
      	<div className="w-full h-auto relative cursor-default flex justify-between border p-4 rounded-lg  bg-white my-2">
			<img className="rounded-bl-lg rounded-tl-lg w-[50%]" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_302,c_fill/"+info.imageId } alt="dish"/>
			<div className='flex flex-col flex-1 h-auto p-5'>
				<div>
					<p className='font-semibold text-base line-clamp-1 mt-1'>{info.name}</p>
					{	
						info.price != undefined ?
						<div className="flex w-full items-center border rounded-full overflow-hidden justify-between mt-3 mb-5 mx-auto">
							{ quantity <= 1?
								<button className="w-16 text-black py-2 border-r bg-gray-200" disabled>-</button> :
								<button className="w-16 text-black py-2 border-r bg-gray-200" onClick={() => dispatch(decreaseQuantity({id: info.id, price: info.price}))}>-</button>}
								<div className='font-medium'>{quantity}</div>
								<button className="w-16 text-black py-2 border-l bg-gray-200" onClick={() => dispatch(increaseQuantity({ id: info.id, price: info.price }))}>+</button>
						</div>
						: null
					}
				</div>
				{ info.price != undefined ? <div className="font-[gilroy-bold] flex justify-between border-t pt-2"> Totalprice: <span className="font-[gilroy-bold]">₹ {price/100}</span></div> : null}
				<div className='flex items-center gap-2'>
					<button onClick={() => {getUser()}} className="w-full text-white p-1.5 mt-2 text-sm rounded-lg bg-green-700" >Order now</button>
				</div>
			</div>
			<button className="absolute right-3 top-1 text-red-700 cursor-default" onClick={()=> handleRemove(info)}>
				<FontAwesomeIcon className="cursor-pointer" icon={faXmark}/>
			</button>
		</div>
    </div>
  )
}

export default CartCard
