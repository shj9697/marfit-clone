import { createContext, useContext, useEffect, useState } from "react";
import { meAPI } from "../api/authentication";
import { tokenStore } from "../api/tokenStore";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;
        async function load() {
            try {
                setLoading(true);
                setError(null);
                const data = await meAPI();
                console.log(data)
                if (!cancelled) setUser(data);
            } catch (err) {
                if (!cancelled) setError(err.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        const access_token = tokenStore.getAccess();
        if (access_token) {
            load();
        }
        return () => { cancelled = true; };
    }, []);

    const logout = () => {
        tokenStore.clear();
        setUser(null);
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, logout, authError: error }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
};