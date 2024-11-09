import React, { useEffect, useRef, useState } from 'react';
import './Login.css';
import { useAuth } from './AuthContext';


const Login = () => {
    const usernameInputRef = useRef();
    const passwordInputRef = useRef();
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);
    const { login } = useAuth();

    const loginHandler = (e) => {
        e.preventDefault();
        login(usernameInputRef.current.value, passwordInputRef.current.value, keepLoggedIn);
    }

    const toggleKeepLoggedIn = () => {
        setKeepLoggedIn((prevState) => !prevState);
    };

    return (
        <div style={{backgroundColor: '#183758'}}>
            <div className="container login-container">
                <div className="card p-4 c-1" style={{width: '100%', maxWidth: '400px'}}>
                    <h3 className="text-center mb-4">Login</h3>
                    <form onSubmit={loginHandler}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" ref={usernameInputRef} placeholder="Enter email" required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" ref={passwordInputRef} placeholder="Password" required/>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="keepLoggedIn" checked={keepLoggedIn} onChange={toggleKeepLoggedIn}/>
                            <label className="form-check-label" htmlFor="keepLoggedIn">Keep me logged in</label>
                        </div>
                        <div className="mb-3 text-end">
                            <a href="#" className="text-decoration-none">Forgot password?</a>
                        </div>
                        <button type="submit" className="btn btn-1 w-100">Login</button>
                    </form>
                    <div className="text-center mt-3">
                        <p>Don't have an account? <a href="/register" className="text-decoration-none">Register</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;