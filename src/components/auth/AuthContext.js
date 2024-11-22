import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { biuAxios } from '../..';

const AuthContext = createContext();

const noAuthPaths = ['/signup', '/error', '/recovery']

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation()

    useEffect(() => {
        if (!noAuthPaths.includes(location.pathname)) {
            if (!isAuthenticated()) {
                navigate('/login')
            }
        }
    }, [])

    const setIsAuthenticated = (value) => {
        localStorage.setItem('auth', value)
    }

    const isAuthenticated = () => {
        const a = localStorage.getItem('auth');
        return a !== undefined && a !== null && (a === true || a === 'true');
    }

    const login = (username, password, keepLoggedIn) => {
        biuAxios.post('/auth/login', {username: username, password: password, keepLoggedIn: keepLoggedIn}) 
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
        biuAxios.post('/auth/logout')
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
        setIsAuthenticated,
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
