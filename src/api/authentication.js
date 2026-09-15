import { tokenStore } from "./tokenStore";

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
                email: convertedData.data.user.email,
                password: convertedData.data.user.hasPassword,
                name: convertedData.data.user.name
            }
        };
    };
    return { status: false, message: convertedData.error?.message };
};


export async function loginAPI(email, password) {
    const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const convertedData = await res.json();
    if (!res.ok)
        return {
            status: false,
            message: convertedData.error?.message
        };

    const { token, user } = convertedData.data;
    tokenStore.save(token, null);

    return {
        status: true,
        data: user
    };
};


export async function meAPI() {
    const token = tokenStore.getAccess();
    const res = await fetch(`${apiUrl}/api/auth/me`, {
        headers: {
            "Authorization": `Bearer ` + token
        }
    });
    if (!res.ok) return null;
    const convertedData = await res.json();
    return convertedData.data;
}