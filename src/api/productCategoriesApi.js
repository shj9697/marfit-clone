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


export async function getProductCategoriesBySlugAPI(slug) {
    const res = await fetch(`http://localhost:4000/api/categories/` + slug);
    const convertedData = await res.json();
    if (res.ok) {
        return {
            categories: convertedData.data,
        };
    }
    return {
        categories: [],
        message: convertedData.error.message
    };
};


export async function getProductCategoriesBySubSlugAPI(categorySlug, subCategorySlug) {
    const res = await fetch(`http://localhost:4000/api/categories/${categorySlug}/${subCategorySlug}`);
    const convertedData = await res.json();
    if (res.ok) {
        return {
            categories: convertedData.data,
        };
    }
    return {
        categories: [],
        message: convertedData.error.message
    };
};
