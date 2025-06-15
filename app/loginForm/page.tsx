'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { addUser, loginUser } from '@/actions/action'; // Import actions
import EmailInput from './EmailInput/emailInput'; // Import EmailInput
import PasswordInput from './PasswordInput/passwordInput'; // Import PasswordInput
import './loginForm.css'; // Import CSS for styling
import { useGlobalContextProvider } from '../types/contextAPI';
import { textToIcon } from '../pages/AllHabits/components/IconsWindow/IconData';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // State for repeated password
    const [isSignUp, setIsSignUp] = useState(false); // Toggle between Sign Up and Sign In
    const [error, setError] = useState(''); // To handle error messages
    const [isAuthenticated, setIsAuthenticated] = useState(false); // New state to track if user is authenticated
    const searchParams = useSearchParams(); // Get query parameters from the URL

    const { allHabitsObject } = useGlobalContextProvider();
    const { allHabits, setAllHabits } = allHabitsObject;

    // Fetch habits when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            const fetchHabits = async () => {
                try {
                    // Make a GET request to the /api/habits endpoint
                    const response = await fetch('/api/habits');
                    const data = await response.json();

                    // Log response and data for debugging
                    console.log('API Response:', response);
                    console.log('Fetched Data:', data);
                    console.log('Fetched Data habits:', data.habits);
                    console.log('Current Habits State:', allHabits);

                    const habitsWithIcons = data.habits.map(habit => {
                        return {
                            ...habit, // Convert Mongoose document to a plain JavaScript object
                            icon: textToIcon(habit.icon), // Convert the icon string to an icon
                        };
                    });

                    // If the response is OK, update the global state with the fetched habits
                    if (response.ok) {
                        setAllHabits(habitsWithIcons);
                        console.log('Updated Habits State:', allHabits);
                    } else {
                        console.error('Error fetching habits:', data.error);
                    }
                } catch (error) {
                    console.error('Error fetching habits:', error);
                }
            };
            // alert("I am here at logingForm fetching habits")
            fetchHabits(); // Fetch habits once authenticated
            window.location.href = '/Dashboard'; // Redirect to Dashboard after fetching habits
        }
    }, [isAuthenticated, setAllHabits]); // Depend on isAuthenticated to trigger fetching habits

    useEffect(() => {
        console.log('Updated Habits State:', allHabits);
    }, [allHabits]); // This will run whenever allHabits is updated

    // Conditionally set sign-up or sign-in form based on query param
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
                setIsAuthenticated(true); // Mark the user as authenticated after successful sign-up
            } else {
                // Handle Sign In
                const { token, user } = await loginUser(email, password);
                alert('Logged in successfully!');
                localStorage.setItem('userToken', token); // Store token for user session
                console.log('JWT Token:', token);
                setIsAuthenticated(true); // Mark the user as authenticated after successful login
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
