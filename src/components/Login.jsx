import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { toggleLogin } from '../utils/AppSlice'

const Login = () => {

	const dispatch = useDispatch()

	const handleLogin = () => {
		dispatch(toggleLogin(false))
	}

  return (
    <>
     <div className="fixed z-30 bg-black bg-opacity-70 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 backdrop-filter backdrop-blur-sm">
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
          onClick={() => handleLogin()}
        >
          <div className="absolute inset-0 opacity-25 bg-gray-800" />
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
          <div className="flex flex-row justify-between items-center p-4">
            <h3 className="font-semibold text-gray-900 uppercase truncate">
              Cheese
            </h3>
            <FontAwesomeIcon
              className="cursor-pointer fa-2x hover:text-gray-600"
              icon={faTimes}
			  onClick={() => handleLogin(false)}
            />
          </div>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">Cheese</div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => handleLogin(false)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login