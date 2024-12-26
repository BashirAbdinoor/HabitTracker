// actions/action.ts
'use server'

import bcrypt from 'bcryptjs';
import User from '@/models/User';
import jwt from 'jsonwebtoken'; // To generate a JWT token for user authentication



// Sign Up: Adding a new user to the database
export const addUser = async (user) => {
    const { email, password } = user;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User with this email already exists');
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new User({
        email,
        password: hashedPassword,
    });

    // Save the new user
    const savedUser = await newUser.save();

    // Manually create a plain object, converting _id and excluding unwanted properties
    const plainUser = {
        email: savedUser.email,
        password: savedUser.password,
        _id: savedUser._id.toString(), // Convert ObjectId to string
        createdAt: savedUser.createdAt.toISOString(), // Convert date to string
        updatedAt: savedUser.updatedAt.toISOString(), // Convert date to string
    };

    // Return the plain object without any Mongoose-specific properties
    return plainUser;
};

// Sign In: Authenticate user by email and password
export const loginUser = async (email, password) => {
    console.log(email, password);
    
    // Find the user by email and convert it to a plain object
    const user = await User.findOne({ email }).lean(); // Using .lean() to get a plain object
    if (!user) {
        throw new Error('Invalid credentials');
    }

    // Compare the entered password with the hashed password stored in the DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    // Convert _id to string before returning the user
    user._id = user._id.toString(); // Make sure _id is a string

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return the user (plain object) and token
    return { token, user };
};