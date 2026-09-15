import Cookies from 'js-cookie';

const ACCESS = 'marfit_access';
const REFRESH = 'marfit_refresh';

const jar = Cookies.withAttributes({
    path: '/',
    sameSite: 'Lax',
    secure: location.protocol === 'https:'
});

const ACCESS_TTL = 15 / (24 * 60);  // 15 minutes, expressed in days
const REFRESH_TTL = 7;              // 7 days

export const tokenStore = {
    save(accessToken, refreshToken) {
        jar.set(ACCESS, accessToken, { expires: ACCESS_TTL });
        if (refreshToken) jar.set(REFRESH, refreshToken, { expires: REFRESH_TTL });
    },
    getAccess: () => jar.get(ACCESS) ?? null,
    getRefresh: () => jar.get(REFRESH) ?? null,
    clear() {
        jar.remove(ACCESS);
        jar.remove(REFRESH);
    }
};
