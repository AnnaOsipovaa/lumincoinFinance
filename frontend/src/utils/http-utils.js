import { Auth } from "../services/auth-services.js";
import { StorageUtils } from "./storage-utils.js";

export class HttpUtils {
    static async responce(url, authorization = false, method = 'GET', body = null) {
        const result = {
            error: false,
            redirect: false,
            response: null
        }

        const params = {
            method: method,
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
        }

        if (body) {
            params.body = JSON.stringify(body);
        }

        let token = null;
        if (authorization) {
            token = StorageUtils.getAuthInfo(StorageUtils.accessTokenKey);
            if(token){
                params.headers['x-auth-token'] = token; 
            }
        }

        let response = null;
        try {
            response = await fetch(url, params);
            result.response = await response.json();
        } catch (error) {
            result.error = true;
        }

        if (response.status < 200 || response.status > 299) {
            if (authorization && response.status === 401) {
                if(!token){
                    result.redirect = '/login';
                }else{
                    const updateRefreshToken = await Auth.refresh();
                    if(updateRefreshToken){
                        return this.responce(url, authorization, method, body);
                    }else{
                        result.redirect = '/login';
                    }
                }
            }
            result.error = true;
            result.redirect = '/login';
        }

        return result;
    }
}