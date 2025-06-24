
import { useState, useEffect } from 'react'

export const useAuthenticated = () => {

    const [auth , setAuth] = useState(localStorage.getItem('login'));

    useEffect(() => {
        const handleStorageChange = () => {
            setAuth(localStorage.getItem('login'));
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('authChanged', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('authChanged', handleStorageChange);
        };
    }, []);

    return auth;
}