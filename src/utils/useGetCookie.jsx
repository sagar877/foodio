
import { useState , useEffect} from 'react'

export const useGetCookie = () => {

    const [csrf, setCsrf] = useState('');

	const getCookie = (name) => {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop().split(';').shift();
	};

    useEffect(() => {
        const csrfToken = decodeURIComponent(getCookie('XSRF-TOKEN') || '');
        setCsrf(csrfToken);
    }, []); 
    
	return csrf;
}
