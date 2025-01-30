import { OperationsServices } from "../../services/operations-services";
import { CategoryType } from "../../types/category.type";
import { OpenRouteType } from "../../types/open-route.type";
import { OperationType } from "../../types/operation.type";
import { PatternResponseType } from "../../types/pattern-response.type";
import { ValidationType } from "../../types/validation.type";
import { ListCategoriesUtils } from "../../utils/list-categories-utils";
import { URLUtils } from "../../utils/url-utils";
import { ValidationUtils } from "../../utils/validation-utils";

export class OperationsCreate {
    readonly openRoute: OpenRouteType;
    readonly selectTypeOparetionElement: HTMLInputElement | null;
    readonly selectCategoryOperationElement: HTMLInputElement | null;
    readonly inputSummaOperationElement: HTMLInputElement | null;
    readonly inputDateOperationElement: HTMLInputElement | null;
    readonly inputCommentOperationElement: HTMLInputElement | null;
    readonly validations!: ValidationType[];

    constructor(openRoute: OpenRouteType) {
        this.openRoute = openRoute;

        this.selectTypeOparetionElement = document.getElementById('type-operation') as HTMLInputElement;
        this.selectCategoryOperationElement = document.getElementById('category-operation') as HTMLInputElement;
        this.inputSummaOperationElement = document.getElementById('summa-operation') as HTMLInputElement;
        this.inputDateOperationElement = document.getElementById('date-operation') as HTMLInputElement;
        this.inputCommentOperationElement = document.getElementById('comment-operation') as HTMLInputElement;

        this.initEvents();

        const operationType: OperationType = URLUtils.getUrlParam('type') as OperationType;
        if (operationType) {
            let optionElement: HTMLInputElement | null = document.querySelector('select option[value="' + operationType + '"]');
            if (optionElement) {
                optionElement.setAttribute('selected', 'selected');
            }

            this.getCategories(operationType);
        } else {
            this.openRoute('/operations-list');
            return;
        }

        this.validations = [
            { element: this.inputSummaOperationElement },
            { element: this.inputDateOperationElement },
            { element: this.inputCommentOperationElement }
        ];
    }

    private async getCategories(operationType: OperationType): Promise<void> {
        let categoriesList: CategoryType[] = await ListCategoriesUtils.getCategories(operationType);
        if (categoriesList) {
            this.showCategories(categoriesList);
        }
    }

    private initEvents(): void {
        this.selectTypeOparetionElement?.addEventListener('change', this.changingTypeOperation.bind(this))
        document.getElementById('create-operation')?.addEventListener('click', this.create.bind(this));
    }

    private changingTypeOperation(e: Event): void {
        if (e.target) {
            this.getCategories((e.target as HTMLInputElement).value as OperationType);
        }
    }

    private showCategories(categories: CategoryType[]): void {
        if (categories.length === 0) {
            alert('У Вас нет категорий для создания дохода/расхода.');
            this.openRoute('/operations-list');
            return;
        }

        if (this.selectCategoryOperationElement) {
            this.selectCategoryOperationElement.innerHTML = '';
            categories.forEach((element: CategoryType) => {
                const option: HTMLOptionElement = document.createElement('option');
                option.value = element.id.toString();
                option.innerHTML = element.title;
                this.selectCategoryOperationElement!.appendChild(option);
            });
        }
    }

    private async create(): Promise<void> {
        if (ValidationUtils.validateForm(this.validations)) {
            const response: PatternResponseType = await OperationsServices.createOperation({
                type: this.selectTypeOparetionElement!.value,
                amount: Number(this.inputSummaOperationElement!.value),
                date: this.inputDateOperationElement!.value,
                comment: this.inputCommentOperationElement!.value,
                category_id: Number(this.selectCategoryOperationElement!.value)
            });

            if (response.error || response.redirect || !response.content) {
                alert('Ошибка при создании категории.');
                if(response.redirect){
                    this.openRoute(response.redirect);
                }
                return;
            }
            this.openRoute('/operations-list');
        }
    }
}