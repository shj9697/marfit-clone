import api from "./client";

export async function getProductCategoriesAPI() {
    try {
        const res = await api.get(`/api/categories`);

        return {
            categories: res.data.data.sort((a, b) => a.sortOrder - b.sortOrder),
        };
    } catch (error) {
        return {
            categories: [],
            message: error.response?.data?.error?.message
        };
    }
};

export async function getProductCategoriesBySlugAPI(slug) {
    try {
        const res = await api.get(`/api/categories/` + slug);
        return {
            categories: res.data.data,
        };
    } catch (error) {
        return {
            categories: [],
            message: error.response?.data?.error?.message
        };
    }
};

export async function getProductCategoriesBySubSlugAPI(categorySlug, subCategorySlug) {
    try {
        const res = await api.get(`/api/categories/${categorySlug}/${subCategorySlug}`);
        return {
            categories: res.data.data,
        };
    } catch (error) {
        return {
            categories: [],
            message: error.response?.data?.error?.message
        };
    }
};
