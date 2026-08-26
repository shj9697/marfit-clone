export async function getCollectionBySlugAPI(slug) {
    const res = await fetch(`http://localhost:4000/api/collections/` + slug);
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