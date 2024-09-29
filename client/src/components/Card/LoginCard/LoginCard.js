import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginCard.css';

const LoginCard = () => {
    // State for form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // State for error handling
    const [error, setError] = useState('');

    // For navigation after successful login
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent page reload on form submit

        try {
            // Send a POST request to the login API with email and password
            const response = await axios.post('http://localhost:5000/api/user/login', {
                email,
                password,
            });

            // If the login is successful, handle redirection
            if (response.status === 200) {
                // You could store user info/token here (e.g., in localStorage) if using JWT
                // localStorage.setItem('token', response.data.token); // Uncomment if using JWT

                // Redirect the user to the homepage after successful login
                navigate('/');
            }
        } catch (error) {
            // Handle error and display appropriate message to the user
            if (error.response && error.response.data) {
                setError(error.response.data.message); // Show the error message from the backend
            } else {
                setError('An error occurred during login'); // Default error message
            }
        }
    };

    return (
        <div className="login__card__container">
            <div className="login__card">
                <div className="login__header">
                    <h1>Login</h1>
                </div>

                {/* Display error message if any */}
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="login__inputs">
                        <div className="email__input__container input__container">
                            <label className="email__label input__label">Email</label>
                            <input
                                type="email"
                                className="email__input login__input"
                                placeholder='example@gmail.com'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}  // Update state on change
                                required
                            />
                        </div>

                        <div className="password__input__container input__container">
                            <label className="password__label input__label">Password</label>
                            <input
                                type="password"
                                className="password__input login__input"
                                placeholder='**********'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}  // Update state on change
                                required
                            />
                        </div>

                        <div className="login__button__container">
                            <button type="submit" className="login__button">LOGIN</button>
                        </div>
                    </div>
                </form>

                <div className="login__other__actions">
                    <div className="login__forgot__password">Forgot password?</div>
                    <div className="login__new__account">Don't have an account? <Link to="/account/register">Create account</Link></div>
                </div>
            </div>
        </div>
    );
};

export default LoginCard;
