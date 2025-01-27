import { OperationsServices } from "../../services/operations-services";
import { CategoryType } from "../../types/category.type";
import { PatternResponseType } from "../../types/pattern-response.type";
import { UserOperationType } from "../../types/user-operation.type";
import { ValidationType } from "../../types/validation.type";
import { ListCategoriesUtils } from "../../utils/list-categories-utils";
import { URLUtils } from "../../utils/url-utils";
import { ValidationUtils } from "../../utils/validation-utils";

export class OperationsEdit {
    readonly openRoute: any;
    private operation: UserOperationType | null = null;
    readonly selectTypeOparetionElement: HTMLSelectElement | null;
    readonly selectCategoryOperationElement: HTMLSelectElement | null;
    readonly inputSummaOperationElement: HTMLInputElement | null;
    readonly inputDateOperationElement: HTMLInputElement | null;
    readonly inputCommentOperationElement: HTMLInputElement | null;
    readonly validations!: ValidationType[];

    constructor(openRoute: any) {
        this.openRoute = openRoute;

        this.selectTypeOparetionElement = document.getElementById('type-operation') as HTMLSelectElement;
        this.selectCategoryOperationElement = document.getElementById('category-operation') as HTMLSelectElement;
        this.inputSummaOperationElement = document.getElementById('summa-operation') as HTMLInputElement;
        this.inputDateOperationElement = document.getElementById('date-operation') as HTMLInputElement;
        this.inputCommentOperationElement = document.getElementById('comment-operation') as HTMLInputElement;

        const operationId: number = Number(URLUtils.getUrlParam('id'));
        if (!operationId) {
            this.openRoute('/login');
            return;
        }

        this.initOperation(operationId);

        const editOperationBtnElement = document.getElementById('edit-operation');
        if (editOperationBtnElement) {
            editOperationBtnElement.addEventListener('click', this.save.bind(this));
        }

        this.validations = [
            { element: this.inputSummaOperationElement },
            { element: this.inputDateOperationElement },
            { element: this.inputCommentOperationElement }
        ];
    }

    private async initOperation(operationId: number): Promise<void> {
        await this.getOperation(operationId);

        if (!this.operation) return;

        let categoriesList: CategoryType[] = await ListCategoriesUtils.getCategories(this.operation.type);
        if (categoriesList) {
            this.showCategories(categoriesList);
        }

        this.showOperation(this.operation);
    }

    private async getOperation(id: number): Promise<void> {
        const response: PatternResponseType = await OperationsServices.getOperation(id);
        if (response.error || response.redirect || !response.content) {
            if (response.redirect) {
                this.openRoute(response.redirect);
            }
            return;
        }
        this.operation = response.content;
    }

    private showOperation(operation: UserOperationType): void {
        if (!this.operation ||
            !this.selectTypeOparetionElement ||
            !this.selectCategoryOperationElement ||
            !this.inputSummaOperationElement ||
            !this.inputDateOperationElement ||
            !this.inputCommentOperationElement
        ) return;

        for (let i = 0; i < this.selectTypeOparetionElement.options.length; i++) {
            if (this.selectTypeOparetionElement.options[i].value === operation.type) {
                this.selectTypeOparetionElement.options[i].setAttribute('selected', 'selected');
                break;
            }
        }
        for (let i = 0; i < this.selectCategoryOperationElement.options.length; i++) {
            if (this.selectCategoryOperationElement.options[i].innerText === operation.category) {
                this.selectCategoryOperationElement.options[i].setAttribute('selected', 'selected');
                this.operation.category_id = Number(this.selectCategoryOperationElement.options[i].value);
                break;
            }
        }
        this.inputSummaOperationElement.value = operation.amount.toString();
        this.inputDateOperationElement.value = operation.date.toString();
        this.inputCommentOperationElement.value = operation.comment;
    }

    private showCategories(categories: CategoryType[]): void {
        categories.forEach((element: CategoryType) => {
            const option: HTMLOptionElement = document.createElement('option');
            option.value = element.id.toString();
            option.innerHTML = element.title;
            if (this.selectCategoryOperationElement) {
                this.selectCategoryOperationElement.appendChild(option);
            }
        });
    }

    private async save(): Promise<void> {
        const editInfo: boolean = this.selectTypeOparetionElement?.value !== this.operation?.type ||
            Number(this.inputSummaOperationElement?.value) !== this.operation?.amount ||
            this.inputDateOperationElement?.value !== this.operation.date.toString() ||
            this.inputCommentOperationElement?.value !== this.operation.comment ||
            this.selectCategoryOperationElement?.value !== this.operation.category_id;

        if (ValidationUtils.validateForm(this.validations) && editInfo) {
            if(!this.operation) return;

            const response = await OperationsServices.editOperation(this.operation.id, {
                type: this.selectTypeOparetionElement!.value,
                amount: this.inputSummaOperationElement!.value,
                date: this.inputDateOperationElement!.value,
                comment: this.inputCommentOperationElement!.value,
                category_id: this.selectCategoryOperationElement!.value
            });

            if (response.error || response.redirect || !response.content) {
                alert('Ошибка при редактированиии операции.');
                if(response.redirect){
                    this.openRoute(response.redirect);
                }
                return;
            }
            this.openRoute('/operations-list');
        }
    }
}