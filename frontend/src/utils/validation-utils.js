export class ValidationUtils{
    static validateForm(validations){
        let isValid = true;
   
        validations.forEach(item => {
            if (!ValidationUtils.validateField(item.element, item.options)) {
                isValid = false;
            }
        });

        return isValid;
    }

    static validateField(element, options) {
        let condition = element.value;
        if (options) {
            if (options.hasOwnProperty('pattern')) {
                condition = element.value && element.value.match(options.pattern);
            } else if (options.hasOwnProperty('compareTo')) {
                condition = element.value && element.value === options.compareTo;
            } else if (options.hasOwnProperty('notEqualTo')) {
                condition = element.value && element.value !== options.notEqualTo;
            }
        }

        if (condition) {
            element.classList.remove('border-danger');
            return true;
        } else {
            element.classList.add('border-danger');
            return false;
        }
    }
}