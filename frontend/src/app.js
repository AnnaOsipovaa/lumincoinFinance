import { Router } from "./router.js";
import { Auth } from "./services/auth-services.js";
import './styles/style.css';
import * as bootstrap from 'bootstrap';

class App{
    constructor(){
        new Router();
    }
}

(new App());