import config from '../config/config';
import { ErrorResponseType } from '../types/error-response.type';
import { LoginResponseErrorType } from '../types/login-response-error.type';
import { LoginResponseType } from '../types/login-response.type';
import { LoginType } from '../types/login.type';
import { PatternResponseType } from '../types/pattern-response.type';
import { HttpUtils } from '../utils/http-utils';
import { StorageUtils } from '../utils/storage-utils';

export class Auth{
    public static async login(data: LoginType): Promise<LoginResponseType | boolean>{ 
        let login: PatternResponseType = await HttpUtils.responce(config.api + '/login', false, 'POST', data);

        let loginResponseContent: LoginResponseType | LoginResponseErrorType = login.content;

        if ((loginResponseContent as LoginResponseErrorType).error !== undefined) {
            return false;
        }
    
        return loginResponseContent as LoginResponseType;
    }
    
    static async signup(data){ 
        let signup = await HttpUtils.responce(config.api + '/signup', false, 'POST', data);

        if (signup.error || 
            !signup.content.user ||
            !signup.content.user.id || 
            !signup.content.user.email || 
            !signup.content.user.name ||
            !signup.content.user.lastName) {
            return false;
        }

        return signup.content;
    }

    static async logout(data){
        await HttpUtils.responce(config.api + '/logout', false, 'POST', data);
    }

    static async refresh(){
        let result = false;
        const refreshToken = StorageUtils.getAuthInfo(StorageUtils.refreshTokenKey);

        if (refreshToken) {
            const response = await fetch(config.api + '/refresh', {
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
                const tokensInfo = await response.json();

                if (tokensInfo && !tokensInfo.error) {
                    StorageUtils.setAuthInfo(tokensInfo.tokens.accessToken, tokensInfo.tokens.refreshToken);
                    result = true;
                }
            }
        }

        if(!result){
            StorageUtils.removeAuthInfo();
        }

        return result;
    }
}