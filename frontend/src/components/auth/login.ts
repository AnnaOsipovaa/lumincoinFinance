import { Auth } from '../../services/auth-services';
import { LoginResponseType } from '../../types/login-response.type';
import { OpenRouteType } from '../../types/open-route.type';
import { ValidationType } from '../../types/validation.type';
import { StorageUtils } from '../../utils/storage-utils';
import { ValidationUtils } from '../../utils/validation-utils';

export class Login {
    readonly openRoute: OpenRouteType;

    readonly emailInputElement: HTMLInputElement | null;
    readonly passwordInputElement: HTMLInputElement | null;
    readonly rememberMeInputElement: HTMLInputElement | null;
    readonly commonErrorElement: HTMLElement | null;
    readonly validations!: ValidationType[];

    constructor(openRoute: OpenRouteType) {
        this.openRoute = openRoute;

        const loginBtnElement: HTMLElement | null = document.getElementById('login');
        if (loginBtnElement) {
            loginBtnElement.addEventListener('click', this.login.bind(this));
        }

        this.emailInputElement = document.getElementById('email') as HTMLInputElement;
        this.passwordInputElement = document.getElementById('password') as HTMLInputElement;
        this.rememberMeInputElement = document.getElementById('remember-me') as HTMLInputElement;
        this.commonErrorElement = document.getElementById('common-error');

        if (StorageUtils.getAuthInfo(StorageUtils.accessTokenKey) &&
            StorageUtils.getAuthInfo(StorageUtils.refreshTokenKey) &&
            StorageUtils.getAuthInfo(StorageUtils.userInfoKey)) {
            this.openRoute('/');
            return;
        }

        this.validations = [
            { element: this.emailInputElement, options: { pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/ } },
            { element: this.passwordInputElement }
        ];
    }

    private async login(): Promise<void> {
        if (ValidationUtils.validateForm(this.validations)) {
            let loginResult: LoginResponseType | null= await Auth.login({
                email: this.emailInputElement!.value,
                password: this.passwordInputElement!.value,
                rememberMe: this.rememberMeInputElement!.checked
            });

            if (!loginResult) {
                this.commonErrorElement?.classList.remove('d-none');
                return;
            }

            StorageUtils.setAuthInfo(loginResult.tokens.accessToken, loginResult.tokens.refreshToken, loginResult.user);

            this.openRoute('/');
        }
    }
}