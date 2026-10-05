import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { addToWishlistAPI, getWishlistAPI, meAPI, removeFromWishlistAPI } from "../api/authentication";
import { tokenStore } from "../api/tokenStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [wishList, setWishList] = useState([]);

    useEffect(() => {
        if (!user) {
            setWishList([]);
            return;
        }
        let cancelled = false;
        async function load() {
            try {
                const response = await getWishlistAPI();
                if (!cancelled) setWishList(response.data.productData);
            } catch (err) {
                if (!cancelled) toast.error(err.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        load();
        return () => { cancelled = true; };
    }, [user]);

    const toggleWishList = async (item) => {
        if (!user) {
            toast.error("Please login");
            return;
        }
        const exists = wishList.find((wishListItem) => wishListItem.id === item.id);
        try {
            const response = exists ? await removeFromWishlistAPI(item.id) : await addToWishlistAPI(item.id);
            if (!response.status) {
                toast.error(response.message);
                return;
            }
            setWishList(response.data.productData);
            toast.success(exists ? "Removed from Wishlist" : "Added to Wishlist");
        } catch (err) {
            toast.error(err.message);
        }
    };

    const isInWishList = (id) => !!user && wishList.find((wishItem) => wishItem.id === id);

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

    const logout = useCallback(() => {
        tokenStore.clear();
        setUser(null);
        navigate("/");
        setWishList([]);
    }, [navigate]);


    useEffect(() => {
        if (!user) return;
        const checkSession = () => {
            if (!tokenStore.getAccess()) {
                toast.error("Session expired");
                logout();
            }
        };
        const timer = setInterval(checkSession, 15 * 1000);
        window.addEventListener("focus", checkSession);
        return () => {
            clearInterval(timer);
            window.removeEventListener("focus", checkSession);
        };
    }, [user, logout]);

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