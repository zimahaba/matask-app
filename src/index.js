import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from "axios"
import { AuthProvider } from './components/auth/AuthContext';
import { BrowserRouter, Router } from 'react-router-dom';

axios.defaults.baseURL=process.env.REACT_APP_API_URL
axios.defaults.withCredentials=true
axios.defaults.headers.post['Content-Type'] = 'application/json';

const noRefreshPaths = ['/auth/login', '/auth/refresh', '/auth/logout']

const shouldRefresh = (error) => {
    return noRefreshPaths.includes(error.config.url) == false
        && error.response && error.status === 401;
}

axios.interceptors.response.use((response) => {
    console.log('resp')
    return response;
}, async (error) => {
    if (shouldRefresh(error)) {
        const originalConfig = error.config;
        console.log('opaaaa')
        try {
            await axios.post('/auth/refresh')
            return axios(originalConfig)
        } catch(e) {
            console.log('Refresh token revoked.')
        }
    }    
    return Promise.reject(error.message);
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div id="main">
        <BrowserRouter>
            <AuthProvider>
                <App/>
            </AuthProvider>
        </BrowserRouter>
    </div>
);
