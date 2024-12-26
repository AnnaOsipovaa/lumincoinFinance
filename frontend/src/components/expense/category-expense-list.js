import { CategoryExpenseServices } from "../../services/category-expenses-services";

export class CategoryExpensList {
    constructor(openRoute) {
        this.openRoute = openRoute;
        this.getCategories();

        this.confirmationDeleteBtnElement = document.getElementById('confirmation-delete-btn_true');
        this.confirmationDeleteBtnElement.addEventListener('click', this.deleteCategory.bind(this));
        document.getElementById('confirmation-delete-btn_false').addEventListener('click', this.cancelDelete.bind(this));
    }

    async getCategories() {
        const response = await CategoryExpenseServices.getCategories();
        if (response.error || response.redirect) {
            return response.redirect ? this.openRoute(response.redirect) : null;
        }
        this.showCategories(response.content);
    }

    showCategories(categories) {
        let categoriesListElement = document.getElementById('categories-list');
        let addCategoryButtonElement = document.getElementById('add-categories');
        categories.forEach(element => {
            const categoryBlockElement = document.createElement('div');
            categoryBlockElement.className = 'col-12 col-xl-4';

            const categoryElement = document.createElement('div');
            categoryElement.className = 'p-3 border rounded-3';

            const categoryTitle = document.createElement('h3');
            categoryTitle.innerText = element.title;

            const categoryActionsElement = document.createElement('div');
            categoryActionsElement.className = 'd-flex';

            const categoryEditButtonElement = document.createElement('a');
            categoryEditButtonElement.classList = 'btn btn-primary px-3 me-2';
            categoryEditButtonElement.href = '/expenses-category-edit?id=' + element.id;
            categoryEditButtonElement.innerText = 'Редактировать';

            const categoryDeleteButtonElement = document.createElement('button');
            categoryDeleteButtonElement.className = 'btn btn-danger px-3';
            categoryDeleteButtonElement.type = 'button';
            categoryDeleteButtonElement.setAttribute('data-bs-toggle', 'modal');
            categoryDeleteButtonElement.setAttribute('data-bs-target', '.modal');
            categoryDeleteButtonElement.setAttribute('data-id', element.id);
            categoryDeleteButtonElement.addEventListener('click', this.setIdForCategoryDeleted.bind(this));
            categoryDeleteButtonElement.innerText = 'Удалить';

            categoryActionsElement.appendChild(categoryEditButtonElement);
            categoryActionsElement.appendChild(categoryDeleteButtonElement);
            categoryElement.appendChild(categoryTitle);
            categoryElement.appendChild(categoryActionsElement);
            categoryBlockElement.appendChild(categoryElement);
            categoriesListElement.insertBefore(categoryBlockElement, addCategoryButtonElement);
        });
    }

    cancelDelete(){
        this.confirmationDeleteBtnElement.removeAttribute('data-id');
    }

    setIdForCategoryDeleted(e){
        this.confirmationDeleteBtnElement.setAttribute('data-id', e.target.getAttribute('data-id'));
    }

    deleteCategory(e){
        console.log(e.target.getAttribute('data-id'));
    }
}