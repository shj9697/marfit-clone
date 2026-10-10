import { authFetch } from "./authFetch";

const apiUrl = import.meta.env.VITE_API_URL || "";

// The signed-in user's orders, newest first
export async function getOrdersAPI() {
    const res = await authFetch(`${apiUrl}/api/orders`);
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
