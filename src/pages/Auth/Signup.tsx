import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../../lib/axios";
import { useAuth } from "../../context/useAuth";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // Register the user
            const { data } = await api.post("/auth/register", {
                name,
                email,
                password,
            });

            // data = { message, token, user }

            // Save user to AuthContext
            login({
                name: data.user.name,
                email: data.user.email,
                token: data.token,
            });

            // Save token for axios interceptor
            localStorage.setItem("token", data.token);

            alert("Account created successfully!");
            navigate("/");
        } catch (err: any) {
            console.error("Signup error:", err);
            setError(
                err.response?.data?.message || "Signup failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[90vh] bg-gradient-to-br from-pink-50 via-white to-blue-50">
            <div className="card p-8 w-full max-w-md bg-white shadow-lg rounded-2xl border border-pink-100">
                <h1 className="text-3xl font-bold mb-6 text-center text-pink-500">
                    Create Your Account
                </h1>

                <form onSubmit={handleSignup} className="space-y-5">
                    <div>
                        <label className="block text-sm mb-1 font-medium text-gray-600">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1 font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1 font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <p className="text-red-600 text-sm bg-red-50 p-2 rounded text-center">
                            {error}
                        </p>
                    )}

                    <button
                        disabled={loading}
                        className={`w-full mt-2 py-2 rounded-xl text-white font-medium transition ${loading
                                ? "bg-pink-300 cursor-not-allowed"
                                : "bg-pink-500 hover:bg-pink-600"
                            }`}
                        type="submit"
                    >
                        {loading ? "Creating..." : "Create Account"}
                    </button>
                </form>

                <p className="text-sm text-center mt-4 text-gray-600">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-pink-500 font-medium hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
