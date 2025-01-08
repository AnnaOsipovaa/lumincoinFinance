import { Login } from "./components/auth/login.js";
import { Signup } from "./components/auth/signup.js";
import { Main } from "./components/main.js";
import { FileUtils } from "./utils/file-utils.js";
import { Logout } from "./components/auth/logout.js";
import { StorageUtils } from "./utils/storage-utils.js";
import { UserInfoUtils } from "./utils/user-info-utils.js";
import { CategoryIncomeList } from "./components/income/category-income-list.js";
import { CategoryExpensList } from "./components/expense/category-expense-list.js";
import { CategoryIncomeEdit } from "./components/income/category-income-edit.js";
import { CategoryIncomeCreate } from "./components/income/category-income-create.js";
import { CategoryIncomeDelete } from "./components/income/category-income-delete.js";
import { CategoryExpenseCreate } from "./components/expense/category-expense-create.js";
import { CategoryExpensesDelete } from "./components/expense/category-expense-delete.js";
import { CategoryExpensesEdit } from "./components/expense/category-expense-edit.js";
import { OperationsList } from "./components/operations/operations-list.js";
import { OperationsCreate } from "./components/operations/operations-create.js";
import { OperationsDelete } from "./components/operations/operations-delete.js";
import { OperationsEdit } from "./components/operations/operations-edit.js";
import { LayoutMenuUtils } from "./utils/layout-menu-utils.js";

export class Router {
    constructor() {

        this.titleElement = document.getElementById('title');
        this.contentElement = document.getElementById('content');;
        this.username = null;

        this.routers = [
            {
                route: '/',
                title: 'Главная',
                layout: 'templates/layout.html',
                content: 'templates/main.html',
                authorization: true,
                load: () => {
                    new Main();
                },
                styles: [
                    'main.css'
                ]
            },
            {
                route: '/login',
                title: 'Авторизация',
                content: 'templates/auth/login.html',
                load: () => {
                    new Login(this.openRoute.bind(this));
                },
            },
            {
                route: '/signup',
                title: 'Регистрация',
                content: 'templates/auth/signup.html',
                load: () => {
                    new Signup(this.openRoute.bind(this));
                },
            },
            {
                route: '/logout',
                load: () => {
                    new Logout(this.openRoute.bind(this));
                }
            },
            {
                route: '/operations-list',
                title: 'Доходы и расходы',
                layout: 'templates/layout.html',
                content: 'templates/operations/operations-list.html',
                authorization: true,
                load: () => {
                    new OperationsList(this.openRoute.bind(this));
                },
                styles: [
                    'main.css'
                ]
            },
            {
                route: '/operations-edit',
                title: 'Редактирование дохода/расхода',
                layout: 'templates/layout.html',
                content: 'templates/operations/operations-edit.html',
                authorization: true,
                load: () => {
                    new OperationsEdit(this.openRoute.bind(this));
                }
            },
            {
                route: '/operations-delete',
                authorization: true,
                load: () => {
                    new OperationsDelete(this.openRoute.bind(this));
                }
            },
            {
                route: '/operations-create',
                title: 'Создание дохода/расхода',
                layout: 'templates/layout.html',
                content: 'templates/operations/operations-create.html',
                authorization: true,
                load: () => {
                    new OperationsCreate(this.openRoute.bind(this));
                }
            },
            {
                route: '/income-category-list',
                title: 'Доходы',
                layout: 'templates/layout.html',
                content: 'templates/income/income-category-list.html',
                authorization: true,
                load: () => {
                    new CategoryIncomeList(this.openRoute.bind(this));
                }
            },
            {
                route: '/income-category-create',
                title: 'Создание категории доходов',
                layout: 'templates/layout.html',
                content: 'templates/income/income-category-create.html',
                authorization: true,
                load: () => {
                    new CategoryIncomeCreate(this.openRoute.bind(this));
                }
            },
            {
                route: '/income-category-delete',
                authorization: true,
                load: () => {
                    new CategoryIncomeDelete(this.openRoute.bind(this));
                }
            },
            {
                route: '/income-category-edit',
                title: 'Редактирование категории доходов',
                layout: 'templates/layout.html',
                content: 'templates/income/income-category-edit.html',
                authorization: true,
                load: () => {
                    new CategoryIncomeEdit(this.openRoute.bind(this));
                }
            },
            {
                route: '/expenses-category-list',
                title: 'Расходы',
                layout: 'templates/layout.html',
                content: 'templates/expenses/expenses-category-list.html',
                authorization: true,
                load: () => {
                    new CategoryExpensList(this.openRoute.bind(this));
                }
            },
            {
                route: '/expenses-category-create',
                title: 'Создание категории расходов',
                layout: 'templates/layout.html',
                content: 'templates/expenses/expenses-category-create.html',
                authorization: true,
                load: () => {
                    new CategoryExpenseCreate(this.openRoute.bind(this));
                }
            },
            {
                route: '/expenses-category-edit',
                title: 'Редактирование категории расходов',
                layout: 'templates/layout.html',
                content: 'templates/expenses/expenses-category-edit.html',
                authorization: true,
                load: () => {
                    new CategoryExpensesEdit(this.openRoute.bind(this));
                }
            }, {
                route: '/expenses-category-delete',
                authorization: true,
                load: () => {
                    new CategoryExpensesDelete(this.openRoute.bind(this));
                }
            },
        ]

        this.initEvents();
    }

