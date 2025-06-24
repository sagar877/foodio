import { createContext, useContext, useState, useEffect } from 'react';

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem('login')
    );

    useEffect(() => {
        const handleAuthChange = () => {
            setIsAuthenticated(!!localStorage.getItem('login'));
        };

        window.addEventListener('authChanged', handleAuthChange);
        return () => window.removeEventListener('authChanged', handleAuthChange);
    }, []);

    const login = () => {
        localStorage.setItem('login', 'true');
        setIsAuthenticated(true);
        window.dispatchEvent(new Event('authChanged'));
    };

    const logout = () => {
        localStorage.removeItem('login');
        setIsAuthenticated(false);
        window.dispatchEvent(new Event('authChanged'));
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use the context
export const useAuth = () => useContext(AuthContext);
