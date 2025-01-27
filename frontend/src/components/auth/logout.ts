import { Auth } from "../../services/auth-services";
import { StorageUtils } from "../../utils/storage-utils";

export class Logout {
    readonly openRoute: any;

    constructor(openRoute: any) {
        this.openRoute = openRoute;
        this.logout();
    }

    private async logout(): Promise<void> {
        await Auth.logout({
            refreshToken: StorageUtils.getAuthInfo(StorageUtils.refreshTokenKey)
        });

        StorageUtils.removeAuthInfo();
        this.openRoute('/login');
    }
}