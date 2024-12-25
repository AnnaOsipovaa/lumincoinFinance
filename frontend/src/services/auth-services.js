import config from '../config/config.js';
import { HttpUtils } from '../utils/http-utils.js';
import { StorageUtils } from '../utils/storage-utils.js';

export class Auth{
    static async login(data){ 
        let login = await HttpUtils.responce(config.api + '/login', false, 'POST', data);

        if (login.error || 
            !login.response.tokens ||
            !login.response.tokens.accessToken || 
            !login.response.tokens.refreshToken || 
            !login.response.user) {
            return false;
        }

        return login.response;
    }
    
    static async signup(data){ 
        let signup = await HttpUtils.responce(config.api + '/signup', false, 'POST', data);

        if (signup.error || 
            !signup.response.user ||
            !signup.response.user.id || 
            !signup.response.user.email || 
            !signup.response.user.name ||
            !signup.response.user.lastName) {
            return false;
        }

        return signup.response;
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