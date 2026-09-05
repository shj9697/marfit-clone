const apiUrl = import.meta.env.VITE_API_URL || "";

export async function getHomePageContentAPI() {
    const res = await fetch(`${apiUrl}/api/home`);
    const convertedData = await res.json();
    if (res.ok) {
        return {
            data: convertedData?.data,
        };
    }
    return {
        data: null,
        message: convertedData?.error?.message
    };
};


export async function getPincodeAPI(code) {
    const res = await fetch(`${apiUrl}/api/pincodes/${code}`);
    const convertedData = await res.json();
    if (res.ok) {
        return {
            data: convertedData?.data
        }
    }
    return {
        data: null,
        message: convertedData?.error?.message
    };
}