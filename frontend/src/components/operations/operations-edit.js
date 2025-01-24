import { CategoryExpenseServices } from "../../services/category-expenses-services";
import { CategoryIncomeServices } from "../../services/category-income-services";
import { OperationsServices } from "../../services/operations-services";
import { ListCategoriesUtils } from "../../utils/list-categories-utils";
import { URLUtils } from "../../utils/url-utils";
import { ValidationUtils } from "../../utils/validation-utils";

export class OperationsEdit {
    constructor(openRoute) {
        this.openRoute = openRoute;
        this.operation = null;

        this.selectTypeOparetionElement = document.getElementById('type-operation');
        this.selectCategoryOperationElement = document.getElementById('category-operation');
        this.inputSummaOperationElement = document.getElementById('summa-operation');
        this.inputDateOperationElement = document.getElementById('date-operation');
        this.inputCommentOperationElement = document.getElementById('comment-operation');

        const operationId = URLUtils.getUrlParam('id');
        if (!operationId) {
            this.openRoute('/login');
            return;
        }

        this.initOperation(operationId);

        document.getElementById('edit-operation').addEventListener('click', this.save.bind(this));

        this.validations = [
            { element: this.inputSummaOperationElement },
            { element: this.inputDateOperationElement },
            { element: this.inputCommentOperationElement }
        ];
    }

    async initOperation(operationId) {
        await this.getOperation(operationId);

        let categoriesList = await ListCategoriesUtils.getCategories(this.operation.type);
        if (categoriesList) {
            this.showCategories(categoriesList);
        }

        this.showOperation(this.operation);
    }

    async getOperation(id) {
        const response = await OperationsServices.getOperation(id);
        if (response.error || response.redirect) {
            return response.redirect ? this.openRoute(response.redirect) : null;
        }
        this.operation = response.content;
    }

    showOperation(operation) {
        for (let i = 0; i < this.selectTypeOparetionElement.options.length; i++) {
            if (this.selectTypeOparetionElement.options[i].value === operation.type) {
                this.selectTypeOparetionElement.options[i].setAttribute('selected', true);
                break;
            }
        }
        for (let i = 0; i < this.selectCategoryOperationElement.options.length; i++) {
            if (this.selectCategoryOperationElement.options[i].innerText === operation.category) {
                this.selectCategoryOperationElement.options[i].setAttribute('selected', true);
                this.operation.category_id = this.selectCategoryOperationElement.options[i].value;
                break;
            }
        }
        this.inputSummaOperationElement.value = operation.amount;
        this.inputDateOperationElement.value = operation.date;
        this.inputCommentOperationElement.value = operation.comment;
    }

    showCategories(categories) {
        categories.forEach(element => {
            const option = document.createElement('option');
            option.value = element.id;
            option.innerHTML = element.title;
            this.selectCategoryOperationElement.appendChild(option);
        });
    }

    async save() {
        const editInfo = this.selectTypeOparetionElement.value !== this.operation.type ||
            Number(this.inputSummaOperationElement.value) !== this.operation.amount ||
            this.inputDateOperationElement.value !== this.operation.date ||
            this.inputCommentOperationElement.value !== this.operation.comment ||
            this.selectCategoryOperationElement.value !== this.operation.category_id;

        if (ValidationUtils.validateForm(this.validations) && editInfo) {
            const response = await OperationsServices.editOperation(this.operation.id, {
                type: this.selectTypeOparetionElement.value,
                amount: this.inputSummaOperationElement.value,
                date: this.inputDateOperationElement.value,
                comment: this.inputCommentOperationElement.value,
                category_id: this.selectCategoryOperationElement.value
            });

            if (response.error || response.redirect) {
                alert('Ошибка при редактированиии операции.')
                return response.redirect ? this.openRoute(response.redirect) : null;
            }
            this.openRoute('/operations-list');
        }
    }
}