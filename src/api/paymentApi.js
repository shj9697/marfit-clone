import api from "./client";


// Which payment options the server offers: { cod, razorpay, razorpayKeyId }
export async function getPaymentConfigAPI() {
    try {
        const res = await api.get(`/api/payments/config`);
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

// Cash on delivery: the order is placed straight away from the cart
export async function placeOrderAPI(addressId) {
    try {
        const res = await api.post(`/api/orders`, { addressId });
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

// Step 1 of online payment: the server prices the cart and opens a Razorpay order
export async function createRazorpayOrderAPI(addressId) {
    try {
        const res = await api.post(`/api/payments/razorpay/order`, { addressId });
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

// Step 2: the server checks Razorpay's signature, then places the order
export async function verifyRazorpayPaymentAPI(razorpayResponse) {
    try {
        const res = await api.post(`/api/payments/razorpay/verify`, razorpayResponse);
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
