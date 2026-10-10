import { authFetch } from "./authFetch";

// The signed-in user's orders, newest first
export async function getOrdersAPI() {
    const res = await authFetch("/api/orders");
    const convertedData = await res.json();
    if (res.ok) {
        return {
            status: true,
            data: convertedData.data
        };
    }
    return {
        status: false,
        message: convertedData?.error?.message
    };
}

// Public lookup: a guest needs the order's email, a signed-in owner doesn't
export async function trackOrderAPI(orderNumber, email) {
    const params = new URLSearchParams({ orderNumber });
    if (email) params.set("email", email);
    const res = await authFetch(`/api/orders/track?${params}`);
    const convertedData = await res.json();
    if (res.ok) {
        return {
            status: true,
            data: convertedData.data
        };
    }
    return {
        status: false,
        message: convertedData?.error?.message
    };
}
