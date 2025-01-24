import { CategoryExpenseServices } from "../../services/category-expenses-services.js";
import { CategoryIncomeServices } from "../../services/category-income-services.js";
import { OperationsServices } from "../../services/operations-services.js";
import { ListCategoriesUtils } from "../../utils/list-categories-utils.js";
import { URLUtils } from "../../utils/url-utils.js";
import { ValidationUtils } from "../../utils/validation-utils.js";

export class OperationsCreate {
    constructor(openRoute) {
        this.openRoute = openRoute;

        this.selectTypeOparetionElement = document.getElementById('type-operation');
        this.selectCategoryOperationElement = document.getElementById('category-operation');
        this.inputSummaOperationElement = document.getElementById('summa-operation');
        this.inputDateOperationElement = document.getElementById('date-operation');
        this.inputCommentOperationElement = document.getElementById('comment-operation');

        this.initEvents();

        const operationType = URLUtils.getUrlParam('type');
        if (operationType) {
            let optionElement = document.querySelector('select option[value="' + operationType + '"]');
            if (optionElement) {
                optionElement.setAttribute('selected', true);
            } else {
                return this.openRoute('/operations-list');
            }

            this.getCategories(operationType);
        }


        this.validations = [
            { element: this.inputSummaOperationElement },
            { element: this.inputDateOperationElement },
            { element: this.inputCommentOperationElement }
        ];
    }

    async getCategories(operationType) { 
        let categoriesList = await ListCategoriesUtils.getCategories(operationType);
        if (categoriesList) {
            this.showCategories(categoriesList);
        }
    }

    initEvents() {
        this.selectTypeOparetionElement.addEventListener('change', this.changingTypeOperation.bind(this))
        document.getElementById('create-operation').addEventListener('click', this.create.bind(this));
    }

    changingTypeOperation(e) {
        this.getCategories(e.target.value);
    }

    showCategories(categories) {
        if (categories.length === 0) {
            alert('У Вас нет категорий для создания дохода/расхода.');
            return this.openRoute('/operations-list');
        }

        this.selectCategoryOperationElement.innerHTML = '';
        categories.forEach(element => {
            const option = document.createElement('option');
            option.value = element.id;
            option.innerHTML = element.title;
            this.selectCategoryOperationElement.appendChild(option);
        });
    }

    async create() {
        if (ValidationUtils.validateForm(this.validations)) {
            const response = await OperationsServices.createOperation({
                type: this.selectTypeOparetionElement.value,
                amount: Number(this.inputSummaOperationElement.value),
                date: this.inputDateOperationElement.value,
                comment: this.inputCommentOperationElement.value,
                category_id: Number(this.selectCategoryOperationElement.value)
            });

            if (response.error || response.redirect) {
                alert('Ошибка при создании категории.')
                return response.redirect ? this.openRoute(response.redirect) : null;
            }
            return this.openRoute('/operations-list');
        }
    }
}