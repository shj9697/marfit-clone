//Make normal API requests and refresh the access token when it expires.

// The server keeps both tokens in httpOnly cookies (marfit_access, marfit_refresh).
// The browser sends them on its own, so this file never reads or stores a token.

const apiUrl = import.meta.env.VITE_API_URL || "";

async function refreshAccessToken() {
    // The refresh cookie is sent automatically; on success the server sets a new access token
    const res = await fetch(`${apiUrl}/api/auth/refresh`, {
        method: "POST",
        credentials: "include"
    });

    return res.ok;
}

export async function authFetch(path, options = {}) {

    const send = () => fetch(`${apiUrl}${path}`, {
        ...options,
        credentials: "include"
    });

    const res = await send();

    // Access token expired: refresh it, then retry the original request
    if (res.status === 401 && await refreshAccessToken()) {
        return send();
    }

    return res;
}
