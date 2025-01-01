import { CategoryIncomeServices } from "../../services/category-income-services";
import { URLUtils } from "../../utils/url-utils";
import { ValidationUtils } from "../../utils/validation-utils";

export class CategoryIncomeEdit {
    constructor(openRoute) {
        this.openRoute = openRoute;
        this.category = null;
        this.nameCategoryElement = document.getElementById('name-category');

        const categoryId = URLUtils.getUrlParam('id');
        if (!categoryId) {
            this.openRoute('/login');
            return;
        }

        this.getCategory(categoryId);

        document.getElementById('save-category').addEventListener('click', this.save.bind(this));
    }

    async getCategory(id) {
        const response = await CategoryIncomeServices.getCategory(id);
        if (response.error || response.redirect) {
            return response.redirect ? this.openRoute(response.redirect) : null;
        }
        this.category = response.content;
        this.nameCategoryElement.value = response.content.title;
    }

    async save() {
        this.validations = [
            { element: this.nameCategoryElement, options: { notEqualTo: this.category.title } }
        ];

        if (ValidationUtils.validateForm(this.validations)) {
            const response = await CategoryIncomeServices.editCategory(this.category.id, {
                title: this.nameCategoryElement.value
            });

            if (response.error || response.redirect) {
                alert('Ошибка при редактированиии категории.')
                return response.redirect ? this.openRoute(response.redirect) : null;
            }
            this.openRoute('/income-category-list');
        }
    }
}