import api from "./client";

export async function getProductsAPI({ page, limit, category, subCategory, search, sort, minPrice, maxPrice, embossable, inStock }) {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("limit", limit);
    category && params.append("category", category);
    subCategory && params.append("subcategory", subCategory);
    search && params.append("search", search);
    sort && params.append("sort", sort);
    minPrice && params.append("minPrice", minPrice);
    maxPrice && params.append("maxPrice", maxPrice);
    embossable && params.append("embossable", embossable);
    inStock && params.append("inStock", inStock);

    try {
        const res = await api.get(`/api/products?${params}`);
        return {
            products: res.data.data,
            total: res.data.totalProducts,
            totalPages: res.data.totalPages
        };
    } catch (error) {
        return {
            products: [],
            total: 0,
            totalPages: 0,
            message: error.response?.data?.error?.message
        };
    }
};

export async function getRelatedProductsAPI(identifier, limit = 10) {
    try {
        const res = await api.get(`/api/products/${identifier}/related?limit=${limit}`);
        return {
            similar: res.data.data.similar,
            youMayAlsoLike: res.data.data.youMayAlsoLike,
        };
    } catch (error) {
        return {
            similar: [],
            youMayAlsoLike: [],
            message: error.response?.data?.error?.message
        };
    }
}

// Navbar suggestions: categories first, then products. Under 2 characters returns []
export async function searchProductsAPI(query) {
    try {
        const res = await api.get(`/api/products/search?q=${encodeURIComponent(query)}`);
        return {
            results: res.data.data
        };
    } catch (error) {
        return {
            results: [],
            message: error.response?.data?.error?.message
        };
    }
};

export async function getProductDetailsAPI(id) {
    try {
        const res = await api.get(`/api/products/${id}`);
        return {
            data: res.data.data
        }
    } catch (error) {
        return {
            data: [],
            message: error.response?.data?.error?.message
        };
    }
}

