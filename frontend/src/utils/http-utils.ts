import { Auth } from "../services/auth-services";
import { PatternResponseType } from "../types/pattern-response.type";
import { StorageUtils } from "./storage-utils";

export class HttpUtils {
    public static async responce(url: string, authorization: boolean = false, method: string = 'GET', body: object | null = null): Promise<PatternResponseType> {
        const result: PatternResponseType = {
            error: false,
            redirect: null,
            content: null
        }

        const params: any = {
            method: method,
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
        }

        if (body) {
            params.body = JSON.stringify(body);
        }

        let token: string | null = null;
        if (authorization) {
            token = StorageUtils.getAuthToken(StorageUtils.accessTokenKey) as string;
            if (token) {
                params.headers['x-auth-token'] = token;
            }
        } 

        let response: Response | null = null;
        try {
            response = await fetch(url, params);
            result.content = await response.json();
        } catch (error) {
            result.error = true;
        }
 
        if(response){
            if (response.status < 200 || response.status > 299) {
                if (authorization && response.status === 401) {
                    if (!token) {
                        result.redirect = '/login';
                    } else {
                        const updateRefreshToken: boolean = await Auth.refresh();
                        if (updateRefreshToken) {
                            return await this.responce(url, authorization, method, body);
                        } else {
                            result.redirect = '/login';
                        }
                    }
                }
                result.error = true;
                result.redirect = '/login';
            }
        }

        return result;
    }
}