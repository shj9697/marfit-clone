import { tokenStore } from "./tokenStore";

const apiUrl = import.meta.env.VITE_API_URL || "";


function errorMessage(body) {
    return body?.error?.message ?? 'Something went wrong. Please try again.';
};

// A 401 means the server no longer accepts the token; clearing it lets AuthProvider log the user out
function failure(res, body) {
    if (res.status === 401) tokenStore.clear();
    return { status: false, message: errorMessage(body) };
};

export async function getCartAPI() {
    const token = tokenStore.getAccess();
    const res = await fetch(`${apiUrl}/api/cart`, {
        headers: {
            "Authorization": token ? `Bearer ` + token : ""
        }
    });
    const convertedData = await res.json();
    if (res.ok && convertedData) {
        return {
            status: true,
            data: {
                items: convertedData?.data?.items || [],
                totalItems: convertedData?.data?.summary?.itemCount || 0,
                totalAmount: convertedData?.data?.summary?.subtotal || 0
            }
        };
    }
    return failure(res, convertedData);
};

export async function addToCartAPI(productId, quantity) {
    const token = tokenStore.getAccess();
    const res = await fetch(`${apiUrl}/api/cart/items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": token ? `Bearer ` + token : ""
        },
        body: JSON.stringify({ productId, quantity }),
    });
    const convertedData = await res.json();
    if (res.ok && convertedData) {
        return {
            status: true,
            data: {
                items: convertedData.data.items,
                totalItems: convertedData.data.summary.itemCount,
                totalAmount: convertedData.data.summary.subtotal
            }
        };
    };
    return failure(res, convertedData);
};

export async function updateCartItemAPI(productId, quantity) {
    const token = tokenStore.getAccess();
    const res = await fetch(`${apiUrl}/api/cart/items`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": token ? `Bearer ` + token : ""
        },
        body: JSON.stringify({ productId, quantity }),
    });
    const convertedData = await res.json();

    if (res.ok && convertedData) {
        return {
            status: true,
            data: {
                items: convertedData.data.items,
                totalItems: convertedData.data.summary.itemCount,
                totalAmount: convertedData.data.summary.subtotal
            }
        };
    };
    return failure(res, convertedData);
};

export async function productDeleteFromCartAPI(productId) {
    const token = tokenStore.getAccess();
    const res = await fetch(`${apiUrl}/api/cart/items/${encodeURIComponent(productId)}`, {
        method: 'DELETE',
        headers: {
            "Authorization": token ? `Bearer ` + token : ""
        }
    });
    const convertedData = await res.json();

    if (res.ok && convertedData) {
        return {
            status: true,
            data: {
                items: convertedData.data.items,
                totalItems: convertedData.data.summary.itemCount,
                totalAmount: convertedData.data.summary.subtotal
            }
        };
    };
    return failure(res, convertedData);
};
