import { Auth } from "../../services/auth-services.js";
import { StorageUtils } from "../../utils/storage-utils.js";

export class logout {
    constructor(openRoute) {
        this.openRoute = openRoute;
        this.logout();
    }

    async logout() {
        await Auth.logout({
            refreshToken: StorageUtils.getAuthInfo(StorageUtils.refreshTokenKey)
        });

        StorageUtils.removeAuthInfo();
        this.openRoute('/login');
    }
}