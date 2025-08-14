import { Link } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setLogIn, toggleLogin } from '../utils/AppSlice';
import { base_url } from './Constants';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getCookie } from "../utils/getCookie";

const Navbar = () => {

	const dispatch = useDispatch()

	const location = useLocation();
  	const isHome = location.pathname === '/';

	const isAuthenticated = useSelector(store => store.app.isLoggedIn)

	const handleLogin = () => {
		dispatch(toggleLogin(true))
	}

	const handleLogout = async () => {

		try {	

			await fetch(base_url + "/sanctum/csrf-cookie", {
            	credentials: "include"
        	});

			const csrf = decodeURIComponent(getCookie('XSRF-TOKEN'));

			const response = await fetch(base_url+'/api/logout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'X-XSRF-TOKEN': csrf
				},
				credentials: 'include'
			});

			if (response.ok) {	
				const data = await response.json();
				localStorage.setItem('login' , 'false')
				dispatch(setLogIn(false))
			}
			else {
				console.error('Logout failed with status:', response.status);
			}
		} 
		catch (error) {
			console.error('Error during logout:', error);
		}
	}

  	const carItems = useSelector(Store=>Store.cart.items)

  	return (
		<>
			<div className={`relative z-20 bg-lime-600 bg-opacity-5 flex items-center h-16  justify-between px-10`}>  
				<Link to="/" className={`${ isHome? 'text-white' : 'text-black'} font-[merienda] text-2xl font-semibold`}>Foodio</Link>
				<div className='flex items-center gap-3'>
					{ isAuthenticated ?
						<button onClick={() => handleLogout()} className={`${ isHome? 'bg-transparent px-3' : 'bg-red-600 text-sm px-4'} h-8 text-white font-medium rounded-xl`}>Logout</button> 
						:<button onClick={() =>handleLogin()} className={`${ isHome? 'bg-transparent px-3' : 'bg-green-600 text-sm px-4'} h-8 text-white font-medium rounded-xl`}>Log In</button> 
					}
					<Link to="/cart">
						<div className={` ${ isHome? 'bg-transparent px-3' : 'bg-green-600'} w-8 h-8 rounded-full flex items-center justify-center relative`}>
							<div className='absolute flex justify-center items-center -top-2 -right-1 text-white bg-orange-500 text-xs w-5 h-5 rounded-full'>{carItems.length}</div>
							<FontAwesomeIcon className={`${ isHome? 'w-10' : 'w-8'} block mx-auto text-white stroke-black align-middle`} icon={faCartShopping}/>
						</div>
					</Link>
				</div>  
			</div>  
		</>  
  	)
}
export default Navbar;
