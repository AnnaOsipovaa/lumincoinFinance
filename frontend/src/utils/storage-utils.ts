import { UserInfoType } from "../types/user-info.type";

export class StorageUtils {
    public static accessTokenKey: string = 'accessToken';
    public static refreshTokenKey: string = 'refreshToken';
    public static userInfoKey: string = 'userInfo';

    public static setAuthInfo(accessToken: string, refreshToken: string, userInfo?: UserInfoType) {
        localStorage.setItem(this.accessTokenKey, accessToken);
        localStorage.setItem(this.refreshTokenKey, refreshToken);
        if (userInfo) {
            localStorage.setItem(this.userInfoKey, JSON.stringify(userInfo));
        }
    }

    public static removeAuthInfo(): void {
        localStorage.removeItem(this.accessTokenKey);
        localStorage.removeItem(this.refreshTokenKey);
        localStorage.removeItem(this.userInfoKey);
    }

    public static getAuthUserInfo(): UserInfoType | null {
        let userInfo: UserInfoType | null = null;
        const userInfoString: string | null = localStorage.getItem(this.userInfoKey);
        if (userInfoString) {
            userInfo = JSON.parse(userInfoString);
        }
        return userInfo;
    }

    public static getAuthToken(key: string): string | null {
        switch (key) {
            case this.accessTokenKey:
                return localStorage.getItem(this.accessTokenKey);

            case this.refreshTokenKey:
                return localStorage.getItem(this.refreshTokenKey);
            default:
                return null;
        }
    }
}