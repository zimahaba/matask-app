import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const location = useLocation()

    useEffect(() => {
        if (location.pathname !== '/signup') {
            checkAuth()
            .then(authenticated => {
                if (location.pathname === '/login' && authenticated) {
                    navigate('/')
                } else if (!authenticated) {
                    navigate('/login')
                }
            });
        }
    }, [])

    const checkAuth = async () => {
        try {
            const response = await axios.get('/auth/userinfo');
            if (response.status === 200) {
                setUser({username: response.data.username});
                setIsAuthenticated(true);
                return true;
            }
            return false
        } catch(e) {
            return false;
        }
    }

    const login = (username, password) => {
        axios.post('/auth/login', {username: username, password: password}) 
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
        axios.post('/auth/logout')
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
