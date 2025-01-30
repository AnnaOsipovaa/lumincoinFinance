import { CategoryIncomeServices } from "../../services/category-income-services";
import { CategoryType } from "../../types/category.type";
import { OpenRouteType } from "../../types/open-route.type";
import { PatternResponseType } from "../../types/pattern-response.type";

export class CategoryIncomeList {
    readonly openRoute: OpenRouteType;
    readonly confirmationDeleteBtnElement: HTMLAnchorElement | null;

    constructor(openRoute: OpenRouteType) {
        this.openRoute = openRoute;
        this.getCategories();

        this.confirmationDeleteBtnElement = document.getElementById('confirmation-delete-btn_true') as HTMLAnchorElement;

        const confirmationNoDeleteBtnElement = document.getElementById('confirmation-delete-btn_false');
        if (confirmationNoDeleteBtnElement) {
            confirmationNoDeleteBtnElement.addEventListener('click', this.cancelDelete.bind(this));
        }
    }

    private async getCategories(): Promise<void> {
        const response: PatternResponseType = await CategoryIncomeServices.getCategories();
        if (response.error || response.redirect || !response.content) {
            alert('Ошибка при получении списка категорий.')
            if (response.redirect) {
                this.openRoute(response.redirect);
            }
            return;
        }
        this.showCategories(response.content);
    }

    private showCategories(categories: CategoryType[]): void {
        let categoriesListElement: HTMLElement | null = document.getElementById('categories-list');
        let addCategoryButtonElement: HTMLElement | null = document.getElementById('add-categories');
        categories.forEach((element: CategoryType) => {
            const categoryBlockElement: HTMLElement = document.createElement('div');
            categoryBlockElement.className = 'col-12 col-xl-4';

            const categoryElement: HTMLElement = document.createElement('div');
            categoryElement.className = 'p-3 border rounded-3';

            const categoryTitle: HTMLElement = document.createElement('h3');
            categoryTitle.innerText = element.title;

            const categoryActionsElement: HTMLElement = document.createElement('div');
            categoryActionsElement.className = 'd-flex';

            const categoryEditButtonElement: HTMLAnchorElement = document.createElement('a');
            categoryEditButtonElement.className = 'btn btn-primary px-3 me-2';
            categoryEditButtonElement.href = '/income-category-edit?id=' + element.id;
            categoryEditButtonElement.innerText = 'Редактировать';

            const categoryDeleteButtonElement: HTMLButtonElement = document.createElement('button');
            categoryDeleteButtonElement.className = 'btn btn-danger px-3';
            categoryDeleteButtonElement.type = 'button';
            categoryDeleteButtonElement.setAttribute('data-bs-toggle', 'modal');
            categoryDeleteButtonElement.setAttribute('data-bs-target', '.modal');
            categoryDeleteButtonElement.setAttribute('data-id', element.id.toString());
            categoryDeleteButtonElement.addEventListener('click', this.setLinkForCategoryDeleted.bind(this));
            categoryDeleteButtonElement.innerText = 'Удалить';

            categoryActionsElement.appendChild(categoryEditButtonElement);
            categoryActionsElement.appendChild(categoryDeleteButtonElement);
            categoryElement.appendChild(categoryTitle);
            categoryElement.appendChild(categoryActionsElement);
            categoryBlockElement.appendChild(categoryElement);
            
            if(categoriesListElement){
                categoriesListElement.insertBefore(categoryBlockElement, addCategoryButtonElement);
            }
        });
    }
    
    private cancelDelete(): void {
        this.confirmationDeleteBtnElement?.removeAttribute('data-id');
    }

    private setLinkForCategoryDeleted(e: Event): void {
        if(this.confirmationDeleteBtnElement && e.target){
            this.confirmationDeleteBtnElement.href = '/income-category-delete?id=' + (<HTMLElement>e.target).getAttribute('data-id');
        }
    }
}