export class StorageUtils {
    static accessTokenKey = 'accessToken';
    static refreshTokenKey = 'refreshToken';
    static userInfoKey = 'userInfo';

    static setAuthInfo(accessToken, refreshToken, userInfo = null) {
        localStorage.setItem(this.accessTokenKey, accessToken);
        localStorage.setItem(this.refreshTokenKey, refreshToken);
        if (userInfo) {
            localStorage.setItem(this.userInfoKey, JSON.stringify(userInfo));
        }
    }

    static removeAuthInfo() {
        localStorage.removeItem(this.accessTokenKey);
        localStorage.removeItem(this.refreshTokenKey);
        localStorage.removeItem(this.userInfoKey);
    }

    static getAuthInfo(key = null) {
        if (key) {
            switch (key) {
                case this.accessTokenKey:
                    return localStorage.getItem(this.accessTokenKey);
                case this.refreshTokenKey:
                    return localStorage.getItem(this.refreshTokenKey);
                case this.userInfoKey:
                    return JSON.parse(localStorage.getItem(this.userInfoKey));
                default:
                    return null;
            }
        } else {
            return {
                [this.accessTokenKey]: localStorage.getItem(this.accessTokenKey),
                [this.refreshTokenKey]: localStorage.getItem(this.refreshTokenKey),
                [this.userInfoKey]: JSON.parse(localStorage.getItem(this.userInfoKey))
            }
        }

    }
}