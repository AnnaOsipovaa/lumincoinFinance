import { HttpUtils } from "./http-utils.js";
import config from '../config/config.js';
import { StorageUtils } from "./storage-utils.js";

export class UserInfoUtils {
    static getUserName() { 
        let userInfo = StorageUtils.getAuthInfo(StorageUtils.userInfoKey);
        if (userInfo) {
            if (userInfo.name && userInfo.lastName) {
                return userInfo.name + ' ' + userInfo.lastName;
            }
        }
    }

    static async getUserBalance() {
        let result = await HttpUtils.responce(config.api + '/balance', true);

        if (!result.error && result.response && result.response.hasOwnProperty('balance')) {
            return result.response.balance;
        }
    }
}