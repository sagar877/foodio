import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { toggleLogin , toggleRegister } from '../utils/AppSlice'

const Login = () => {

	const [loginForm, setLoginForm] = useState({
		email: '',
		password: ''
	})
	const [errors, setErrors] = useState({});

	const handleChange = () =>{
		setLoginForm({ ...loginForm ,[ e.target.name ] : e.target.value })
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		if(!loginForm.email){
			setErrors(prevErrors => ({ ...prevErrors, email: 'Email is required' }));
		}

		if(!loginForm.password){
			setErrors(prevErrors => ({ ...prevErrors, password: 'Password is required' }));
		}
	}

	const dispatch = useDispatch()

	const handleLogin = () => {
		dispatch(toggleLogin(false))
	}

	const handleRegister = () => {
		dispatch(toggleRegister(true))
	}

  return (
    <> 
     	<div className="fixed z-20 bg-black bg-opacity-40 inset-0 overflow-y-auto">
			<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 backdrop-filter backdrop-blur-sm">
				<div className="fixed inset-0 transition-opacity" aria-hidden="true"onClick={() => handleLogin(false)}>
					<div className="absolute inset-0 opacity-25 bg-gray-800 bg-opacity-50" /></div>

					<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
						&#8203;
					</span>
					<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden p-5 shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
						<div className="flex flex-row justify-between items-center">
							<h3 className="font-semibold text-lg text-gray-900 uppercase truncate">
								Login
							</h3>
							<FontAwesomeIcon className="cursor-pointer h-5 hover:text-gray-600" icon={faTimes} onClick={() => handleLogin(false)}/>
						</div>
						<form className="flex flex-col mt-5" onSubmit={handleSubmit}>
							<label>Email</label>
							<input className='border rounded-md p-2 mt-2 focus:outline-none' onChange={(e) => handleChange(e.target.value)} value={loginForm.email} name="email" type="email" placeholder='Enter your email'/>
							{errors.email && <p className="text-red-500 text-xs mt-1 ps-1">{errors.email}</p>}
							<label className='mt-5'>Password</label>
							<input className='border rounded-md p-2 mt-2 focus:outline-none' onChange={(e) => handleChange(e.target.value)} value={loginForm.password} name="password" type="password" placeholder='*********'/>
							{errors.password && <p className="text-red-500 text-xs mt-1 ps-1">{errors.password}</p>}
							<button className='w-full bg-green-600 rounded-md text-white p-1.5 mt-8'>login</button>
						</form>
						<div className='mt-5'>New to Foodio ? <button onClick={() =>{ handleLogin() ; handleRegister() ; handleSubmit() }} className="text-green-600 underline" href="">Create Account</button></div>
					</div>
				</div>
    		</div>
    	</>
  	)
}

export default Login