import { createcontext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || null ));

    const login = (userData) =>{
        
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    }

    const logout = () =>{
        localStorage.removeItem('user');
        setUser(null);
    }



return (<Authcontext.Provider value={{user, login, logout }}>
    { children }
</Authcontext.Provider>)

}
