import React from 'react'
import { addItem } from '../utils/CartSlice';
import { base_url } from './Constants';
import { getCookie } from '../utils/getCookie';
import { img_url } from './Constants'
import img from '../Images/no-dish.jpg'
import { useSelector , useDispatch } from 'react-redux'

const MenuCard = ({item}) => {

	const dispatch = useDispatch()
	const csrf = decodeURIComponent(getCookie('XSRF-TOKEN'))

	const cart = useSelector(store => store.cart.items)
	const isAuthenticated = useSelector(store => store.app.isLoggedIn)
	
	const handleAddItem = (item) =>{
		dispatch(addItem(item))
	}

    const handleAdd = async (item) =>{
		const response = await fetch(base_url+'/api/add-to-cart', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'X-XSRF-TOKEN': csrf
			},
			credentials: 'include', 
			body: JSON.stringify({cart : item})
		});

		if (response.ok) {
			const data = await response.json();
			dispatch(addItem(item))
		}
		else {
			console.error('Failed to sync cart:', response.statusText);
		} 
    }

    const isInCart = cart.some(cartItem => {
        return cartItem?.id === item?.card?.info?.id;
    });
		
  return (
    <div className='border rounded-lg bg-white my-4'>   
		<img className="w-full h-40 rounded-tr-lg rounded-tl-lg" loading="lazy" src={item?.card?.info?.imageId ? (img_url + item?.card?.info?.imageId) : img} alt="menu-item"/>
		<div className='flex flex-col p-4 py-2'>
			<h2 className='font-bold text-base mt-1 line-clamp-1'>{item?.card?.info?.name}</h2>
			<p className='text-sm line-clamp-3 h-16 my-1.5 text-neutral-700'>{item?.card?.info?.description ? item?.card?.info?.description : 'No description available' }</p>
			<p className='font-bold'>₹ {item?.card?.info?.price/100}</p>
			{	
				isInCart ?
				<button type="button" className="border shadow-md font-semibold rounded-lg bg-white w-[70%] mx-auto -mb-6 text-green-600 p-2 mt-2 hover:bg-green-50 text-green-600 font-semibold text-sm mt-1">Added</button>
				:(isAuthenticated ? <button onClick={() => handleAdd(item?.card?.info)} className='border shadow-md font-semibold rounded-lg bg-white w-[70%] mx-auto -mb-6 text-green-600 p-1.5 mt-2 hover:bg-green-50'>Add</button>:
				<button onClick={() => handleAddItem(item?.card?.info)} className='border shadow-md font-semibold rounded-lg bg-white w-[70%] mx-auto -mb-6 text-green-600 p-1.5 mt-2 hover:bg-green-50'>Add</button>)
			}
			
		</div>
	</div>
  )
}

export default MenuCard
