import api from "./client";

// The signed-in user's orders, newest first
export async function getOrdersAPI() {
    try {
        const res = await api.get("/api/orders");
        return {
            status: true,
            data: res.data.data
        };
    } catch (err) {
        return {
            status: false,
            message: err.response?.data?.error?.message || err.message
        };
    }
}

// Public lookup: a guest needs the order's email, a signed-in owner doesn't
export async function trackOrderAPI(orderNumber, email) {
    const params = new URLSearchParams({ orderNumber });
    if (email) params.set("email", email);
    try {
        const res = await api.get(`/api/orders/track?${params}`);
        return {
            status: true,
            data: res.data.data
        };
    } catch (err) {
        return {
            status: false,
            message: err.response?.data?.error?.message || err.message
        };
    }
}
