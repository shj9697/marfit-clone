const apiUrl = import.meta.env.VITE_API_URL || "";

// One endpoint for Franchise, Bulk and Contact forms; `type` picks which
export async function createLeadAPI(leadDetails) {
    const res = await fetch(`${apiUrl}/api/leads`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(leadDetails)
    });
    const convertedData = await res.json();
    if (res.ok) {
        return {
            status: true,
            data: convertedData.data
        };
    }
    return {
        status: false,
        message: convertedData?.error?.message
    };
};
