
import { createContext, useState, useEffect } from 'react';
import {base_url} from './Constants';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [isLoggedIn, setIsLoggedIn] = useState(() => {
	return localStorage.getItem('login') === 'true';
});

const login = () => {
	localStorage.setItem('login', 'true');
	setIsLoggedIn(true);
};

const logout = async () => {
	try {
		const getCookie = (name) => {
			const value = `; ${document.cookie}`;
			const parts = value.split(`; ${name}=`);
			if (parts.length === 2) return parts.pop().split(';').shift();
		};
		const csrfToken = decodeURIComponent(getCookie('XSRF-TOKEN'));
		
		const response = await fetch(base_url + '/api/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'X-XSRF-TOKEN': csrfToken
			},
			credentials: 'include'
		});
		if (response.ok) {
			localStorage.removeItem('login');
			setIsLoggedIn(false)
		}
	}
	catch (error) {
		console.error('Logout failed:', error);
	}
}



useEffect(() => {
	const handleStorage = (event) => {
		if (event.key === 'login') {
		setIsLoggedIn(event.newValue === 'true');
		}
	};
	window.addEventListener('storage', handleStorage);
	return () => window.removeEventListener('storage', handleStorage);
}, []);

  	return (
		<AuthContext.Provider value={{ isLoggedIn, login, logout }}>
			{children}
		</AuthContext.Provider>
  	);
}
