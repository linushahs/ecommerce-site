import { getCookie, setCookie } from "cookies-next";

const setAuthCookie = (token: string, name: string) => {
    const toBase64 = Buffer.from(token).toString('base64');

    setCookie(name, toBase64, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
        // more security options here
        sameSite: 'strict',
        // httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
    });
};

const getAuthCookie = (name: string) => {
    const cookie = getCookie(name);

    if (!cookie) return undefined;

    return Buffer.from(cookie, 'base64').toString('ascii');
};

const getValidAuthTokens = (name: "access" | "refresh") => {
    const access = getAuthCookie('access_token');
    const refresh = getAuthCookie('refresh_token');

    const now = new Date();
    const accessTokenDate = new Date(access || 0);
    const refreshTokenDate = new Date(refresh || 0);

    const tokens = {
        access,
        refresh
    };

    return tokens[name];
};

export { setAuthCookie, getAuthCookie, getValidAuthTokens };