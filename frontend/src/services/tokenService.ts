export const tokenService = {

    setToken: (token: string) => {
        document.cookie = `accessToken=${token};`;
    },

    getToken: (): string | null => {
        const cookies = document.cookie.split('; ');
        const accessTokenCookie = cookies.find((row) => row.startsWith('accessToken='));
        return accessTokenCookie ? accessTokenCookie.split('=')[1] : null;
    },

    removeToken: () => {
        document.cookie = `accessToken=; path=/; max-age=0; secure; HttpOnly; SameSite=Strict`;
    }
}