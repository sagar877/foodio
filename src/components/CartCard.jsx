
import { useDispatch, useSelector} from "react-redux";
import { removeItem , increaseQuantity , decreaseQuantity } from "../utils/CartSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { base_url, img_url } from './Constants';
import { getCookie } from '../utils/getCookie';
import Login from './Login'
import { toggleLogin } from "../utils/AppSlice";


const CartCard = (item) => {

	const dispatch=useDispatch()

	const csrf = decodeURIComponent(getCookie('XSRF-TOKEN'))

	const quantity = useSelector(store => store.cart.cartItemsQuantity[item.id]?. quantity) ||1
	const price = useSelector(store => store.cart.cartItemsQuantity[item.id]?. price) || item.price
	const isLoggedInModal = useSelector( store=>store.app.isLoggedInModal)
	const isAuthenticated = useSelector(store => store.app.isLoggedIn)

	const handleLogin = () => {
		dispatch(toggleLogin(true))
	}

	const handleRemove=(item)=>{
		dispatch(removeItem(item))
	}

	const handlePayment = async () => {
		const response = await fetch(base_url +'/api/create-order', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'X-XSRF-TOKEN': csrf
			},
			credentials: 'include', 
			body: JSON.stringify({amount : price/100})
		});

		if (!response.ok) throw new Error("Failed to create Razorpay order");

		if(response.ok){
			const data = await response.json();
			const options = {
				key: data.key,
				amount: price/100 * 100,
				currency: "INR",
				name: "Test Company",
				description: "Test Transaction",
				order_id: data.order.id,
				handler: async function (paymentResponse) {
					// You can now verify this via your backend
					console.log("Payment success:", paymentResponse);

					const verifyResponse = await fetch(`${base_url}/api/verify-payment`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Accept': 'application/json',
							'X-XSRF-TOKEN': csrf
						},
						credentials: 'include',
						body: JSON.stringify({
							paymentResponse: {
								razorpay_order_id: paymentResponse.razorpay_order_id,
								razorpay_payment_id: paymentResponse.razorpay_payment_id,
								razorpay_signature: paymentResponse.razorpay_signature
							}
						})
					});
			
					const result = await verifyResponse.json();
					console.log("✅ Verification result:", result);
					if (result.success) {
						alert("Payment verified and successful!");
					} else {
						alert("Payment verification failed!");
					}
	
				},
				prefill: {
					name: "John Doe",
					email: "john@example.com",
					contact: "9999999999",
				},
				theme: {
					color: "#3399cc",
				},
			};

			const rzp = new window.Razorpay(options);
			rzp.open();
  		}
	}
		

	return (
		<div>
			{isLoggedInModal && <Login/> }
			<div className="w-full h-auto relative cursor-default flex justify-between border p-4 rounded-lg  bg-white my-2">
				<img className="rounded-bl-lg rounded-tl-lg w-[50%]" src={img_url + item.imageId } alt="dish"/>
				<div className='flex flex-col flex-1 h-auto p-5'>
					<div>
						<p className='font-semibold text-base line-clamp-1 mt-1'>{item.name}</p>
						{	
							item.price != undefined ?
							<div className="flex w-full items-center border rounded-full overflow-hidden justify-between mt-3 mb-5 mx-auto">
								{ quantity <= 1?
									<button className="w-16 text-black py-2 border-r bg-gray-200" disabled>-</button> :
									<button className="w-16 text-black py-2 border-r bg-gray-200" onClick={() => dispatch(decreaseQuantity({id: item.id, price: item.price}))}>-</button>}
									<div className='font-medium'>{quantity}</div>
									<button className="w-16 text-black py-2 border-l bg-gray-200" onClick={() => dispatch(increaseQuantity({ id: item.id, price: item.price }))}>+</button>
							</div>
							: null
						}
					</div>
					{ item.price != undefined ? <div className="font-[gilroy-bold] flex justify-between border-t pt-2"> Totalprice: <span className="font-[gilroy-bold]">₹ {price/100}</span></div> : null}
					{isAuthenticated ? 
						
						<button onClick={() => {handlePayment()}} className="w-full text-white p-1.5 mt-2 text-sm rounded-lg bg-green-700" >Order now</button>
						: <button onClick={() => {handleLogin()}} className="w-full text-white p-1.5 mt-2 text-sm rounded-lg bg-green-700" >Order now</button>
					}
				</div>
				<button className="absolute right-3 top-1 text-red-700 cursor-default" onClick={()=> handleRemove(item)}>
					<FontAwesomeIcon className="cursor-pointer" icon={faXmark}/>
				</button>
			</div>
		</div>
	)
}

export default CartCard
