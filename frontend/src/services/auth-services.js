import config from '../config/config.js';
import { HttpUtils } from '../utils/http-utils.js';

export class Auth{
    static async login(data){ 
        let login = await HttpUtils.responce(config.api + '/login', 'POST', data);

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
        let signup = await HttpUtils.responce(config.api + '/signup', 'POST', data);

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
}