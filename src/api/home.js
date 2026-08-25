export async function getHomePageContentAPI() {
    const res = await fetch(`http://localhost:4000/api/home`);
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