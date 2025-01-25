import { Auth } from '../../services/auth-services.js';
import { LoginType } from '../../types/login.type.js';
import { StorageUtils } from '../../utils/storage-utils.js';
import { ValidationUtils } from '../../utils/validation-utils.js';

export class Login {
    constructor(openRoute) {
        this.openRoute = openRoute;
        document.getElementById('login').addEventListener('click', this.login.bind(this));

        this.emailInputElement = document.getElementById('email');
        this.passwordInputElement = document.getElementById('password');
        this.rememberMeInputElement = document.getElementById('remember-me');
        this.commonErrorElement = document.getElementById('common-error');

        if (StorageUtils.getAuthInfo(StorageUtils.accessTokenKey) &&
            StorageUtils.getAuthInfo(StorageUtils.refreshTokenKey)) {
            return this.openRoute('/');
        }

        this.validations = [
            { element: this.emailInputElement, options: { pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/ } },
            { element: this.passwordInputElement }
        ];
    }

    async login() {
        if (ValidationUtils.validateForm(this.validations)) {
            let loginResult = await Auth.login({
                email: this.emailInputElement.value,
                password: this.passwordInputElement.value,
                rememberMe: this.rememberMeInputElement.checked
            });

            if (!loginResult) {
                this.commonErrorElement.classList.remove('d-none');
                return;
            }

            StorageUtils.setAuthInfo(loginResult.tokens.accessToken, loginResult.tokens.refreshToken, loginResult.user);

            this.openRoute('/');
        }
    }
}