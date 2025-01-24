import { Auth } from '../../services/auth-services.js';
import { StorageUtils } from '../../utils/storage-utils.js';
import { ValidationUtils } from '../../utils/validation-utils.js';

export class Signup {
    constructor(openRoute) {
        this.openRoute = openRoute;
        document.getElementById('signup').addEventListener('click', this.signup.bind(this));

        this.nameInputElement = document.getElementById('name');
        this.emailInputElement = document.getElementById('email');
        this.passwordInputElement = document.getElementById('password');
        this.repeatPasswordInputElement = document.getElementById('repeat-password');
        this.commonErrorElement = document.getElementById('common-error');

        if (StorageUtils.getAuthInfo(StorageUtils.accessTokenKey) &&
            StorageUtils.getAuthInfo(StorageUtils.refreshTokenKey)) {
            return this.openRoute('/');
        }
    }

    async signup() {
        const validations = [
            { element: this.nameInputElement, options: { pattern: /^([А-Я][а-я]+\s*){3}$/ } },
            { element: this.emailInputElement, options: { pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/ } },
            { element: this.passwordInputElement, options: { pattern: /^(?=.*\d)(?=.*[A-Z]).{8,}$/ } },
            { element: this.repeatPasswordInputElement, options: { compareTo: this.passwordInputElement.value } }
        ];

        if (ValidationUtils.validateForm(validations)) {
            const usernameArr = this.nameInputElement.value.match(/[А-Я][а-я]+/g);
            const sipnupResult = await Auth.signup({
                name: usernameArr[1],
                lastName: usernameArr[0],
                email: this.emailInputElement.value,
                password: this.passwordInputElement.value,
                passwordRepeat: this.repeatPasswordInputElement.value
            });

            if (!sipnupResult) {
                this.commonErrorElement.classList.remove('d-none');
                return;
            }

            let loginResult = await Auth.login({
                email: this.emailInputElement.value,
                password: this.passwordInputElement.value,
                rememberMe: false
            });

            if (!loginResult) {
                return;
            }

            StorageUtils.setAuthInfo(loginResult.tokens.accessToken, loginResult.tokens.refreshToken, loginResult.user);

            this.openRoute('/');
        }
    }
}