    initEvents() {
        window.addEventListener('DOMContentLoaded', this.activateRoute.bind(this));
        window.addEventListener('popstate', this.activateRoute.bind(this));
        document.addEventListener('click', this.clickHandler.bind(this));
    }

    async clickHandler(e) {
        let element = null;
        if (e.target.nodeName === 'A') {
            element = e.target;
        } else {
            if (e.target.parentNode.nodeName === 'A') {
                element = e.target.parentNode;
            }
        }

        if (element) {
            e.preventDefault();

            const currentRoute = window.location.pathname;
            const url = element.href.replace(window.location.origin, '');
            if (!url || currentRoute === url.replace('#', '') || url.startsWith('javascript:void(0)')) {
                return;
            }
            await this.openRoute(url);
        }
    }

    async openRoute(url) {
        const currenrRoute = window.location.pathname;
        history.pushState({}, '', url);
        await this.activateRoute(null, currenrRoute);
    }

    deactivationOldRoute(route) {
        const oldRouteObject = this.routers.find(item => item.route === route);
        if (oldRouteObject.styles && oldRouteObject.styles.length > 0) {
            oldRouteObject.styles.forEach(item => {
                const file = document.querySelector(`link[href="/styles/${item}"]`);
                if (file) {
                    file.remove();
                }
            });
        }
        if (oldRouteObject.scripts && oldRouteObject.scripts.length > 0) {
            oldRouteObject.scripts.forEach(item => {
                const file = document.querySelector(`script[src="/js/${item}"]`);
                if (file) {
                    file.remove();
                }
            });
        }
    }

    async activateRoute(e, oldRoute = null) {
        if (oldRoute) {
            this.deactivationOldRoute(oldRoute);
        }

        const path = (window.location.pathname).split('&')[0];
        const newRouteObject = this.routers.find(item => item.route === path);

        if (newRouteObject) {
            if (newRouteObject.authorization) {
                if (!StorageUtils.getAuthInfo(StorageUtils.accessTokenKey) || !StorageUtils.getAuthInfo(StorageUtils.refreshTokenKey)) {
                    this.openRoute('/login');
                    return;
                }
            }

            if (newRouteObject.title) {
                this.titleElement.innerText = newRouteObject.title;
            }

            let contentBlock = this.contentElement;
            if (newRouteObject.layout) {
                const layout = await fetch(newRouteObject.layout);
                this.contentElement.innerHTML = await layout.text();
                contentBlock = document.getElementById('content-layout');

                LayoutMenuUtils.markMenu(path);

                if (!this.username) {
                    this.username = UserInfoUtils.getUserName();
                }
                document.getElementById('username').innerText = this.username;
                document.getElementById('userBalance').innerText = await UserInfoUtils.getUserBalance() + '$';
            }

            if (newRouteObject.content) {
                const content = await fetch(newRouteObject.content);
                contentBlock.innerHTML = await content.text();
            }

            if (newRouteObject.styles && newRouteObject.styles.length > 0) {
                newRouteObject.styles.forEach(fileHref => FileUtils.loadPageStyle(fileHref))
            }

            if (newRouteObject.scripts && newRouteObject.scripts.length > 0) {
                newRouteObject.scripts.forEach(fileSrc => FileUtils.loadPageScript(fileSrc));
            }

            if (newRouteObject.load && typeof newRouteObject.load === 'function') {
                newRouteObject.load();
            }
        }
    }
}