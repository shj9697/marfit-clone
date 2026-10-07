import { authFetch } from "./authFetch";

const apiUrl = import.meta.env.VITE_API_URL || "";

// Default address first, then newest
export async function getAddressesAPI() {
    const res = await authFetch(`${apiUrl}/api/addresses`);
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
};

export async function addAddressAPI(addressDetails) {
    const res = await authFetch(`${apiUrl}/api/addresses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(addressDetails)
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
};

export async function updateAddressAPI(addressId, addressDetails) {
    const res = await authFetch(`${apiUrl}/api/addresses/${addressId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(addressDetails)
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
};

// Returns the addresses that are left
export async function deleteAddressAPI(addressId) {
    const res = await authFetch(`${apiUrl}/api/addresses/${addressId}`, {
        method: 'DELETE'
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
};
