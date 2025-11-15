import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../../lib/axios";
import { useAuth } from "../../context/useAuth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const { data } = await api.post("/auth/login", { email, password });

            // Save user into AuthContext
            login({
                name: data.name,
                email: data.email,
                token: data.token,
            });

            // localStorage.setItem("token", data.token);
            // localStorage.setItem("user", JSON.stringify(data.user));

            alert("Login successful!");
            navigate("/");
           // window.location.reload();
        } catch (err: any) {
            //console.error("Login error:", err);
            setError(
                err.response?.data?.message || "Login failed. Please check your credentials."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[90vh] bg-gradient-to-br from-blue-50 via-white to-pink-50">
            <div className="card p-8 w-full max-w-md bg-white shadow-lg rounded-2xl border border-blue-100">
                <h1 className="text-3xl font-bold mb-6 text-center text-blue-500">
                    Welcome Back
                </h1>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm mb-1 font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
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
                            className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
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
                            ? "bg-blue-300 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                            }`}
                        type="submit"
                    >
                        {loading ? "Signing in..." : "Login"}
                    </button>
                </form>

                <p className="text-sm text-center mt-4 text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-500 font-medium hover:underline">
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    );
}
