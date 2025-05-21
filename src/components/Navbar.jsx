import React from 'react'
import { useState } from 'react'
import { Link } from "react-router-dom"
import { useOnline } from '../utils/useOnline';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toggleLogin } from '../utils/AppSlice';
import logo1 from '../Images/logo1.png'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Navbar() {

	const dispatch = useDispatch()
	const isLoggedIn = useSelector(store => store.app.isLoggedIn)

	const handleLogin = () => {
		dispatch(toggleLogin(true))
	}

  
  	const carItems = useSelector(Store=>Store.cart.items)
  
  	return (
		<div className="bg-lime-600 bg-opacity-5 flex items-center h-16 border-b justify-between shadow-sm px-10">  
			<a href="/"><img className="w-16 p-2 rounded-full" src={logo1} alt="logo"/></a>
			<FontAwesomeIcon className='max-[499px]:block min-[500px]:hidden w-7 h-5 mr-3' icon={faBars}/>
			<ul className='flex font-medium max-[500px]:hidden gap-5 py-10'>
				<li className='px-2'><Link to="/">Home</Link></li> 
				<li className='px-2'> <Link to="/about">About</Link></li>
				<li className='px-2'> <Link to="contactUs">Contact</Link></li>
			</ul>
			<div className='max-[500px]:hidden flex items-center gap-3'>
			{isLoggedIn ? <button className='bg-red-700 h-8 text-sm px-5 h-8 text-white rounded-xl' onClick={() =>setIslog(true) }>Log Out</button> :<button onClick={() =>handleLogin()} className='bg-green-700 text-sm px-5 h-8 text-white rounded-xl'>Log In</button>} 
				<Link to="/cart">
					<div className='bg-green-700 w-8 h-8 rounded-full flex items-center justify-center relative'>
						<div className='absolute flex justify-center -top-1.5 -right-1 text-white bg-orange-500 text-xs w-4 h-4 rounded-full'>{carItems.length}</div>
						<FontAwesomeIcon className="w-4 block mx-auto text-white stroke-black align-middle" icon={faCartShopping}/>
					</div>
				</Link>
			</div>  
		</div>    
  	)
}
export default Navbar;
