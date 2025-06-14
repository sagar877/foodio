import { Link } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toggleLogin } from '../utils/AppSlice';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Navbar() {

	const { isLoggedIn, logout } = useContext(AuthContext);
	const dispatch = useDispatch()
	const isLoggedInModal = useSelector(store => store.app.isLoggedInModal)

	const location = useLocation();
  	const isHome = location.pathname === '/';

	const handleLogin = () => {
		dispatch(toggleLogin(true))
	}

  	const carItems = useSelector(Store=>Store.cart.items)

  	return (
		<>
			<div className={`bg-lime-600 bg-opacity-5 flex items-center h-16  justify-between px-10`}>  
				<a href="/" className={`${ isHome? 'text-white' : 'text-black'} font-[merienda] text-2xl font-semibold`}>Foodio</a>
				<div className='flex items-center gap-3'>
					{isLoggedIn ?
						<button onClick={logout} className={`${ isHome? 'bg-transparent px-3' : 'bg-red-600 text-sm px-4'} h-8 text-white font-medium rounded-xl`}>Logout</button> 
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
