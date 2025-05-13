import React from 'react'
import { useDispatch } from "react-redux";
import { removeItem } from "../utils/CartSlice";

const CartCard = (item) => {

	const info = item.card?.info || item.dish?.info

	const dispatch=useDispatch()

	const handleRemove=(info)=>{
		dispatch(removeItem(info))
	}


  return (
    <div>
      	<div className="w-fit h-auto cursor-pointer flex-col shadow-xl p-4 rounded-lg my-5 bg-white">
			<img src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_302,c_fill/"+info.imageId } alt="dish"/>
			<p className='font-bold text-xl'>{info.name}</p>
			{	
				info.price != undefined ?
				<div className="flex gap-5 items-center">
					<button className="w-full text-black p-1.5 mt-2 border rounded-lg bg-gray-200" onClick={() => decreaseQuantity()}>-</button>
						<div className="align-middle">1</div>
					<button className="w-full text-black p-1.5 mt-2 border rounded-lg bg-gray-200" onClick={() => increaseQuantity() }>+</button>
				</div>
				: null
			}
			{ info.price != undefined ? <div className="font-[gilroy-bold] flex justify-between mt-2"> Totalprice: <span className="font-[gilroy-medium]">₹ {info.price/100}</span></div> : null}
			<button className="w-full text-white p-1.5 mt-2 rounded-lg bg-red-500" onClick={()=> handleRemove(info)}>Remove</button>
		</div>
    </div>
  )
}

export default CartCard
