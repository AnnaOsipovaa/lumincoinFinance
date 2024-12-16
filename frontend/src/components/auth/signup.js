class Signup {
    constructor() {
        document.getElementById('signup').addEventListener('click', this.signup.bind(this)); 
    
        this.nameInputElement = document.getElementById('name');
        this.emailInputElement = document.getElementById('email');
        this.passwordInputElement = document.getElementById('password');
        this.repeatPasswordInputElement = document.getElementById('repeat-password');
    }

    signup(){
        if(this.validationForm()){
            
        }
    }

    validationForm(){
        this.nameInputElement.classList.remove('border-danger');
        this.emailInputElement.classList.remove('border-danger');
        this.passwordInputElement.classList.remove('border-danger');
        this.repeatPasswordInputElement.classList.remove('border-danger');

        let error = false;
        if(!this.nameInputElement.value || !this.nameInputElement.value.match(/^([А-Я][а-я]+\s*){3}$/)){
            this.nameInputElement.classList.add('border-danger');
            error = true;
        }
        if(!this.emailInputElement.value || !this.emailInputElement.value.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)){
            this.emailInputElement.classList.add('border-danger');
            error = true;
        }
        if(!this.passwordInputElement.value || !this.passwordInputElement.value.match(/^(?=.*\d)(?=.*[A-Z]).{8,}$/)){
            this.passwordInputElement.classList.add('border-danger');
            error = true;
        }
        if(!this.repeatPasswordInputElement.value || !(this.repeatPasswordInputElement.value === this.passwordInputElement.value)){
            this.repeatPasswordInputElement.classList.add('border-danger');
            error = true;
        }
    }
}

window.onload = () => {
    new Signup();
}