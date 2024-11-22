import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { biuAxios } from "../..";

const PassRecovery = () => {
    const location = useLocation()
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const confirmHandler = (e) => {
        e.preventDefault();
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        if (password !== confirmPassword) {
            console.log('Passwords do not match.');
            return;
        }
        
        biuAxios.post('/users/pass', {password: password})
        .then(response => {
            navigate('/login')
        })
        .catch(error => {
            console.log('There was an error trying create the new password.')
            navigate('/')
        })
    }

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('tk')
        if (token === undefined || token === null || token === '') {
            navigate('/error')
        }

        biuAxios.get('/auth/recover', {params: {
            tk: token
        }})
        .then(response => {

            setLoading(false);
        })
        .catch(error => {
            console.error("Token expired.", error);
            setLoading(false);
            navigate('/error')
        });
    }, [])

    return (
        <div className="container signup-container">
            {!loading &&
                <div className="card p-4" style={{width: '100%', maxWidth: '500px'}}>
                    <h3 className="text-center mb-4">Password Recovery</h3>
                    <form onSubmit={confirmHandler}>
                        <div class="mb-3">
                            <label for="password" className="form-label">New Password</label>
                            <input type="password" className="form-control" id="password" ref={passwordRef} placeholder="Password" required/>
                        </div>
                        <div class="mb-3">
                            <label for="confirmPassword" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="confirmPassword" ref={confirmPasswordRef} placeholder="Confirm Password" required/>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Confirm</button>
                    </form>
                </div>
            }
        </div>
    )
}

export default PassRecovery;