import { authFetch } from "./authFetch";

const apiUrl = import.meta.env.VITE_API_URL || "";

// Which payment options the server offers: { cod, razorpay, razorpayKeyId }
export async function getPaymentConfigAPI() {
    const res = await fetch(`${apiUrl}/api/payments/config`);
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

// Cash on delivery: the order is placed straight away from the cart
export async function placeOrderAPI(addressId) {
    const res = await authFetch(`${apiUrl}/api/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ addressId })
    });
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

// Step 1 of online payment: the server prices the cart and opens a Razorpay order
export async function createRazorpayOrderAPI(addressId) {
    const res = await authFetch(`${apiUrl}/api/payments/razorpay/order`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ addressId })
    });
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

// Step 2: the server checks Razorpay's signature, then places the order
export async function verifyRazorpayPaymentAPI(razorpayResponse) {
    const res = await authFetch(`${apiUrl}/api/payments/razorpay/verify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(razorpayResponse)
    });
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
