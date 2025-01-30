import config from '../config/config';
import { LoginResponseType } from '../types/login-response.type';
import { PatternResponseType } from '../types/pattern-response.type';
import { RefreshResponseType } from '../types/refresh-response.type';
import { SignupResponseType } from '../types/signup-response.type';
import { HttpUtils } from '../utils/http-utils';
import { StorageUtils } from '../utils/storage-utils';

export class Auth {
    public static async login(data: object): Promise<LoginResponseType | null> {
        let loginResponseContent: LoginResponseType | null = null;

        try {
            let login: PatternResponseType = await HttpUtils.responce(config.api + '/login', false, 'POST', data);

            if (login.error || login.redirect || !login.content) {
                throw new Error();
            }

            loginResponseContent = login.content;
        } catch (error) {
            console.log(error);
        }

        return loginResponseContent;
    }

    public static async signup(data: object): Promise<SignupResponseType | null> {
        let signupResponseContent: SignupResponseType | null = null;

        try {
            let signup: PatternResponseType = await HttpUtils.responce(config.api + '/signup', false, 'POST', data);

            if (signup.error || signup.redirect || !signup.content) {
                throw new Error();
            }

            signupResponseContent = signup.content;
        } catch (error) {
            console.log(error);
        }

        return signupResponseContent;
    }

    public static async logout(data: object): Promise<void> {
        await HttpUtils.responce(config.api + '/logout', false, 'POST', data);
    }

    public static async refresh(): Promise<boolean> {
        let result: boolean = false;
        const refreshToken: string = StorageUtils.getAuthInfo(StorageUtils.refreshTokenKey) as string;

        if (refreshToken) {
            const response: Response = await fetch(config.api + '/refresh', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    refreshToken: refreshToken
                })
            });

            if (response.status === 200) {
                const tokensInfo: RefreshResponseType = await response.json();

                if (tokensInfo) {
                    StorageUtils.setAuthInfo((tokensInfo as RefreshResponseType).tokens.accessToken, (tokensInfo as RefreshResponseType).tokens.refreshToken);
                    result = true;
                }
            }
        }

        if (!result) {
            StorageUtils.removeAuthInfo();
        }

        return result;
    }
}