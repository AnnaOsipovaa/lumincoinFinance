class Login {
    constructor() {
        document.getElementById('login').addEventListener('click', this.login.bind(this)); 
    
        this.emailInputElement = document.getElementById('email');
        this.passwordInputElement = document.getElementById('password');
    }

    login(){
        if(this.validationForm()){
            
        }
    }

    validationForm(){
        this.emailInputElement.classList.remove('border-danger');
        this.passwordInputElement.classList.remove('border-danger');
        let error = false;
        if(!this.emailInputElement.value || !this.emailInputElement.value.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)){
            this.emailInputElement.classList.add('border-danger');
            error = true;
        }
        if(!this.passwordInputElement.value){
            this.passwordInputElement.classList.add('border-danger');
            error = true;
        }
    }
}

window.onload = () => {
    new Login();
}