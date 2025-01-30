import { Router } from "./router";

import './styles/style.scss'
import 'bootstrap';


class App{
    constructor(){
        new Router();
    }
}

(new App());