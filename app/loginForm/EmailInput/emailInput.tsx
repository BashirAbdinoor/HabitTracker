'use client';

import React from 'react';
import './emailInput.css';
import { MdEmail } from 'react-icons/md';

const EmailInput = ({ value, onChange, placeholder }) => {
    return (
        <div className="emailInputRoot">
            {/* Email Icon on the Left */}
            <div className="emailIcon">
                <MdEmail className="text-var(--background) text-2xl" aria-hidden="true" />
            </div>
            {/* Email input field */}
            <input
                name="email"
                className="emailInputContainer"
                type="email"
                value={value}  // Controlled value
                onChange={onChange}  // Controlled change handler
                placeholder={placeholder}
            />
        </div>
    );
};

export default EmailInput;
