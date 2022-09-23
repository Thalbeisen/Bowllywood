import { useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const currentTokens = localStorage.getItem('userTokens')
        console.log(currentTokens)
        if (currentTokens) {
            setAuth(currentTokens);
        }
    },[])

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
