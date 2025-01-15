"use client";

import { useState } from "react";
import { signup } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user = await signup(email, password);

            const response = await fetch("/api/createUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: user.uid, username: user.email }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Failed to create user");
            }

            alert("Signup successful!");
            router.push("/login");
        } catch (err: unknown) {
            if (err instanceof Error) {
                // Type narrowing: if err is an instance of Error, we can safely access `message`
                setError(err.message);
            } else {
                // If err is not an instance of Error, we use a fallback message
                setError("An unexpected error occurred");
            }
        }
    };

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Signup</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
