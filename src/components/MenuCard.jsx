
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../utils/CartSlice';
import { base_url } from './Constants';

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

	const getCookie = (name) => {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop().split(';').shift();
	}
	const csrfToken = decodeURIComponent(getCookie('XSRF-TOKEN')) || '';

    const handleAdd = async (item) =>{
		const response = await fetch(base_url+'/api/add-to-cart', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'X-XSRF-TOKEN': csrfToken
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
		<div>
			<div className='border rounded-lg bg-white my-4'>   
				<img className="w-full rounded-tr-lg rounded-tl-lg" loading="lazy" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/"+ imageId} alt="menu-item"/>
				<div className='flex flex-col p-4 py-2'>
					<h2 className='font-bold text-base mt-1 line-clamp-1'>{name}</h2>
					<p className='text-sm line-clamp-3 my-1.5 text-neutral-700'>{description}</p>
					<p className='font-bold'>₹ {price/100}</p>
					{
						isInCart ?
						<button type="button" className="border shadow-md font-semibold rounded-lg bg-white w-[70%] mx-auto -mb-6 text-green-600 p-2 mt-2 hover:bg-green-50 text-green-600 font-semibold text-sm mt-1">Added</button>
						:<button onClick={() => handleAdd(item)} className='border shadow-md font-semibold rounded-lg bg-white w-[70%] mx-auto -mb-6 text-green-600 p-1.5 mt-2 hover:bg-green-50'>Add</button>
					}
					
				</div>
			</div>
		</div>
	</>
  	)
}

export default MenuCard
