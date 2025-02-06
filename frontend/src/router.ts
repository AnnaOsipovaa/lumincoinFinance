import { Login } from "./components/auth/login";
import { Signup } from "./components/auth/signup";
import { Main } from "./components/main";
import { FileUtils } from "./utils/file-utils";
import { Logout } from "./components/auth/logout";
import { StorageUtils } from "./utils/storage-utils";
import { UserInfoUtils } from "./utils/user-info-utils";
import { CategoryIncomeList } from "./components/income/category-income-list";
import { CategoryExpensList } from "./components/expense/category-expense-list";
import { CategoryIncomeEdit } from "./components/income/category-income-edit";
import { CategoryIncomeCreate } from "./components/income/category-income-create";
import { CategoryIncomeDelete } from "./components/income/category-income-delete";
import { CategoryExpenseCreate } from "./components/expense/category-expense-create";
import { CategoryExpensesDelete } from "./components/expense/category-expense-delete";
import { CategoryExpensesEdit } from "./components/expense/category-expense-edit";
import { OperationsList } from "./components/operations/operations-list";
import { OperationsCreate } from "./components/operations/operations-create";
import { OperationsDelete } from "./components/operations/operations-delete";
import { OperationsEdit } from "./components/operations/operations-edit";
import { LayoutMenuUtils } from "./utils/layout-menu-utils";
import { RouteType } from "./types/route.type";

export class Router {
    readonly titleElement: HTMLElement | null;
    readonly contentElement: HTMLElement | null;
    private username: string | null;
    readonly routers: RouteType[];

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
                    new Main(this.openRoute.bind(this));
                }
            },
            {
                route: '/login',
                title: 'Авторизация',
                content: 'templates/auth/login.html',
                authorization: false,
                load: () => {
                    new Login(this.openRoute.bind(this));
                },
            },
            {
                route: '/signup',
                title: 'Регистрация',
                content: 'templates/auth/signup.html',
                authorization: false,
                load: () => {
                    new Signup(this.openRoute.bind(this));
                },
            },
            {
                route: '/logout',
                authorization: false,
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
                }
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

    private initEvents(): void {
        window.addEventListener('DOMContentLoaded', this.activateRoute.bind(this));
        window.addEventListener('popstate', this.activateRoute.bind(this));
        document.addEventListener('click', this.clickHandler.bind(this));
    }

    private async clickHandler(e :Event): Promise<void> {
        let element: HTMLAnchorElement | null = null;
        
        const eventTargetElement = e.target as HTMLAnchorElement;

        if (eventTargetElement.nodeName === 'A') {
            element = e.target as HTMLAnchorElement;
        } else {
            if (eventTargetElement.parentNode?.nodeName === 'A') {
                element = eventTargetElement.parentNode as HTMLAnchorElement;
            }
        }

        if (element) {
            e.preventDefault();

            const currentRoute: string = window.location.pathname;
            const url: string = element.href.replace(window.location.origin, '');
            if (!url || currentRoute === url.replace('#', '') || url.startsWith('javascript:void(0)')) {
                return;
            }
            await this.openRoute(url);
        }
    }

    private async openRoute(url: string): Promise<void> {
        const currenrRoute: string = window.location.pathname;
        history.pushState({}, '', url);
        await this.activateRoute(null, currenrRoute);
    }

    private deactivationOldRoute(route: string) {
        const oldRouteObject: RouteType | undefined = this.routers.find(item => item.route === route);

        if(!oldRouteObject) return;

        if (oldRouteObject.styles && oldRouteObject.styles.length > 0) {
            oldRouteObject.styles.forEach(item => {
                const file: HTMLElement | null = document.querySelector(`link[href="/styles/${item}"]`);
                if (file) {
                    file.remove();
                }
            });
        }
        if (oldRouteObject.scripts && oldRouteObject.scripts.length > 0) {
            oldRouteObject.scripts.forEach(item => {
                const file: HTMLElement | null = document.querySelector(`script[src="/js/${item}"]`);
                if (file) {
                    file.remove();
                }
            });
        }
    }

    private async activateRoute(e: Event | null, oldRoute?: string) {
        if(!this.contentElement) return;

        if (oldRoute) {
            this.deactivationOldRoute(oldRoute);
        }

        const path: string = (window.location.pathname).split('&')[0];
        const newRouteObject: RouteType | undefined = this.routers.find(item => item.route === path);

        if (newRouteObject) {
            if (newRouteObject.authorization) {
                if (!StorageUtils.getAuthToken(StorageUtils.accessTokenKey) || !StorageUtils.getAuthToken(StorageUtils.refreshTokenKey)) {
                    this.openRoute('/login');
                    return;
                }
            }

            if (newRouteObject.title && this.titleElement) {
                this.titleElement.innerText = newRouteObject.title;
            }

            let contentBlock: HTMLElement | null = this.contentElement;
            if (newRouteObject.layout) {
                const layout: Response = await fetch(newRouteObject.layout);
                this.contentElement.innerHTML = await layout.text();
                contentBlock = document.getElementById('content-layout');

                LayoutMenuUtils.markMenu(path);

                if (!this.username) {
                    this.username = UserInfoUtils.getUserName(this.openRoute.bind(this));
                }

                const usernameElement = document.getElementById('username');
                if(usernameElement){
                    usernameElement.innerText = this.username;
                }

                const userBalanceElement = document.getElementById('userBalance');
                if(userBalanceElement){
                    userBalanceElement.innerText = await UserInfoUtils.getUserBalance(this.openRoute.bind(this)) + '$';
                }
            }

            if (newRouteObject.content && contentBlock) {
                const content: Response = await fetch(newRouteObject.content);
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