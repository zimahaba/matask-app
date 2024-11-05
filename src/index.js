import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from "axios"
import { AuthProvider } from './components/AuthContext';
import { BrowserRouter, Router } from 'react-router-dom';

axios.defaults.baseURL=process.env.REACT_APP_API_URL
axios.defaults.withCredentials=true
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.response.use((response) => {
    console.log('resp')
    return response;
}, (error) => {
    console.log('deu erro?')
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
