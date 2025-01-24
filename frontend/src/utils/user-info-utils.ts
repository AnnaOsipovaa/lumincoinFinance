import { HttpUtils } from "./http-utils";
import config from '../config/config';
import { StorageUtils } from "./storage-utils";
import { BalanceResponseType } from "../types/balanse-response.type";
import { ErrorResponseType } from "../types/error-response.type";

export class UserInfoUtils {
    public static getUserName(): string { 
        let userInfo = StorageUtils.getAuthInfo(StorageUtils.userInfoKey);
        
        let fullUsername: string = '';
        if (userInfo) {
            if (userInfo.name && userInfo.lastName) {
                fullUsername = userInfo.name + ' ' + userInfo.lastName;
            }
        }
        return fullUsername;
    }

    public static async getUserBalance(): Promise<number> {
        let result: BalanceResponseType | ErrorResponseType = await HttpUtils.responce(config.api + '/balance', true);

        if(result){
            if((result as ErrorResponseType).error != undefined){
                throw new Error((result as ErrorResponseType).message);
            }

            return (result as BalanceResponseType).balance;
        }
        return 0;
    }
}