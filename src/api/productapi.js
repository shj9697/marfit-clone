export async function getProductsAPI({ page, limit, category, subCategory, search, sort, minPrice, maxPrice, embossable, inStock }) {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("limit", limit);
    category && params.append("category", category);
    subCategory && params.append("subCategory", subCategory);
    search && params.append("search", search);
    sort && params.append("sort", sort);
    minPrice && params.append("minPrice", minPrice);
    maxPrice && params.append("maxPrice", maxPrice);
    embossable && params.append("embossable", embossable);
    inStock && params.append("inStock", inStock);

    const res = await fetch(`http://localhost:4000/api/products?${params}`);
    const convertedData = await res.json();
    if (res.ok) {
        return {
            products: convertedData.data,
            total: convertedData.totalProducts,
            totalPages: convertedData.totalPages
        };
    }
    return {
        products: [],
        total: 0,
        totalPages: 0,
        message: convertedData.error.message
    };
};

export async function getRelatedProductsAPI(identifier, limit = 10) {
    const res = await fetch(`http://localhost:4000/api/products/${identifier}/related?limit=${limit}`);
    const convertedData = await res.json();
    if (res.ok) {
        return {
            similar: convertedData.data.similar,
            youMayAlsoLike: convertedData.data.youMayAlsoLike,
        };
    }
    return {
        similar: [],
        youMayAlsoLike: [],
        message: convertedData.error.message
    };
};



