import { createContext, useContext, useState, useEffect } from 'react';
import { base_url } from './Constants';
import { getCookie } from '../utils/getCookie';

// Create context
const AuthContext = createContext();

// Provider componen
export const AuthProvider = ({ children }) => {
    
    const [isAuthenticated, setIsAuthenticated] = useState();

    useEffect(()=>{
        checkAuth();
    },[])


    const checkAuth = async () =>{

        const response = await fetch(base_url + '/api/check-authenticated',{
            credentials:'include',
        });

        if(response.ok){
            const data = await response.json();
            setIsAuthenticated(data.authenticated);
        }
    }

    const register = async ({...data}) => {

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
            body: JSON.stringify({...data})
        });
        if(response.ok){
            const data = await response.json();
            setIsAuthenticated(true);
        }
        else {
            const errorData = await response.json();
            console.error('Registration failed:', errorData);
        }
    };
    

    const login = async ({...data}) => {

        await fetch(base_url + "/sanctum/csrf-cookie", {
            credentials: "include"
        });

        const csrf = decodeURIComponent(getCookie('XSRF-TOKEN'));

        const response = await fetch(base_url +'/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-XSRF-TOKEN': csrf
            },
            credentials: 'include', 
            body: JSON.stringify({...data})
        });
        if(response.ok){
            setIsAuthenticated(true);
        }
    };

    const logout = async () => {
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
            setIsAuthenticated(false);
        }
        else {
            console.error('Logout failed with status:', response.status);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use the context
export const useAuth = () => useContext(AuthContext);
