import { Router } from "./router";
import { Auth } from "./services/auth-services";

import './styles/style.scss'
import 'bootstrap';


class App{
    constructor(){
        new Router();
    }
}

(new App());