import { HttpUtils } from "./http-utils";
import config from '../config/config';
import { StorageUtils } from "./storage-utils";
import { BalanceResponseType } from "../types/balanse-response.type";
import { PatternResponseType } from "../types/pattern-response.type";
import { UserInfoType } from "../types/user-info.type";
import { OpenRouteType } from "../types/open-route.type";

export class UserInfoUtils {
    public static getUserName(openRoute: OpenRouteType): string {
        let userInfo: UserInfoType = StorageUtils.getAuthInfo(StorageUtils.userInfoKey) as UserInfoType;

        let fullUsername: string = '';
        if (userInfo) {
            if (userInfo.name && userInfo.lastName) {
                fullUsername = userInfo.name + ' ' + userInfo.lastName;
            }
        }else{
            openRoute('/login');
        }
        return fullUsername;
    }

    public static async getUserBalance(openRoute: OpenRouteType): Promise<number> {
        let response: PatternResponseType = await HttpUtils.responce(config.api + '/balance', true);

        if (response.error || response.redirect || !response.content) {
            if(response.redirect){
                openRoute(response.redirect);
            }
            return 0;
        }

        let balanceResponseContent: BalanceResponseType = response.content;
        return balanceResponseContent.balance;
    }
}