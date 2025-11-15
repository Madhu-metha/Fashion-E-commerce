import { createContext, useState, useEffect } from "react";

interface User {
    name: string;
    email: string;
    token: string;
}

interface AuthContextType {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export default AuthContext;

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("user");
        try {
            if (stored) {
                const parsed = JSON.parse(stored);
                setUser(parsed);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Invalid JSON found in localStorage 'user'. Clearing it...");
            localStorage.removeItem("user");
            setUser(null);
        }
    }, []);

    const login = (data: User) => {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("token", data.token);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);

        localStorage.removeItem("cart");
        window.location.reload();
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
