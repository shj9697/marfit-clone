import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "",
});

export async function getCollectionBySlugAPI(slug) {
    try {
        const res = await api.get(`/api/collections/${slug}`);
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
