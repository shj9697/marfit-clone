const apiUrl = import.meta.env.VITE_API_URL || "";

export async function getAuthenticationAPI(email, password, name) {
    const res = await fetch(`${apiUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
    });
    const convertedData = await res.json();
    if (res.ok) {
        return {
            status: true,
            data: {
                email: convertedData.data.user.email,
                password: convertedData.data.user.hasPassword,
                name: convertedData.data.user.name
            }
        };
    };

    return { status: false, message: convertedData.error?.message };
};