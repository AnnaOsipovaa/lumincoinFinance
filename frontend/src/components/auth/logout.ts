import { Auth } from "../../services/auth-services";
import { OpenRouteType } from "../../types/open-route.type";
import { StorageUtils } from "../../utils/storage-utils";

export class Logout {
    readonly openRoute: OpenRouteType;

    constructor(openRoute: OpenRouteType) {
        this.openRoute = openRoute;
        this.logout();
    }

    private async logout(): Promise<void> {
        await Auth.logout({
            refreshToken: StorageUtils.getAuthToken(StorageUtils.refreshTokenKey)
        });

        StorageUtils.removeAuthInfo();
        this.openRoute('/login');
    }
}