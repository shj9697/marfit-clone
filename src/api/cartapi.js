export async function getCartAPI() {
    const res = await fetch(`http://localhost:4000/api/cart`);
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

export async function addToCartAPI(productId) {
    const res = await fetch(`http://localhost:4000/api/cart/items`, {
        method: 'POST',
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

export async function removeFromCartAPI(productId) {
    const res = await fetch("http://localhost:4000/api/cart/items/remove", {
        method: 'POST',
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