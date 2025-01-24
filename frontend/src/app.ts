import { Router } from "./router";
import { Auth } from "./services/auth-services";
import './styles/style.css';
import * as bootstrap from 'bootstrap';

class App{
    constructor(){
        new Router();
    }
}

(new App());