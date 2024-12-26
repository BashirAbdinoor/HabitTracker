'use client';

import React, { useState, useRef } from 'react';
import { IoIosLock } from 'react-icons/io';
import { TiEye } from 'react-icons/ti';
import { FaEyeSlash } from 'react-icons/fa';
import './passwordInput.css'; // Importing CSS

const PasswordInput = ({ value, onChange, placeholder }) => {
    const [isVisible, setIsVisible] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const toggleVisibility = () => {
        setIsVisible((prevState) => !prevState);
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
                const inputLength = inputRef.current.value.length;
                inputRef.current.setSelectionRange(inputLength, inputLength);
            }
        }, 0);
    };

    return (
        <div className="passInputRoot">
            {/* Lock icon on the left side */}
            <div className="passIcon">
                <IoIosLock className="text-var(--background) text-2xl" aria-hidden="true" />
            </div>

            {/* Password input */}
            <input
                ref={inputRef}
                className="passInputContainer"
                type={isVisible ? 'text' : 'password'}
                value={value}  // Controlled value
                onChange={onChange}  // Controlled change
                placeholder={placeholder}
            />

            {/* Eye icon to toggle visibility */}
            <div onClick={toggleVisibility} className="eyeIcon">
                {isVisible ? (
                    <FaEyeSlash className="text-var(--background) text-2xl" aria-hidden="true" />
                ) : (
                    <TiEye className="text-var(--background) text-2xl" aria-hidden="true" />
                )}
            </div>
        </div>
    );
};

export default PasswordInput;
