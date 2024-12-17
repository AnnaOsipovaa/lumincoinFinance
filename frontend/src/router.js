import { Main } from "./components/main.js";

export class Router {
    constructor() {

        this.title = document.getElementById('title');
        this.content = document.getElementById('content');
        this.contentInLayout = null;

        this.routers = [
            {
                route: '/',
                title: 'Главная',
                layout: 'templates/layout.html',
                content: 'templates/main.html',
                load: () => {
                    new Main();
                },
                styles: [
                    'main.css'
                ]
            },
            {
                route: '/login',
                title: 'Авторизация'
            }
        ]

        this.initEvents();
    }

    initEvents() {
        window.addEventListener('DOMContentLoaded', this.openRoute.bind(this));
        window.addEventListener('popstate', this.openRoute.bind(this));
        document.addEventListener('click', this.clickHandler.bind(this));
    }

    clickHandler() {
        console.log('clickHandler');
    }

    async openRoute() {
        const path = (window.location.pathname).split('&')[0];

        const newRoute = this.routers.find(item => item.route === path);

        if (newRoute) {
            if (newRoute.title) {
                this.title.innerText = newRoute.title;
            }

            if (newRoute.layout) {
                const layout = await fetch(newRoute.layout);
                this.content.innerHTML = await layout.text();

                if (newRoute.content) {
                    if (!this.contentInLayout) {
                        this.contentInLayout = document.getElementById('content-layout');
                    }
                    const content = await fetch(newRoute.content);
                    this.contentInLayout.innerHTML = await content.text();
                }
            } else {
                const layout = await fetch(newRoute.content);
                this.content.innerHTML = await layout.text();
            }

            if (newRoute.styles && newRoute.styles.length > 0) {
                newRoute.styles.forEach(file => {
                    const link = document.createElement('link');
                    link.href = 'styles/' + file;
                    link.type = 'text/css';
                    link.rel = 'stylesheet';
                    document.head.appendChild(link);
                })
            }

            if (newRoute.scripts && newRoute.scripts.length > 0) {
                newRoute.scripts.forEach(file => {
                    const script = document.createElement('script');
                    script.src = 'js/' + file;
                    script.type = 'module';
                    document.body.appendChild(script);
                })
            }

            if(newRoute.load && typeof newRoute.load === 'function'){
                newRoute.load();
            }
        }
    }
}