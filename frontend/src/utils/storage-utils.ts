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

    public static getAuthInfo(key: string | null): string | object | null {
        if (key) {
            switch (key) {
                case this.accessTokenKey:
                    return localStorage.getItem(this.accessTokenKey);
                case this.refreshTokenKey:
                    return localStorage.getItem(this.refreshTokenKey);
                case this.userInfoKey:
                    const userInfo: string | null = localStorage.getItem(this.userInfoKey);
                    if(userInfo){
                        return JSON.parse(userInfo);
                    }
                default:
                    return null;
            }
        } else {
            const userInfo: string | null = localStorage.getItem(this.userInfoKey);
            return {
                [this.accessTokenKey]: localStorage.getItem(this.accessTokenKey),
                [this.refreshTokenKey]: localStorage.getItem(this.refreshTokenKey),
                [this.userInfoKey]: userInfo ? JSON.parse(userInfo) : null
            }
        }
    }
}