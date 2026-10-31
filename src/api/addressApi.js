import api from "./client";

// Default address first, then newest
export async function getAddressesAPI() {
    try {
        const res = await api.get("/api/addresses");
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
};

export async function addAddressAPI(addressDetails) {
    try {
        const res = await api.post("/api/addresses", addressDetails);
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
};

export async function updateAddressAPI(addressId, addressDetails) {
    try {
        const res = await api.patch(`/api/addresses/${addressId}`, addressDetails);
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
};

// Returns the addresses that are left
export async function deleteAddressAPI(addressId) {
    try {
        const res = await api.delete(`/api/addresses/${addressId}`);
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
};
