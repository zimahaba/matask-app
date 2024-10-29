import React, { useRef } from 'react';
import './Login.css';

import { useAuth } from './AuthContext';


const Login = () => {
    const usernameInputRef = useRef();
    const passwordInputRef = useRef();
    const { login } = useAuth();

    const loginHandler = (e) => {
        e.preventDefault();
        login(usernameInputRef.current.value, passwordInputRef.current.value);
    }

    return (
        <form onSubmit={loginHandler}>
            <div className="container login-container">
            
                <div className="card p-4" style={{width: '100%', maxWidth: '400px'}}>
                    <h3 className="text-center mb-4">Login</h3>
                    <form>
                    <div className="mb-3">
                        <label for="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" ref={usernameInputRef} placeholder="Enter email" required/>
                    </div>
                    <div class="mb-3">
                        <label for="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" ref={passwordInputRef} placeholder="Password" required/>
                    </div>
                    <div class="mb-3 text-end">
                        <a href="#" className="text-decoration-none">Forgot password?</a>
                    </div>
                    <button className="btn btn-primary w-100" onClick={loginHandler}>Login</button>
                    </form>
                </div>  
            </div>
        </form>
    );
}

export default Login;