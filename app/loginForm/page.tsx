'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { addUser, loginUser } from '@/actions/action'; // Import actions
import EmailInput from './EmailInput/emailInput'; // Import EmailInput
import PasswordInput from './PasswordInput/passwordInput'; // Import PasswordInput
import './loginForm.css'; // Import CSS for styling

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // State for repeated password
    const [isSignUp, setIsSignUp] = useState(false); // Toggle between Sign Up and Sign In
    const [error, setError] = useState(''); // To handle error messages
    const searchParams = useSearchParams(); // Get query parameters from the URL

    useEffect(() => {
        const view = searchParams.get('view');
        if (view === 'signUp') {
            setIsSignUp(true); // Show Sign Up form
        } else {
            setIsSignUp(false); // Show Sign In form
        }
    }, [searchParams]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        

        // Validate if passwords match when signing up
        if (isSignUp && password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            if (isSignUp) {
                // Handle Sign Up
                await addUser({ email, password });
                alert('User registered successfully!');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                // Redirect the user to the dashboard or a protected page
                window.location.href = '/Dashboard'; // Example redirect after successful login
            } else {
                // Handle Sign In
                const { token, user } = await loginUser(email, password);
                alert('Logged in successfully!');
                // Store token for user session (e.g., in localStorage or cookies)
                localStorage.setItem('userToken', token);
                console.log('JWT Token:', token);
                // Redirect the user to the dashboard or a protected page
                window.location.href = '/Dashboard'; // Example redirect after successful login
            }
            
            
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
        }
    };

    return (
        <div className="loginFormBackground">
            <div className="loginFormContainer">
                <div className="loginTitleContainer">
                    <div className="loginFormTitle">{isSignUp ? 'Sign Up' : 'Sign In'}</div>
                    <div className="loginFormSubTitle">
                        {isSignUp
                            ? 'Enter your details to create a new account'
                            : 'Enter the information you registered with'}
                    </div>
                </div>
                <form className="loginFormInputs" onSubmit={handleSubmit}>
                    <EmailInput
                        placeholder="Enter your email ..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <PasswordInput
                        placeholder="Enter your password ..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {isSignUp && (
                        <PasswordInput
                            placeholder="Confirm your password ..."
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    )}
                    <button type="submit" className="submitButton text-primary">
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </button>

                    {error && <div className="errorMessage">{error}</div>} {/* Display error messages */}

                    <div className="dontHaveAccount">
                        {isSignUp ? (
                            <span>
                                Already have an account?{' '}
                                <button type="button" style={{ color: 'hsl(var(--primary))' }} onClick={() => setIsSignUp(false)}>
                                    Sign In
                                </button>
                            </span>
                        ) : (
                            <span>
                                Don't have an account?{' '}
                                <button type="button" style={{ color: 'hsl(var(--primary))' }} onClick={() => setIsSignUp(true)}>
                                    Sign Up
                                </button>
                            </span>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
