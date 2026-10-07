import { authFetch } from "./authFetch";

export async function getCartAPI() {
    const res = await authFetch("/api/cart");
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
    return {
        status: false,
        message: convertedData?.error?.message
    };
};

export async function addToCartAPI(productId, quantity) {
    const res = await authFetch(`/api/cart/items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
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
    return {
        status: false,
        message: convertedData?.error?.message
    };
};

export async function updateCartItemAPI(productId, quantity) {
    const res = await authFetch(`/api/cart/items`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
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
    return {
        status: false,
        message: convertedData?.error?.message
    };
};

export async function productDeleteFromCartAPI(productId) {
    const res = await authFetch(`/api/cart/items/${encodeURIComponent(productId)}`, {
        method: 'DELETE',
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
    return {
        status: false,
        message: convertedData?.error?.message
    };
};
