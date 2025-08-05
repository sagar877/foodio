
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { setLogIn, toggleRegister } from '../utils/AppSlice'
import { useForm } from "react-hook-form"
import { base_url } from './Constants'
import { getCookie} from '../utils/getCookie'

const Register = () => {

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	  } = useForm()

	const dispatch = useDispatch()

	const onSubmit =  async(data) => {
	
		await fetch(base_url + "/sanctum/csrf-cookie", {
			credentials: "include"
		});
		
		const csrf = decodeURIComponent(getCookie('XSRF-TOKEN'));
	
		const response = await fetch(base_url + '/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'X-XSRF-TOKEN': csrf
			},
			credentials: 'include',
			body: JSON.stringify(data)
		});

		if(response.ok){
			const data = await response.json();
			localStorage.setItem('login' , 'true')
			dispatch(setLogIn(true))
		}
		else {
			const errorData = await response.json();
			console.error('Registration failed:', errorData);
		}
	}
	
	const handleRegister = () => {
		dispatch(toggleRegister(false))
	}

  return (
    <>
     	<div className="fixed z-20 bg-black bg-opacity-40 inset-0 overflow-y-auto">
			<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 backdrop-filter backdrop-blur-sm">
				<div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={() => handleRegister()}>
					<div className="absolute inset-0 opacity-25 bg-gray-800 bg-opacity-50" /></div>

					<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
						&#8203;
					</span>
					<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden p-5 shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
						<div className="flex flex-row justify-between items-center">
							<h3 className="font-semibold text-lg text-gray-900 uppercase truncate">
								Sign Up
							</h3>
							<FontAwesomeIcon className="cursor-pointer h-5 hover:text-gray-600" icon={faTimes} onClick={() => handleRegister()}/>
						</div>
						<form className="flex flex-col mt-5"onSubmit={handleSubmit(onSubmit)}>
							<label>Name</label>
							<input className='border rounded-md p-2 mt-2 focus:outline-none' type="text" { ...register ("name" , { required : 'The name field is required'}) } placeholder='Enter your name'/>
							{errors.name && <p className="text-red-500 text-xs mt-1 ps-1">{errors.name.message}</p>}

                            <label className='mt-5'>Email</label>
							<input className='border rounded-md p-2 mt-2 focus:outline-none' type="email"  { ...register ("email" , { required : 'The email field is required'} )} placeholder='Enter your email'/>
							{errors.email && <p className="text-red-500 text-xs mt-1 ps-1">{errors.email.message}</p>}

							<label className='mt-5'>Password</label>
							<input className='border rounded-md p-2 mt-2 focus:outline-none' type="password" {...register("password", {
								required: "Password is required",
								minLength: {
									value: 8,
									message: "Password must be at least 8 characters long"
								},
								pattern: {
									value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
									message: "Password must include uppercase, lowercase, number, and symbol"
								}
							})} placeholder='*********'/>
							{errors.password && <p className="text-red-500 text-xs mt-1 ps-1">{errors.password.message}</p>}

							<label className='mt-5'>Confirm Password</label>
							<input className='border rounded-md p-2 mt-2 focus:outline-none' type="password"  {...register("confirmPassword", {required: "Please confirm your password", validate: value => value === password || "Passwords do not match"})} placeholder='*********'/>
							{errors.confirmPassword && <p className="text-red-500 text-xs mt-1 ps-1">{errors.confirmPassword.message}</p>}

							<button className='w-full bg-green-600 rounded-md text-white p-1.5 mt-8'>Sign up</button>
						</form>
					</div>
				</div>
    		</div>
    	</>
  )
}

export default Register