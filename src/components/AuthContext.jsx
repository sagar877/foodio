import { createContext, useContext, useState, useEffect } from 'react';
import { base_url } from './Constants';
import { useGetCookie } from '../utils/useGetCookie';

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
    const csrf = useGetCookie();
    const [isAuthenticated, setIsAuthenticated] = useState();

    useEffect(() => {
    
        getSessionId();
    
    }, []);

    const getSessionId = async () =>{
        await fetch(base_url + '/sanctum/csrf-cookie', {
            credentials: 'include' 
        });
    }

    // const checkAuth = async () => {
    //     const res = await getSessionId();
    //     console.log('Session ID fetched:', res);

    //     const response = await fetch(base_url + '/api/user', {
    //         credentials: 'include',
    //         headers: {
    //             'Accept': 'application/json'
    //         }
    //     });

    //     setIsAuthenticated(response.ok);
    // };


    const register = async ({...data}) => {
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
