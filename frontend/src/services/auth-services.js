import config from '../config/config.js';
import { HttpUtils } from '../utils/http-utils.js';
import { StorageUtils } from '../utils/storage-utils.js';

export class Auth{
    static async login(data){ 
        let login = await HttpUtils.responce(config.api + '/login', false, 'POST', data);

        if (login.error || 
            !login.content.tokens ||
            !login.content.tokens.accessToken || 
            !login.content.tokens.refreshToken || 
            !login.content.user) {
            return false;
        }

        return login.content;
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