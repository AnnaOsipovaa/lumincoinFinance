import { Auth } from '../../services/auth-services';
import { LoginResponseType } from '../../types/login-response.type';
import { OpenRouteType } from '../../types/open-route.type';
import { SignupResponseType } from '../../types/signup-response.type';
import { ValidationType } from '../../types/validation.type';
import { StorageUtils } from '../../utils/storage-utils';
import { ValidationUtils } from '../../utils/validation-utils';

export class Signup {
    readonly openRoute: OpenRouteType;

    readonly nameInputElement: HTMLInputElement | null;
    readonly emailInputElement: HTMLInputElement | null;
    readonly passwordInputElement: HTMLInputElement | null;
    readonly repeatPasswordInputElement: HTMLInputElement | null;
    readonly commonErrorElement: HTMLElement | null;

    constructor(openRoute: OpenRouteType) {
        this.openRoute = openRoute;

        const signupBtnElement: HTMLElement | null = document.getElementById('signup');
        if (signupBtnElement) {
            signupBtnElement.addEventListener('click', this.signup.bind(this));
        }

        this.nameInputElement = document.getElementById('name') as HTMLInputElement;
        this.emailInputElement = document.getElementById('email') as HTMLInputElement;
        this.passwordInputElement = document.getElementById('password') as HTMLInputElement;
        this.repeatPasswordInputElement = document.getElementById('repeat-password') as HTMLInputElement;
        this.commonErrorElement = document.getElementById('common-error');

        if (StorageUtils.getAuthToken(StorageUtils.accessTokenKey) &&
            StorageUtils.getAuthToken(StorageUtils.refreshTokenKey)) {
            this.openRoute('/');
            return;
        }
    }

    private async signup(): Promise<void> {
        const validations: ValidationType[] = [
            { element: <HTMLInputElement>this.nameInputElement, options: { pattern: /^([А-Я][а-я]+\s*){3}$/ } },
            { element: <HTMLInputElement>this.emailInputElement, options: { pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/ } },
            { element: <HTMLInputElement>this.passwordInputElement, options: { pattern: /^(?=.*\d)(?=.*[A-Z]).{8,}$/ } },
            { element: <HTMLInputElement>this.repeatPasswordInputElement, options: { compareTo: (<HTMLInputElement>this.passwordInputElement).value } }
        ];

        if (ValidationUtils.validateForm(validations)) {
            const usernameArr: RegExpMatchArray | null = (<HTMLInputElement>this.nameInputElement).value.match(/[А-Я][а-я]+/g);

            if (!usernameArr) return;

            const sipnupResult: SignupResponseType | null = await Auth.signup({
                name: usernameArr[1],
                lastName: usernameArr[0],
                email: this.emailInputElement!.value,
                password: this.passwordInputElement!.value,
                passwordRepeat: this.repeatPasswordInputElement!.value
            });

            if (!sipnupResult) {
                this.commonErrorElement?.classList.remove('d-none');
                return;
            }

            let loginResult: LoginResponseType | null = await Auth.login({
                email: this.emailInputElement!.value,
                password: this.passwordInputElement!.value,
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