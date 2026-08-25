export async function getProductCategoriesAPI() {
    const res = await fetch(`http://localhost:4000/api/categories`);
    const convertedData = await res.json();
    if (res.ok) {
        return {
            categories: convertedData.data.sort((a, b) => a.sortOrder - b.sortOrder),
        };
    }
    return {
        categories: [],
        message: convertedData.error.message
    };
};