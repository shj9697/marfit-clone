const apiUrl = import.meta.env.VITE_API_URL || "";

export async function getCartAPI() {
    const res = await fetch(`${apiUrl}/api/cart`);
    const convertedData = await res.json();
    if (res.ok) {
        return {
            items: convertedData.data.items,
            totalItems: convertedData.data.summary.itemCount,
            totalAmount: convertedData.data.summary.subtotal
        };
    }
    return {
        item: [],
        totalAmount: 0,
        totalItems: 0,
        message: convertedData.error.message
    };
};

export async function addToCartAPI(productId, quantity = 1) {
    const res = await fetch(`${apiUrl}/api/cart/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity }),
    });
    const convertedData = await res.json();
    if (res.ok) {
        return {
            status: true,
            data: {
                items: convertedData.data.items,
                totalItems: convertedData.data.summary.itemCount,
                totalAmount: convertedData.data.summary.subtotal
            }
        };
    };
    return { status: false, message: convertedData.error.message };
};

export async function removeFromCartAPI(productId) {
    const res = await fetch(`${apiUrl}/api/cart/items/remove`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
    });
    const convertedData = await res.json();

    if (res.ok) {
        return {
            status: true,
            data: {
                items: convertedData.data.items,
                totalItems: convertedData.data.summary.itemCount,
                totalAmount: convertedData.data.summary.subtotal
            }
        };
    };
    return { status: false, message: convertedData.error.message };
};