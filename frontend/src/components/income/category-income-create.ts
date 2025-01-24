import { CategoryIncomeServices } from "../../services/category-income-services.js";
import { ValidationUtils } from "../../utils/validation-utils.js";

export class CategoryIncomeCreate {
    constructor(openRoute) {
        this.openRoute = openRoute;
        this.inputNameCategoryElement = document.getElementById('name-category');

        document.getElementById('create-category').addEventListener('click', this.create.bind(this));

        this.validations = [
            { element: this.inputNameCategoryElement }
        ];
    }

    async create() {
        if (ValidationUtils.validateForm(this.validations)) {
            const response = await CategoryIncomeServices.createCategory({
                title: this.inputNameCategoryElement.value
            });

            if (response.error || response.redirect) {
                alert('Ошибка при создании категории.')
                return response.redirect ? this.openRoute(response.redirect) : null;
            }
            return this.openRoute('/income-category-list');
        }
    }
}