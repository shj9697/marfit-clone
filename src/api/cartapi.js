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
        items: [],
        totalAmount: 0,
        totalItems: 0,
        message: convertedData.error.message
    };
};

export async function addToCartAPI(productId, quantity) {
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

export async function updateCartItemAPI(productId, quantity) {
    const res = await fetch(`${apiUrl}/api/cart/items`, {
        method: 'PATCH',
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

export async function productDeleteFromCartAPI(productId) {
    const res = await fetch(`${apiUrl}/api/cart/items/${productId}`, {
        method: 'DELETE',
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
    return {
        status: false,
        message: convertedData.error.message
    };
};


// export async function orderDetailsPageAPI() {
//     const res = await fetch(`${apiUrl}/api/orders`);
//     const convertedData = await res.json();
//     if (res.ok) {
//         return {
//             status: true,
//             data: {
//                 orders: convertedData.data,
//             }
//         };
//     };
//     return {
//         status: false,
//         message: convertedData.error.message
//     };

// }
