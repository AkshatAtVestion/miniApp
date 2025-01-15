import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

// Signup function
export const signup = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error: unknown) {
        if (error instanceof Error) {
            // If the error is an instance of Error, safely access its message
            throw new Error(error.message);
        } else {
            // Handle unexpected errors
            throw new Error("An unexpected error occurred during signup");
        }
    }
};

// Login function
export const login = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error: unknown) {
        if (error instanceof Error) {
            // If the error is an instance of Error, safely access its message
            throw new Error(error.message);
        } else {
            // Handle unexpected errors
            throw new Error("An unexpected error occurred during login");
        }
    }
};
