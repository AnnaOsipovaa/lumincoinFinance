import { ValidationOptionsType, ValidationType } from "../types/validation.type";

export class ValidationUtils {
    public static validateForm(validations: ValidationType[]): boolean {
        let isValid: boolean = true;

        validations.forEach(item => {
            if (!ValidationUtils.validateField(item.element, item.options)) {
                isValid = false;
            }
        });

        return isValid;
    }

    private static validateField(element: HTMLInputElement, options?: ValidationOptionsType): boolean {
        const elementValue: string = element.value;

        let result: boolean = true;

        if (!elementValue) {
            result = false;
        }

        if (options) {
            if (options.pattern) {
                if (!element.value.match(options.pattern)) {
                    result = false;
                }
            } else if (options.compareTo) {
                if (element.value !== options.compareTo) {
                    result = false;
                }
            } else if (options.notEqualTo) {
                if (element.value === options.notEqualTo) {
                    result = false;
                }
            }
        }

        if (result) {
            element.classList.remove('border-danger');
            return true;
        } else {
            element.classList.add('border-danger');
            return false;
        }
    }
}