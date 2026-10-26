import axios from "axios";

const apiUrl = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "",
});

export async function getCollectionBySlugAPI(slug) {
    const res = await api.get(`/api/collections/` + slug);
    const convertedData = await res.json();
    if (res.ok) {
        return {
            data: convertedData.data,
        };
    }
    return {
        data: null,
        message: convertedData.error.message
    };
};