import { createContext, useContext, useEffect, useState } from "react";
import { meAPI } from "../api/authentication";
import { tokenStore } from "../api/tokenStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [wishList, setWishList] = useState(() => {
        const saved = localStorage.getItem("wishlist");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishList));
    }, [wishList]);


    const toggleWishList = (item) => {
        const exists = wishList.find((wishItem) => wishItem.id === item.id);
        setWishList(exists ? wishList.filter((wishItem) => wishItem.id !== item.id) : [...wishList, item]);
        toast.success(exists ? "Removed from Wishlist" : "Added to Wishlist")
    }

    const isInWishList = (id) => wishList.find((wishItem) => wishItem.id === id);

    useEffect(() => {
        let cancelled = false;
        async function load() {
            try {
                setLoading(true);
                setError(null);
                const data = await meAPI();
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
        <AuthContext.Provider value={{ user, setUser, loading, logout, authError: error, wishList, toggleWishList, isInWishList }}>
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