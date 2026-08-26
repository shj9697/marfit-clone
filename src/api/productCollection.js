export async function productCollectionAPI() {
    const res = await fetch(`http://localhost:4000/api/categories`);
    const convertedData = await res.json();
    if (res.ok) {
        return {
            collections: convertedData.data.collections,
        };
    }
    return {
        collections: [],
        message: convertedData.error.message
    };
};