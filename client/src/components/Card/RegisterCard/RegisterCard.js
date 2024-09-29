import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RegisterCard.css';
import axios from 'axios';

const RegisterCard = () => {
    // State for form data
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    // State for error handling
    const [error, setError] = useState('');

    // To handle navigation after successful registration
    const navigate = useNavigate();

    // Update state with form data
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Form validation function (optional)
    const validateForm = () => {
        const { firstName, lastName, email, password } = formData;
        if (!firstName || !lastName || !email || !password) {
            setError('All fields are required');
            return false;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }
        setError('');
        return true;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        try {
            // Send form data to backend API
            const response = await axios.post('http://localhost:5000/api/auth/signup', formData);

            if (response.status === 201) {
                // Redirect to home page on success
                navigate('/');
            }
        } catch (error) {
            // Handle error response
            if (error.response && error.response.data) {
                setError(error.response.data.message);
            } else {
                setError('Error registering user');
            }
        }
    };

    return (
        <div className="register__card__container">
            <div className="register__card">
                <div className="register__header">
                    <h1>Create Account</h1>
                </div>
                {error && <div className="error-message">{error}</div>} {/* Show error message */}
                <form onSubmit={handleSubmit}>
                    <div className="register__inputs">
                        <div className="fname__input__container reg__input__container">
                            <label className="fname__label input__label">First name</label>
                            <input 
                                type="text"
                                name="firstName" 
                                className="fname__input register__input" 
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="lname__input__container reg__input__container">
                            <label className="lname__label input__label">Last name</label>
                            <input 
                                type="text"
                                name="lastName" 
                                className="lname__input register__input"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="email__input__container reg__input__container">
                            <label className="email__label input__label">Email</label>
                            <input 
                                type="email" 
                                name="email"
                                className="email__input register__input" 
                                value={formData.email}
                                onChange={handleChange}
                                placeholder='example@gmail.com'
                                required
                            />
                        </div>
                        <div className="password__input__container reg__input__container">
                            <label className="password__label input__label">Password</label>
                            <input 
                                type="password"
                                name="password" 
                                className="password__input register__input" 
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength={6}  // Optional: client-side password length check
                            />
                        </div>
                        <div className="register__button__container">
                            <button type="submit" className="register__button">Create Account</button>
                        </div>
                    </div>
                </form>
                <div className="register__other__actions">
                    <div className="register__login__account">Already have an account? <Link to="/account/login">Login</Link></div>
                </div>
            </div>
        </div>
    );
};

export default RegisterCard;
