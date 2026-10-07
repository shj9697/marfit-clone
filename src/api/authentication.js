import { authFetch } from "./authFetch";

const apiUrl = import.meta.env.VITE_API_URL || "";

export async function getAuthenticationAPI(email, password, name) {
    const res = await fetch(`${apiUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
    });
    const convertedData = await res.json();
    if (res.ok) {
        return {
            status: true,
            data: {
                email: convertedData?.data?.user?.email,
                password: convertedData?.data?.user?.hasPassword,
                name: convertedData?.data?.user?.name
            }
        };
    };
    return { status: false, message: convertedData.error?.message };
};


export async function loginAPI(email, password) {
    const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        // Lets the browser keep the token cookies the server sets
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });
    const convertedData = await res.json();
    if (!res.ok) {
        return {
            status: false,
            message: convertedData?.error?.message
        };
    }

    return {
        status: true,
        data: convertedData?.data?.user
    };
}

// The tokens are httpOnly cookies, so JavaScript can't delete them; the server clears them
export async function logoutAPI() {
    const res = await fetch(`${apiUrl}/api/auth/logout`, {
        method: "POST",
        credentials: "include"
    });
    if (res.ok) return { status: true };
    const convertedData = await res.json();
    return {
        status: false,
        message: convertedData?.error?.message
    };
}


// authentication.js

// loginAPI()
//      ↓
// login backend

// refreshTokenAPI()
//      ↓
// refresh backend

// meAPI()
//      ↓
// current-user backend

export async function meAPI() {
    const res = await authFetch("/api/auth/me");
    // 401 means nobody is signed in; anything else is a failure, not a sign-out
    if (res.status === 401) return null;
    if (!res.ok) throw new Error("Could not load your account. Please try again.");
    const convertedData = await res.json();
    return convertedData.data;
}

export async function getWishlistAPI() {
    const res = await authFetch("/api/wishlist");
    const convertedData = await res.json();
    if (res.ok) {
        return {
            status: true,
            data: {
                productData: convertedData.data,
                total: convertedData.total
            }
        };
    };
    return {
        status: false,
        message: convertedData.error?.message
    };
};

export async function addToWishlistAPI(productId) {
    const res = await authFetch("/api/wishlist", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId })
    });
    const convertedData = await res.json();
    if (res.ok) {
        return {
            status: true,
            data: {
                productData: convertedData.data,
                total: convertedData.total
            }
        };
    };
    return {
        status: false,
        message: convertedData.error?.message
    };
};

export async function removeFromWishlistAPI(productId) {
    const res = await authFetch(`/api/wishlist/${productId}`, {
        method: 'DELETE'
    });
    const convertedData = await res.json();
    if (res.ok) {
        return {
            status: true,
            data: {
                productData: convertedData.data,
                total: convertedData.total
            }
        };
    };
    return {
        status: false,
        message: convertedData.error?.message
    };
};



