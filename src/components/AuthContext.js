import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/auth/status')
        .then(response => {
            setUser({username: response.data.username});
            setIsAuthenticated(true);
        })
        .catch(error => {
            navigate('/login')
        })
            
    }, [])

    const login = (username, password) => {
        axios.post('/login', {username: username, password: password}) 
        .then(response => {
            setUser({username: username});
            setIsAuthenticated(true);
            navigate("/");
        })
        .catch(error => {
          console.error("There was an error trying to login!", error);
        });
    };

    const logout = () => {
        axios.post('/logout')
        .then(response => {
            setUser(null);
            setIsAuthenticated(false);
            navigate("/login");
        })
        .catch(error => {
            console.error("There was an error trying to logout!", error);
        })
        
    };

    const authValue = {
        user,
        isAuthenticated,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
