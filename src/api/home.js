import api from "./client";

export async function getHomePageContentAPI() {
    try {
        const res = await api.get("/api/home");
        return {
            data: res.data?.data,
        };
    } catch (err) {
        return {
            data: null,
            message: err.response?.data?.error?.message || err.message
        };
    }
};

export async function getPincodeAPI(code) {
    try {
        const res = await api.get(`/api/pincodes/${code}`);
        return {
            data: res.data?.data
        };
    } catch (err) {
        return {
            data: null,
            message: err.response?.data?.error?.message || err.message
        };
    }
}
