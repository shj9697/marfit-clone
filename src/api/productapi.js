export async function getProductsAPI() {
    const res = await fetch(`http://localhost:4000/api/products?page=1&limit=5`);
    const convertedData = await res.json();
    if (res.ok) {
        return {
            products: convertedData.data,
            total: convertedData.totalProducts,
        };
    }
    return {
        products: [],
        total: 0,
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


