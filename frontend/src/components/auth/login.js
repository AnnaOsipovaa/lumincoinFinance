class Login {
    constructor() {
        document.getElementById('login-form').addEventListener('click', this.login.bind(this)); 
    
        this.emailInputElement = document.getElementById('email');
        this.passwordInputElement = document.getElementById('password');
    }

    login(){
        if(this.validationForm()){
            
        }
    }

    validationForm(){
        let error = false;
        if(!this.emailInputElement.value || !this.emailInputElement.value.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)){
            alert('неверный логин');
            error = true;
        }
        if(!this.passwordInputElement.value){
            alert('неверный пароль');
            error = true;
        }
        
    }
}

window.onload = () => {
    new Login();
}