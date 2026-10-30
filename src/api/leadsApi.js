import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "",
});
// One endpoint for Franchise, Bulk and Contact forms; `type` picks which
export async function createLeadAPI(leadDetails) {
    try {
        const res = await api.post("/api/leads", leadDetails);
        return {
            status: true,
            data: res.data?.data
        };
    } catch (err) {
        return {
            status: false,
            message: err.response?.data?.error?.message || err.message
        };
    }
};
