import React, { useRef } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import { biuAxios } from '../..';

const Signup = () => {
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const navigate = useNavigate();

    const signupHandler = (e) => {
        e.preventDefault();
        const name = firstNameRef.current.value + ' ' + lastNameRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        if (password !== confirmPassword) {
            console.log('Passwords do not match.');
            return;
        }
        
        biuAxios.post('/users', {name: name, email: emailRef.current.value, password: password})
        .then(response => {
            navigate('/login')
        })
        .catch(error => {
            console.log('There was an error trying to create a new account.')
        })
    }
    
    return (
        <div className="container signup-container">
            <div className="card p-4" style={{width: '100%', maxWidth: '500px'}}>
                <h3 className="text-center mb-4">Create Account</h3>
                <form onSubmit={signupHandler}>
                    <div className="row mb-3">
                        <div className="col">
                            <label for="firstName" className="form-label">First Name</label>
                            <input type="text" className="form-control" id="firstName" ref={firstNameRef} placeholder="First Name" required/>
                        </div>
                        <div className="col">
                            <label for="lastName" className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="lastName" ref={lastNameRef} placeholder="Last Name" required/>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="email" className="form-label">Email Address</label>
                        <input type="email" className="form-control" id="email" ref={emailRef} placeholder="Enter email" required/>
                    </div>
                    <div class="mb-3">
                        <label for="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" ref={passwordRef} placeholder="Password" required/>
                    </div>
                    <div class="mb-3">
                        <label for="confirmPassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="confirmPassword" ref={confirmPasswordRef} placeholder="Confirm Password" required/>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;