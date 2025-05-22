import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { toggleRegister } from '../utils/AppSlice'

const Register = () => {

    const dispatch = useDispatch()

	const handleRegister = () => {
		dispatch(toggleRegister(false))
	}

  return (
    <>
     	<div className="fixed z-20 bg-black bg-opacity-40 inset-0 overflow-y-auto">
			<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 backdrop-filter backdrop-blur-sm">
				<div className="fixed inset-0 transition-opacity" aria-hidden="true"onClick={() => handleRegister()}>
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
						<form className="flex flex-col mt-5" action='' method=''>
							<label>Name</label>
							<input className='border rounded-md p-2 mt-2 focus:outline-none' type="text" placeholder='Enter your email' required/>
                            <label className='mt-5'>Email</label>
							<input className='border rounded-md p-2 mt-2 focus:outline-none' type="email" placeholder='*********' required/>
							<label className='mt-5'>Password</label>
							<input className='border rounded-md p-2 mt-2 focus:outline-none' type="password" placeholder='*********' required/>
							<button className='w-full bg-green-600 rounded-md text-white p-1.5 mt-8'>Sign up</button>
						</form>
					</div>
				</div>
    		</div>
    	</>
  )
}

export default Register