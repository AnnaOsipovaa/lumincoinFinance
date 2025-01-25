import { HttpUtils } from "./http-utils";
import config from '../config/config';
import { StorageUtils } from "./storage-utils";
import { BalanceResponseType } from "../types/balanse-response.type";
import { PatternResponseType } from "../types/pattern-response.type";
import { UserInfoType } from "../types/user-info.type";

export class UserInfoUtils {
    public static getUserName(): string {
        let userInfo: UserInfoType = StorageUtils.getAuthInfo(StorageUtils.userInfoKey) as UserInfoType;

        let fullUsername: string = '';
        if (userInfo) {
            if (userInfo.name && userInfo.lastName) {
                fullUsername = userInfo.name + ' ' + userInfo.lastName;
            }
        }
        return fullUsername;
    }

    public static async getUserBalance(): Promise<number> {
        let response: PatternResponseType = await HttpUtils.responce(config.api + '/balance', true);

        if (response.error || response.redirect || !response.content) {
            throw new Error();
        }

        let balanceResponseContent: BalanceResponseType = response.content;
        
        return balanceResponseContent.balance;
    }
}