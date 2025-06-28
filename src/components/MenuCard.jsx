
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../utils/CartSlice';
import { base_url } from './Constants';
import { useGetCookie } from '../utils/useGetCookie';
import { useState } from 'react';

const MenuCard = ({item}) => {

	const [ menu , setMenu ] = useState(item?.card?.card?.itemCards);

	const csrf = useGetCookie()

    const dispatch = useDispatch()

	const cart = useSelector(store => store.cart.items)
	const isInCart = cart.some(cartItem => {
  		const cartItemId = cartItem.card?.info?.id || cartItem.dish?.info?.id;
  		return cartItemId === itemId;
	});

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
	return (
		<>
		<div>{item?.card?.card?.title}({item?.card?.card?.itemCards?.length})</div>
		  {
			menu.map((menuitem, index) => (
				<div key={index}>{menuitem?.card?.info?.name}</div>
	
			))
		  }
		</>
	  )
	}
	
	export default MenuCard;
