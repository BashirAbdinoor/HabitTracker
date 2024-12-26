'use client';

import { GiTargetArrows } from "react-icons/gi";
import { useRouter } from 'next/navigation'; // Import the useRouter hook

export default function Navbar() {
    const router = useRouter();
    const defaultColor = "#hsl(142.1, 76.2%, 36.3%)";
    const backgroundColourObject = { backgroundColor: defaultColor };

    // Function to handle Sign In button click
    const handleSignInClick = () => {
        router.push('/loginForm?view=signIn'); // Pass the query parameter for Sign In
    };

    // Function to handle Sign Up button click
    const handleSignUpClick = () => {
        router.push('/loginForm?view=signUp'); // Pass the query parameter for Sign Up
    };

    return (
        <header>
            <div className="p-8 px-20">
                <div className="flex sm:items-center sm:justify-between">
                    <div className="text-center sm:text-left mb-7 sm:mb-0">
                        <div className="flex gap-2 items-center sm:justify-start justify-center">
                            <div className="p-2 rounded-md">
                                <GiTargetArrows className="text-white text-4xl" aria-hidden="true" />
                            </div>
                            <span className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: 'hsl(var(--primary))' }}>
                                Habit
                            </span>
                            <span className="font-light text-lg sm:text-xl">Tracker</span>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row sm:gap-4 sm:mt-0 sm:items-center">
                        <button
                            onClick={handleSignInClick} // Attach click handler to Sign In button
                            style={backgroundColourObject}
                            className="block sm:w-auto w-full rounded-lg px-9 py-3 text-sm sm:text-base font-medium transition-all duration-300 ease-in-out focus:outline-none hover:bg-primary focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            type="button"
                        >
                            Sign In
                        </button>
                        <button
                            onClick={handleSignUpClick} // Attach click handler to Sign Up button
                            className="block sm:w-auto w-full border rounded-lg px-9 py-3 text-sm sm:text-base font-medium transition-all duration-300 ease-in-out focus:outline-none hover:bg-primary hover:text-white border-primary text-primary"
                            type="button"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
